import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { FRONTEND_PATH, rootDir } from "./path";
import defaultRouter from "../routes";

dotenv.config();

const app = express();
const PUBLIC_PATH = path.join(rootDir, "..", "public");

app.use(express.json());
app.use(express.static(PUBLIC_PATH));
app.use(express.static(FRONTEND_PATH));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", defaultRouter);
app.use("*", (req: Request, res: Response) => {
  res.sendFile(path.join(FRONTEND_PATH, "index.html"));
});

export default app;
