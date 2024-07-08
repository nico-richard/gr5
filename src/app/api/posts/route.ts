import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, description, imageUrl } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
