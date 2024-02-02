-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_roomName_fkey";

-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "roomId" INTEGER;

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
