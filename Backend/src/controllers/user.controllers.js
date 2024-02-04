import { User } from "../models/user.models.js";
import { UserVerificationModel } from "../models/user.verification.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { transporter } from "../utils/transporter.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

const sendOtpVerificationEmail = async (data, res) => {
  try {
    console.log("15: " + data.data._id);
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
    const mailOptions = {
      from: {
        name: "TrophyBook App",
        address: process.env.AUTH_EMAIL,
      },
      to: "the.munekha@gmail.com",
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  }
});


const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Can't generate token", error);
  }
};

//signup user

const registerUser = async (req, res) => {
  const { username, email, mobile, password } = req.body;
  const userexist = await User.findOne({ email });
  if (userexist) {
    throw new ApiError(409, "User with same email aleady exists!");
  }
  const user = await User.create({
    username,
    email,
    mobile,
    password,
  });
  const createdUser = await User.findById(user._id).select("-password");
  sendOtpVerificationEmail({data:user , email:user.email} , res)
  // return res
  //   .status(201)
  //   .json(new ApiResponse(201, createdUser, "User succesfully created!"));
};


//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    throw new ApiError(410, "All fields are required!");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist!");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Password incorrect!");
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
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, { loggedInUser }, "User logged in successfully"));
};

const addToCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(400, "invalid user id");
    }
    const updatedCart = await user.addToCart(productID);
    res.json(new ApiResponse(200, updatedCart, "cart updated"));
  }
  catch (err) {
    console.log(err);
    res.json(new ApiError(400, "Error adding to cart ", err));
  }
}

const deleteFromCart = async (req, res) => {
  try {
    const { userID, productID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(400, "invalid user id");
    }
    const updatedCart = await User.findByIdAndUpdate(
      { _id: userID },
      {
        $pull: {
          cart: productID
        }
      });
    await user.save()
    res.json(new ApiResponse(200, updatedCart, "cart updated"));
  }
  catch (err) {
    console.error(err);
    res.json(new ApiError(400, "Error deleting from cart ", err));
  }
}

const addListName = async (req, res) => {
  try {
    const { userID, listName } = req.body;
    const updatedUser = await User.findByIdAndUpdate({ _id: userID }, { $push: { wishlist: { listName } } });
    res.json(new ApiResponse(200, updatedUser, "wishlist name added"));
  }
  catch (error) {
    console.log(error);
  }
}

const addToList = async (req, res) => {
  try {
    const { userID, productID, listID } = req.body;
    const user = await User.findOne({ _id: userID })
    if (!user) {
      throw new ApiError(400, "invalid user id");
    }
    const updatedList = await user.addToList(listID, productID);
    res.json(new ApiResponse(200, updatedList, "item added to list"))
  }
  catch (error) {
    throw new ApiError(400, "error while adding to wishlist", error);
  }
}

const removeList = async (req, res) => {
  try {
    const { userID, listID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(404, "Invalid userID");
    }
    const updatedWishlist = await user.removeList(listID);
    res.json(new ApiResponse(200, updatedWishlist));
  }
  catch (error) {
    throw new ApiError(400, "unable to remove list", error);
  }
}

const removeFromList = async (req, res) => {
  try {
    const { userID, listID, productID } = req.body;
    const user = await User.findOne({ _id: userID });
    if (!user) {
      throw new ApiError(404, "Invalid user id, user not found!");
    }
    const updatedList = await user.removeProductFromList(listID, productID);
    res.json(new ApiResponse(200, updatedList));

  }
  catch (err) {
    throw new ApiError(400, "Error while removing the product from the list.", err);
  }
}

const sendMail = async(req,res)=>{
  const mailOptions = {
    from: {
      name: "JORDAAR",
      address: process.env.AUTH_EMAIL,
    },
    to: "the.munekha@gmail.com",
    subject: "Verify your Email",
    html: `<p>Enter <b>1122</b> in the app to verify your email address and complete your signup</p><p>This otp expires in 1 hour.</p>`,
  };

  transporter.sendMail(mailOptions).then(()=>{
    console.log("mail sent")
  }).catch((err)=>{
    console.log(err)
    // console.log(process.env.AUTH_PASS)
  });
}



export {
  registerUser,
  loginUser,
  addToCart,
  deleteFromCart,
  addListName,
  addToList,
  removeList,
  removeFromList,
  sendMail
};
