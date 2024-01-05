import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(res: NextResponse) {
  console.log("in faculty GET");
  try {
    const faculties = await prisma.faculty.findMany();
    return new NextResponse(JSON.stringify(faculties), { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty data:", error);
  }
}

export async function PATCH(req: NextRequest) {
  console.log("in faculty update");

  try {
    const newRoom = req.json().then(async (body) => {
      const newRoom = body.newRoom;
      const selectedFacId = body.selectedFacId;

      console.log("New Room: ", newRoom);

      await prisma.faculty.update({
        where: { id: selectedFacId },
        data: {
          roomName: newRoom,
        },
      });
    });

    return new NextResponse(JSON.stringify(req), { status: 200 });
  } catch (error) {
    console.error("Error updating faculty data:", error);
  }
}
