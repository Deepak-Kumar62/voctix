import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: [true, "Firstname is required."],
      trim: true,
    },

    lastname: {
      type: String,
      trim: true,
    },

    username: {
      type: String,
      required: [true, "Username is required."],
      unique: [true, "Username should be  unique."],
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

    token: String,
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const User = model("User", userSchema);

export default User;
