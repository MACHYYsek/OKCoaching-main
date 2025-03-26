import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Exercises from "@/app/models/Exercises";
import { requireAdmin } from "@/app/lib/adminAuth";

interface Set {
    tempo: string;
    rir?: number;
    reps?: number;
    rest?: number;
}

export async function PUT(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const { id, name, description, thumbnail, video, sets } = await req.json();

        if (!id) {
            return NextResponse.json({ message: "Exercise ID is required" }, { status: 400 });
        }

        // Find and update the exercise document
        const exercise = await Exercises.findById(id);

        if (!exercise) {
            return NextResponse.json({ message: "Exercise not found" }, { status: 404 });
        }

        // Update main fields if provided
        if (name) exercise.name = name;
        if (description) exercise.description = description;
        if (thumbnail) exercise.thumbnail = thumbnail;
        if (video) exercise.video = video;

        // Update sets if provided
        if (sets && sets.length > 0) {
            exercise.sets = sets.map((set: Set) => ({
                tempo: set.tempo,
                rir: set.rir ?? 1,
                reps: set.reps ?? 8,
                rest: set.rest ?? 60,
            }));
        }

        await exercise.save();

        return NextResponse.json({ message: "Exercise updated successfully", exercise }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update exercise", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
