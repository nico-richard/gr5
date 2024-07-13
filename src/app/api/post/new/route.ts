import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function POST(req: NextRequest) {
  const data: { day: string; description: string } = await req.json();
  if (!db) {
    db = await open({
      filename: "./posts.db",
      driver: sqlite3.Database,
    });
  }

  const existingPost = await db.get(
    "SELECT * FROM post WHERE day = ?",
    data.day
  );

  if (!existingPost) {
    const post = await db.run(
      "INSERT INTO post(day, description) VALUES (?, ?)",
      data.day,
      data.description
    );
    return NextResponse.json({ post }, { status: 200 });
  }
  return NextResponse.json({ error: "Post already exists" }, { status: 200 });
}
