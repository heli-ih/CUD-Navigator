import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(res: NextResponse) {
  console.log("in room GET");
  try {
    const rooms = await prisma.room.findMany();
    return new NextResponse(JSON.stringify(rooms), { status: 200 });
  } catch (error) {
    console.error("Error fetching room data:", error);
  }
}
