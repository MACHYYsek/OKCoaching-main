import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Groups from "@/app/models/Groups";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function GET(): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const groups = await Groups.find({});

        return NextResponse.json({ message: "Groups retrieved successfully", groups }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error retrieving groups:", error.message);
            return NextResponse.json({ message: "Failed to retrieve groups", error: error.message }, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
        }
    }
}
