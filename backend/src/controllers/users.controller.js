import httpStatus from "http-status";
import User from "../models/users.model.js";

export const registerUser = async (req, res) => {
  const { firstname, lastname, username, password } = req.body;

  if (!firstname || !lastname || !username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ success: false, message: "User already registered." });
    }

    const hashedPassword = await User.hashPassword(password);

    const newUser = await User.create({
      firstname,
      lastname,
      username,
      password: hashedPassword,
    });

    return res.status(httpStatus.CREATED).json({
      success: true,
      message: "User registered successfully.",
      data: newUser,
    });
  } catch (error) {
    console.log(error)
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong." });
  }
};
