import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Exercises from "@/app/models/Exercises";
import { requireAdmin } from "@/app/lib/adminAuth";


export async function GET(): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();
        
        const exercises = await Exercises.find();

        return NextResponse.json({ message: "Exercises fetched successfully", exercises }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch exercises", error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
