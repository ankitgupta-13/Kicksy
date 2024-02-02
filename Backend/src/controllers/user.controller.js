import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Can't generate token");
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

  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User succesfully created!"));
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
    .json(new ApiResponse(200, {loggedInUser}, "User logged in successfully"));
};

export { registerUser, loginUser };
