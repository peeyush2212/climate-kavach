import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

export async function GET() {
  const file = path.join(process.cwd(), "data", "sample", "india_roads_sample_data_pack.zip");
  const buf = fs.readFileSync(file);
  return new NextResponse(buf, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": "attachment; filename=india_roads_sample_data_pack.zip",
    },
  });
}
