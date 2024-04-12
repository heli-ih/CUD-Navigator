import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  console.log("in location GET");
  try {
    const locations = await prisma.location.findMany({
      include: {
        persons: true,
      },
    });
    return new NextResponse(JSON.stringify(locations), { status: 200 });
  } catch (error) {
    console.error("Error fetching location data:", error);
    return new NextResponse("Error fetching location data", { status: 500 });
  }
}
