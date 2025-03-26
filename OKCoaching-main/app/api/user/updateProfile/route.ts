import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import validator from "validator";

// This function will be invoked when a POST request is made to the /user/update-profile endpoint
export async function POST(req: Request) {
    await connectDB();

    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user || !session.user.email) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }

    // Get and sanitize request data
    const { bornDate, gender, weight, height, trainingGroup } = await req.json();

    const sanitizedData = {
        bornDate: validator.escape(validator.trim(bornDate || "")), // Assuming it is in DD-MM-YYYY format
        gender: validator.escape(validator.trim(gender || "")),
        weight: validator.toFloat(weight || "0").toString(), // Convert to a float, then back to string
        height: validator.toFloat(height || "0").toString(),
        trainingGroup: validator.escape(validator.trim(trainingGroup || "")),
    };

    try {
        const email = session.user.email; // Fetch the email from the session
        const user = await User.findOne({ email });

        // If user does not exist, throw an error
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        // Update fields with sanitized data
        user.bornDate = sanitizedData.bornDate || user.bornDate;
        user.gender = sanitizedData.gender || user.gender;
        user.weight = sanitizedData.weight || user.weight;
        user.height = sanitizedData.height || user.height;
        user.trainingGroup = sanitizedData.trainingGroup || user.trainingGroup;
        user.profileCompleted = true;

        await user.save();

        return NextResponse.json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to update profile" }, { status: 500 });
    }
}
