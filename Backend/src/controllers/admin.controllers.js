import { Admin } from "../models/admin.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.json(new ApiResponse(409, "Admin already exists!"));
    }

    const newAdmin = await Admin.create({ email });
    return res.json(
      new ApiResponse(201, newAdmin, "Admin created successfully!")
    );
  } catch (error) {
    throw new ApiError(400, "Error creating admin ", error);
  }
};

const checkAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.json(new ApiResponse(200, "Admin exists!"));
    }
    return res.json(new ApiResponse(401, "Unauthorized!"));
  } catch (error) {
    throw new ApiError(400, "Error checking admin ", error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } }).select(
      "-password"
    );

    if (users.length === 0)
      return res.json(new ApiResponse(404, "No users found!"));
    return res.json(
      new ApiResponse(200, users, "Users retrieved successfully!")
    );
  } catch (error) {
    throw new ApiError(400, "Error getting users ", error);
  }
};

const changeUserState = async (req, res) => {
  const { userID, status } = req.body;
  try {
    const user = await User.findOne({ _id: userID });
    if (!user) return res.json(new ApiResponse(404, "user not found"));

    user.status = status;
    await user.save()
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return res.json(new ApiResponse(422, "Invalid status value"))
        }
        else {
          return res.json(new ApiResponse(400, err.message));
        }
      });

  }
  catch (err) {
    res.json(new ApiError(400, "Error changing the status of the user."))
  }
}

export {
  createAdmin,
  checkAdmin,
  getAllUsers,
  changeUserState
};
