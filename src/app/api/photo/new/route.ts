import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function POST(req: NextRequest) {
  const data: { day: number; photos: string[] } = await req.json();
  if (!db) {
    db = await open({
      filename: "./posts.db",
      driver: sqlite3.Database,
    });
  }

  for (const photo of data.photos) {
    await db.run(
      "INSERT INTO photo(name, id_post) VALUES (?, ?)",
      photo,
      data.day
    );
  }

  return NextResponse.json({ status: 200 });
}
