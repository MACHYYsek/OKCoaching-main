import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";

export async function POST(
  req: Request,
  { params }: { params: { token: string } }
) {
  await connectDB();
  const { password } = await req.json();

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid or expired password reset token." },
      { status: 400 }
    );
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return NextResponse.json({ message: "Password updated successfully." });
}
