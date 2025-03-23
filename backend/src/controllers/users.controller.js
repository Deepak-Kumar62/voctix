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
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong." });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: "User not registered." });
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Invalid email or password." });
    }

    const authToken = user.generateAuthToken();
    res.cookie("token", authToken, {
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(httpStatus.OK)
      .json({ success: true, message: "User loggedin successfully." });
  } catch (error) {
    console.log(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Something went wrong." });
  }
};
