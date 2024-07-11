import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { day: string } }
) {
  if (!params.day) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  try {
    const publicDirectoryPath = path.join(process.cwd(), "public/uploads");
    const files = await fs.readdirSync(publicDirectoryPath);

    const photos = files.filter((file) => {
      return file.split("_")[0] === params.day;
    });

    return NextResponse.json({ photos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read directory" },
      { status: 500 }
    );
  }
}
