import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Splits from "@/app/models/Splits";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function GET(): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const splits = await Splits.find({});

        return NextResponse.json({ message: "Splits retrieved successfully", splits }, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Error retrieving splits:", error.message);
            return NextResponse.json({ message: "Failed to retrieve splits", error: error.message }, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
        }
    }
}
