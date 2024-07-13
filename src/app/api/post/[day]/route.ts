import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { PostModel } from "@/models/Post";

let db: Database | null = null;

export async function GET(
  req: NextRequest,
  { params }: { params: { day: string } }
) {
  if (!db) {
    db = await open({
      filename: "./posts.db",
      driver: sqlite3.Database,
    });
  }
  const post = await db.get<PostModel>(
    "SELECT * FROM post WHERE day = ?",
    params.day
  );
  return NextResponse.json({ post }, { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { day: string } }
) {
  const data: { day: number; description: string } = await req.json();
  if (!db) {
    db = await open({
      filename: "./posts.db",
      driver: sqlite3.Database,
    });
  }
  const result = await db!.run(
    "UPDATE post SET description = ? WHERE id = ?",
    data.description,
    data.day
  );
  return NextResponse.json({ result }, { status: 200 });
}
