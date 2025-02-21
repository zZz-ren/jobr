import { User, Prisma } from "@prisma/client";
import { Request, Response } from "express";
import dbWorker from "../utils/db";
import { sendCustomMail } from "../utils/nodeMailer";
import { log } from "util";

class AuthControllers {
  registerUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body as Prisma.UserCreateInput;

      const newUser = await dbWorker.user.create({
        data,
      });

      let OTP = Math.floor(1000 + Math.random() * 9000).toString();

      await dbWorker.user.update({
        where: { email: newUser.email },
        data: { token: OTP },
      });

      const html = `hello ${data.firstName}, this is your registeration otp :- ${OTP}`;

      const emailInfo = await sendCustomMail(
        data.email,
        "OTP for Verification",
        html
      );

      res.status(200).json({
        success: true,
        message: "OTP for verification sent successfully",
      });
    } catch (error: any) {
      console.error("Error in registerUser:", error.message || error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };

  registerCompany = async (req: Request, res: Response): Promise<void> => {
    try {
      const data = req.body as Prisma.CompanyCreateInput;

      const newUser = await dbWorker.company.create({
        data,
      });

      let OTP = Math.floor(1000 + Math.random() * 9000).toString();
      await dbWorker.company.update({
        where: { email: newUser.email },
        data: { token: OTP },
      });

      const html = `hello ${data.name}, this is your registeration otp :- ${OTP}`;

      const emailInfo = await sendCustomMail(
        data.email,
        "OTP for Verification",
        html
      );

      res.status(200).json({
        success: true,
        message: "OTP for verification sent successfully",
      });

      res
        .status(200)
        .json({ success: true, message: "registerCompany successful" });
    } catch (error: any) {
      console.error("Error in registerCompany:", error.message || error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };

  verifyEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp, userType } = req.body as {
        email: string;
        otp: string;
        userType: string;
      };
      console.log(req.body);

      if (!email || !otp || !userType) {
        throw new Error("Invalid input");
      }

      let data;

      if (userType === "user" || "admin") {
        data = await dbWorker.user.findUnique({ where: { email } });
        if (data && data.token !== otp) {
          throw new Error("Invalid OTP");
        }
        await dbWorker.user.update({
          where: { email },
          data: { token: null, isVerified: true },
        });
      } else {
        data = await dbWorker.company.findUnique({ where: { email } });
        if (data && data.token !== otp) {
          throw new Error("Invalid OTP");
        }
        await dbWorker.user.update({
          where: { email },
          data: { token: null, isVerified: true },
        });
      }

      res
        .status(200)
        .json({ success: true, message: "Email verified successfully" });
    } catch (error: any) {
      console.error("Error in email verify:", error.message || error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      // Your logic here
      res.status(200).json({ success: true, message: "login successful" });
    } catch (error: any) {
      console.error("Error in login:", error.message || error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Server Error",
      });
    }
  };
}

export default new AuthControllers();
