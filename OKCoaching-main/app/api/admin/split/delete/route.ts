import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Splits from "@/app/models/Splits";
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
            return NextResponse.json({ message: "Split ID is required" }, { status: 400 });
        }

        const deletedSplit = await Splits.findByIdAndDelete(id);

        if (!deletedSplit) {
            return NextResponse.json({ message: "Split not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Split deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Failed to delete split", error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
