// lib/authHelpers.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

export async function isAdmin(): Promise<boolean> {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
        return false;
    }

    return true;
}

export async function requireAdmin(): Promise<Response | null> {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== 'admin') {
        return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    return null;
}
