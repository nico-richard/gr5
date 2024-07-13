import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import { PhotoModel } from "@/models/Photo";

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
  const photos = await db.all<PhotoModel[]>(
    "SELECT * FROM photo WHERE id_post = ?",
    params.day
  );
  return NextResponse.json({ photos }, { status: 200 });
}
