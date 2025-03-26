import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Groups from "@/app/models/Groups";

// Define the GET request handler
export async function GET(): Promise<Response> {
    try {
        // Connect to the database
        await connectDB();

        // Fetch all groups from the database
        const groups = await Groups.find();

        // If no groups are found, return a 404 response
        if (!groups || groups.length === 0) {
            return NextResponse.json({ message: "No groups found" }, { status: 404 });
        }

        // Return a success response with the groups data
        return NextResponse.json({ groups }, { status: 200 });
    } catch (error: unknown) {
        // Handle any errors during database operation
        if (error instanceof Error) {
            console.error("Error fetching groups:", error.message);
            return NextResponse.json({ message: "Failed to fetch groups", error: error.message }, { status: 500 });
        } else {
            console.error("Unexpected error:", error);
            return NextResponse.json({ message: "An unexpected error occurred." }, { status: 500 });
        }
    }
}
