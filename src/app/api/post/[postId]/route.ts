import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  try {
    const id = params.postId;
    const post = await prisma.post.findUnique({
      where: { id: +params.postId },
    });
    return NextResponse.json({ post: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: `Internal Server Errrrrrrror : ${error}` },
      { status: 500 }
    );
  }
}
