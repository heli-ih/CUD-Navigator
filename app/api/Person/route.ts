import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  console.log("in person GET");
  try {
    const persons = await prisma.person.findMany({
      include: {
        location: true,
      },
    });
    return new NextResponse(JSON.stringify(persons), { status: 200 });
  } catch (error) {
    console.error("Error fetching person data:", error);
    return new NextResponse("Error fetching person data", { status: 500 });
  }
}
