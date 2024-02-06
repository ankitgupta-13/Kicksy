import { User } from "../models/user.models.js";
import { UserVerificationModel } from "../models/user.verification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { transporter } from "../utils/transporter.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const sendOtpVerificationEmail = async (data, res) => {
  try {
    console.log("15: " + data.data._id);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: {
        name: "TrophyBook App",
        address: process.env.AUTH_EMAIL,
      },
      to: data.email,
      subject: "Verify your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete your signup</p><p>This otp expires in 1 hour.</p>`,
    };

    const hashedOtp = await bcrypt.hash(otp, 12);
    const new_otp_verification = new UserVerificationModel({
      userId: data.data._id,
      otp: hashedOtp,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    const user_otp = await new_otp_verification.save();

    console.log(user_otp);

    transporter.sendMail(mailOptions);
    res.json({
      status: "pending",
      message: "Verification OTP sent.",
      data: {
        userId: data.data._id,
      },
    });
    console.log("email sent!!");
  } catch (err) {
    res.json({
      status: "failed",
      message: err.message,
    });
  }
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error generating token! ", err));
  }
};

const registerUser = async (req, res) => {
  const { username, email, mobile, password } = req.body;
  const userexist = await User.findOne({ email });
  if (userexist && userexist.verified === true) {
    return res.json(new ApiError(409, "User with same email aleady exists!"));
  } else if (userexist && userexist.verified === false) {
    userexist.username = username;
    userexist.mobile = mobile;
    userexist.password = password;
    await userexist.save();
    sendOtpVerificationEmail({ data: userexist, email: userexist.email }, res);
  } else {
    const user = await User.create({
      username,
      email,
      mobile,
      password,
    });
    sendOtpVerificationEmail({ data: user, email: user.email }, res);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    if (!otp) {
      throw Error(`Fill the otp first`);
    } else if (!userId) {
      throw Error("userId not specified");
    } else {
      const main_user = await User.findOne({ _id: userId });
      console.log(main_user);

      if (main_user.verified == true) {
        throw new Error("User Already verified.");
      }
      const user = await UserVerificationModel.find({ userId });

      if (user.length <= 0) {
        throw new Error("Account record doesn't exist , Sign up first.");
      } else {
        let verify = false;
        for (let i = 0; i < user.length; i++) {
          const hashedOtp = user[i].otp;
          const { expiresAt } = user[i];

          if (expiresAt < Date.now()) {
            await UserVerificationModel.deleteMany({ userId });
            throw new Error("Otp has expired , please request again");
          } else {
            verify = await bcrypt.compare(otp, hashedOtp);

            if (verify == true) {
              await User.updateOne({ _id: userId }, { verified: true });
              await UserVerificationModel.deleteMany({ userId });
              res.status(201).json({
                status: "verified",
                message: "Email verified successfully",
              });
              break;
            }
          }
        }

        if (!verify) {
          throw new Error("The otp entered is wrong. Please try again.");
        }
      }
    }
  } catch (err) {
    throw new ApiError(400, "verification failed", err.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email && !password) {
      throw new ApiError(410, "All fields are required!");
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json(new ApiError(404, "User does not exist!"));
    }
    if (!user.verified) {
      return res.json(new ApiError(401, "Please verify your Email!"));
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.json(new ApiError(401, "Password incorrect!"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );
    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
  } catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error logging in user ", err));
  }
};

const getCurrentUser = async (req, res) => {
  try {
    return res
      .status(200)
      .json(new ApiResponse(200, req.user, "User found successfully!"));
  } catch (err) {
    res.json(new ApiError(400, "Error getting user "));
  }
};

const logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $unset: { refreshToken: "" },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, "You have been logged out successfully"));
  } catch (error) {
    res.json(new ApiError(400, "An error occured during logout"));
  }
};

export { registerUser, loginUser, getCurrentUser, logoutUser, verifyOtp };
