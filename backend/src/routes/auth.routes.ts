import express from "express";
import authControllers from "../controllers/auth.controllers";

const router = express.Router();

router.post("/register/user", authControllers.registerUser);
router.post("/register/company", authControllers.registerCompany);
router.post("/login", authControllers.login);
router.post("/verify-otp", authControllers.verifyEmail);

export default router;
