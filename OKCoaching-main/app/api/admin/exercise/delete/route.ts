import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Exercises from "@/app/models/Exercises";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function DELETE(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }
    
    try {
        await connectDB();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Exercise ID is required" }, { status: 400 });
        }

        const deletedExercise = await Exercises.findByIdAndDelete(id);
        if (!deletedExercise) {
            return NextResponse.json({ message: "Exercise not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Exercise deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete exercise", error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
