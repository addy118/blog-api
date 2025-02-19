/*
  Warnings:

  - You are about to drop the column `userId` on the `Follower` table. All the data in the column will be lost.
  - Added the required column `followeeId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_userId_fkey";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "userId",
ADD COLUMN     "followeeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followeeId_fkey" FOREIGN KEY ("followeeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
