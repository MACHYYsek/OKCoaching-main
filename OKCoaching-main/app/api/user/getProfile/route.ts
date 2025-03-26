import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        return NextResponse.json({ profileCompleted: false }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ user: null }, { status: 404 });
    }

    return NextResponse.json({ user: user });
}
