import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]"; // Correct import for NextAuth options
import prisma from "@/lib/prisma"; // Ensure the prisma instance is properly configured

export async function GET(req: Request) {
  try {
    // Get the session data from NextAuth
    const session = await getServerSession(authOptions);

    // Check if session or user email is not present
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // Fetch the user from the database based on email
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        name: true,
        email: true,
        phone: true,
        profilePicture: true,
        // Add other fields you want to return
      },
    });

    // If the user is not found
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return the user data, without sensitive info like password
    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error fetching user data:", err);
    return NextResponse.json(
      { error: (err as Error).message || "An error occurred" },
      { status: 500 }
    );
  }
}
