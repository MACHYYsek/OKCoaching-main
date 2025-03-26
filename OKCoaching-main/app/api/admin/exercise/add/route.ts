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

export async function POST(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const { name, description, sets } = await req.json();

        if (!name || !description || !sets || sets.length === 0) {
            return NextResponse.json({ message: "Name, description, and at least one set are required" }, { status: 400 });
        }

        const newExercise = new Exercises({
            name,
            description,
            video: "videoString",
            sets: sets.map((set: Set) => ({
                tempo: set.tempo,
                rir: set.rir ?? 1,
                reps: set.reps ?? 8,
                rest: set.rest ?? 60,
            })),
        });

        await newExercise.save();
        return NextResponse.json({ message: "Exercise added successfully", exercise: newExercise }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to add exercise", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
