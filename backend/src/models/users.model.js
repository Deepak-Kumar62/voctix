import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const User = model("User", userSchema);

export default User;
