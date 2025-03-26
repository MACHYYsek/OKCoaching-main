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
    splits?: string[];
}

export async function PUT(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const { id, name, emoji, description, image, video, splits } = await req.json() as GroupRequestBody & { id: string };

        if (!id) {
            return NextResponse.json({ message: "Group ID is required" }, { status: 400 });
        }

        const group = await Groups.findById(id);

        if (!group) {
            return NextResponse.json({ message: "Group not found" }, { status: 404 });
        }

        if (name) group.name = name;
        if (emoji) group.emoji = emoji
        if (description) group.description = description;
        if (image) group.image = image;
        if (video) group.video = video;
        if (splits && splits.length > 0) {
            group.splits = splits;
        }

        await group.save();

        return NextResponse.json({ message: "Group updated successfully", group }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to update group", error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
