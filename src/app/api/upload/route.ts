import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import fs from "node:fs/promises";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const day = formData.get("day") as String;

    for (const [index, file] of files.entries()) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const extension = file.name.split(".").pop();
      await fs.writeFile(
        `./public/uploads/${day}_${index}${extension ? "." + extension : ""}`,
        buffer
      );
    }

    revalidatePath("/");

    return NextResponse.json({ status: "success" });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ status: "fail", error: e });
  }
}
