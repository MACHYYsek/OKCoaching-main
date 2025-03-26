import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Splits from "@/app/models/Splits";
import Exercises from "@/app/models/Exercises";
import { requireAdmin } from "@/app/lib/adminAuth";

interface SplitRequestBody {
    name: string;
    releaseSince: Date;
    groupId?: string;
    days: Array<{
        dayNumber: number;
        trainingName: string;
        isRestDay?: boolean;
        exercises: Array<{
            exercise: string;
            description: string;
            customSets?: Array<{
                tempo?: string;
                rir?: number;
                reps?: number;
                rest?: number;
            }>;
        }>;
    }>;
}

export async function PUT(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const body: SplitRequestBody & { id: string } = await req.json();
        const { id, name, releaseSince, groupId, days } = body;

        if (!id) {
            return NextResponse.json({ message: "Split ID is required" }, { status: 400 });
        }

        // Find the split document to update
        const split = await Splits.findById(id);

        if (!split) {
            return NextResponse.json({ message: "Split not found" }, { status: 404 });
        }

        // Update main fields if provided
        if (name) split.name = name;
        if (releaseSince) split.releaseSince = releaseSince;
        if (groupId) split.groupId = groupId; // Update groupId if provided

        // Update each day in the split, including exercise descriptions
        split.days = await Promise.all(
            days.map(async (day) => {
                const updatedExercises = await Promise.all(
                    day.exercises.map(async (exercise) => {
                        const exerciseDetails = await Exercises.findById(exercise.exercise);
                        if (!exerciseDetails) {
                            throw new Error(`Exercise with ID ${exercise.exercise} not found`);
                        }

                        return {
                            exercise: exercise.exercise,
                            description: exercise.description || exerciseDetails.description, // Use payload description if provided
                            customSets: exercise.customSets?.map((set) => ({
                                tempo: set.tempo,
                                rir: set.rir,
                                reps: set.reps,
                                rest: set.rest,
                            })),
                        };
                    })
                );

                return {
                    dayNumber: day.dayNumber,
                    trainingName: day.trainingName,
                    isRestDay: day.isRestDay ?? false,
                    exercises: updatedExercises,
                };
            })
        );

        await split.save();

        return NextResponse.json({ message: "Split updated successfully", split }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update split", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
