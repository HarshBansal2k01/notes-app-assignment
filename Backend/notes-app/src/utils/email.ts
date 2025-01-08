import nodemailer from "nodemailer";

export const sendOTP = async (email: string, otp: string) => {
  console.log(process.env.SMTP_USER)
  console.log(process.env.SMTP_PASS)
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT!, 10),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // your email
        pass: process.env.SMTP_PASS, // your email password
      },
    });

    const mailOptions = {
      from: `"Notes App" <${process.env.SMTP_USER}>`, // sender address
      to: email, // list of receivers
      subject: "Your OTP Code", // Subject line
      text: `Your OTP code is: ${otp}`, // plain text body
    };

    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send OTP");
  }
};
