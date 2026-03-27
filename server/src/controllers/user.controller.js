import User from "../models/User.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      results: {
        users,
      },
    });
  } catch (error) {
    console.log(error || "Internal Server Error");
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
