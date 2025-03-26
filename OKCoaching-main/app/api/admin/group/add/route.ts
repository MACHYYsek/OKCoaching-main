import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Groups from "@/app/models/Groups";
import { requireAdmin } from "@/app/lib/adminAuth";

interface GroupRequestBody {
    name: string;
    emoji: string;
    description: string;
    image: string;
    video?: string;
    splits?: string[]; // Array of split ObjectId references
}

export async function POST(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }
    
    try {
        await connectDB();

        const body: GroupRequestBody = await req.json();
        const { name, emoji, description, image, video, splits } = body;

        if (!name || !description || !image || !emoji) {
            return NextResponse.json({ message: "Name, description, image and emoji are required" }, { status: 400 });
        }

        const newGroup = new Groups({
            name,
            emoji,
            description,
            image,
            video,
            splits,
        });

        await newGroup.save();

        return NextResponse.json({ message: "Group added successfully", group: newGroup }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to add group", error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
