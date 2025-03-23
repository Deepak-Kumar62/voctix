import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/users.controller.js";
import { authUser } from "../middlewares/authUser.middleware.js";

const router = Router();

router.route("/me").get(authUser, getUser);
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/activity/add");
router.route("/activity/all");

export default router;
