import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db: Database | null = null;

export async function GET(req: NextRequest, res: NextResponse) {
  // Check if the database instance has been initialized
  if (!db) {
    // If the database instance is not initialized, open the database connection
    db = await open({
      filename: "./posts.db", // Specify the database file path
      driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
    });
  }

  // Perform a database query to retrieve all items from the "items" table
  const posts = await db.all("SELECT * FROM post");

  // Return the items as a JSON response with status 200
  return NextResponse.json({ posts }, { status: 200 });
}
