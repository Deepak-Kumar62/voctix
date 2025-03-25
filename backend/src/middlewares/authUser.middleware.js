import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import User from "../models/users.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized user." });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode.id }).select("-password");
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong." });
  }
};
