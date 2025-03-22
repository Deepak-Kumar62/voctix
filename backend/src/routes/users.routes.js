import { Router } from "express";
import { registerUser } from "../controllers/users.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login");
router.route("/activity/add");
router.route("/activity/all");

export default router;
