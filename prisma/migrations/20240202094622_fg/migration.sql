/*
  Warnings:

  - You are about to drop the column `roomId` on the `Faculty` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_roomId_fkey";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "roomId";

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_roomName_fkey" FOREIGN KEY ("roomName") REFERENCES "Room"("name") ON DELETE SET NULL ON UPDATE CASCADE;
