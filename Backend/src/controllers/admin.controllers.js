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

const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-password");

    return res.json(
      new ApiResponse(
        200,
        {
          users,
          currentPage: page,
        },
        "Users retrieved successfully!"
      )
    );
  } catch (error) {
    throw new ApiError(400, "Error getting users ", error);
  }
};

const getActiveUsersCount = async (req, res) => {
  try {
    const count = await User.countDocuments({ status: "active" });
    return res.json(new ApiResponse(200, count, "Users count retrieved!"));
  } catch (error) {
    throw new ApiError(400, "Error getting users count ", error);
  }
};

const changeUserState = async (req, res) => {
  const { userID, status } = req.body;
  try {
    const user = await User.findOne({ _id: userID });
    if (!user) return res.json(new ApiResponse(404, "user not found"));

    user.status = status;
    await user.save().catch((err) => {
      if (err.name === "ValidationError") {
        return res.json(new ApiResponse(422, "Invalid status value"));
      } else {
        return res.json(new ApiResponse(400, err.message));
      }
    });
  } catch (err) {
    res.json(new ApiError(400, "Error changing the status of the user."));
  }
};

const fetchAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    if (!admins) {
      return res.json(new ApiResponse(404, "No Admins Found!"));
    }
    res.json(new ApiResponse(200, admins, "Admins Fetched successfully"));
  } catch (err) {
    throw new ApiError(400, err.message);
  }
};

export {
  createAdmin,
  checkAdmin,
  getUsers,
  changeUserState,
  getActiveUsersCount,
  fetchAdmins,
};
