import nodemailer from "nodemailer";

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;
const host = process.env.MAIL_HOST;

if (!user || !pass || !host) {
  throw new Error("Node mailer credentials not provided");
}

const transporter = nodemailer.createTransport({
  host,
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
});

export const sendCustomMail = async (
  to: string,
  subject: string,
  html: string
) => {
  try {
    const info = await transporter.sendMail({
      from: user,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Error sending Email: " + error.message);
    }
  }
};
