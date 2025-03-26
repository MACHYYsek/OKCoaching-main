import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Splits from "@/app/models/Splits";
import Exercises from "@/app/models/Exercises";
import { requireAdmin } from "@/app/lib/adminAuth";

interface SplitRequestBody {
    name: string;
    releaseSince: Date;
    groupId: string;
    days: Array<{
        dayNumber: number;
        trainingName: string;
        isRestDay?: boolean;
        exercises: Array<{
            exercise: string;
            customSets?: Array<{
                tempo?: string;
                rir?: number;
                reps?: number;
                rest?: number;
            }>;
        }>;
    }>;
}

export async function POST(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const body: SplitRequestBody = await req.json();
        const { name, releaseSince, groupId, days } = body;

        // Validate required fields
        if (!name || !releaseSince || !groupId || !days || days.length < 7) {
            return NextResponse.json({ message: "Name, release date, group ID, and at least 7 days are required" }, { status: 400 });
        }

        // Prepare days with exercise descriptions
        const updatedDays = await Promise.all(
            days.map(async (day) => {
                const updatedExercises = await Promise.all(
                    day.exercises.map(async (exercise) => {
                        const exerciseDetails = await Exercises.findById(exercise.exercise);
                        if (!exerciseDetails) {
                            throw new Error(`Exercise with ID ${exercise.exercise} not found`);
                        }

                        return {
                            exercise: exercise.exercise,
                            description: exerciseDetails.description, // Add default description from Exercises model
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

        const newSplit = new Splits({
            name,
            releaseSince,
            days: updatedDays,
            groupId,
        });

        await newSplit.save();

        return NextResponse.json({ message: "Split added successfully", split: newSplit }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to add split", error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
    }
}
