import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
//import sendEmail from "@/app/lib/sendEmail";

export async function POST(req: Request) {
  await connectDB();
  const { email } = await req.json();

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json(
      { message: "User with this email does not exist." },
      { status: 400 }
    );
  }

  // Generate a reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  user.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();

  // Send reset email
  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetToken}`;

  const message = `You are receiving this email because you (or someone else) have requested the reset of a password. 
  Please click on the following link, or paste this into your browser to complete the process: 
  \n\n ${resetUrl}`;

  try {
    // await sendEmail({
    //   to: user.email,
    //   subject: "Password Reset Request",
    //   text: message,
    // });

    console.log(message);

    return NextResponse.json({ message: "Email sent successfully." });
  } catch (error) {
    console.error(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    return NextResponse.json(
      { message: "There was an error sending the email." },
      { status: 500 }
    );
  }
}
