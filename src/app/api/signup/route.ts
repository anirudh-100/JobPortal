import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";

// Interface to define the Cloudinary upload response type
interface CloudinaryUploadResponse {
  secure_url: string;
  [key: string]: unknown; // Use 'unknown' instead of 'any'
}

// Function to convert Web Streams to Node.js Readable Streams
const readableFromWeb = (webStream: ReadableStream<Uint8Array>): Readable => {
  const reader = webStream.getReader();
  return new Readable({
    async read() {
      const { done, value } = await reader.read();
      if (done) {
        this.push(null); // End of the stream
      } else {
        this.push(value); // Push the chunk
      }
    },
  });
};

// Function to upload image to Cloudinary
const uploadToCloudinary = async (file: File): Promise<CloudinaryUploadResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "profiles" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result as CloudinaryUploadResponse);
      }
    );

    const nodeStream = readableFromWeb(file.stream());
    nodeStream.pipe(uploadStream);
  });
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const password = formData.get("password") as string;
    const file = formData.get("profilePicture") as File | null;

    // Validate input
    if (!name || !email || !phone || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate phone number
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload profile picture if provided
    let profilePictureUrl = null;
    if (file) {
      try {
        const uploadedImage = await uploadToCloudinary(file);
        profilePictureUrl = uploadedImage.secure_url;
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return NextResponse.json(
          { error: "Image upload failed" },
          { status: 500 }
        );
      }
    }

    // Create the new user without assigning to `newUser`
    await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        profilePicture: profilePictureUrl, // Save the URL if available
      },
    });

    // Respond with success
    return NextResponse.json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Unable to process your request at the moment." },
      { status: 500 }
    );
  }
}
