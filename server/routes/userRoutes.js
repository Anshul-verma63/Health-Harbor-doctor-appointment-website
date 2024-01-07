import express from "express";
import {
  userLoginController,
  userRegisterController,
} from "../controllers/userController.js";

const router = express.Router();

// register post;
router.post("/register", userRegisterController);

// login post;
router.post("/login", userLoginController);

export default router;
