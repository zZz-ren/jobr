import express, { Request, Response } from "express";
import path from "path";
import { FRONTEND_PATH, rootDir } from "../utils/path";

const router = express.Router();

router.get("*", (req: Request, res: Response) => {
  res.status(500).json({ success: false, message: "Api Route not found" });
});

export default router;
