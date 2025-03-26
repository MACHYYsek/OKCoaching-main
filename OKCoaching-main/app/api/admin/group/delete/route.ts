import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Groups from "@/app/models/Groups";
import { requireAdmin } from "@/app/lib/adminAuth";

export async function DELETE(req: Request): Promise<Response> {
    const adminCheck = await requireAdmin();

    if (adminCheck) {
        return adminCheck;
    }

    try {
        await connectDB();

        const { id } = await req.json() as { id: string };

        if (!id) {
            return NextResponse.json({ message: "Group ID is required" }, { status: 400 });
        }

        const deletedGroup = await Groups.findByIdAndDelete(id);

        if (!deletedGroup) {
            return NextResponse.json({ message: "Group not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Group deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete group", error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
