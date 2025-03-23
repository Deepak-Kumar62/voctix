import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/activity/add");
router.route("/activity/all");

export default router;
