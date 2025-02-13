-- CreateTable
CREATE TABLE "Follower" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "followerId" INTEGER NOT NULL,
    "followedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unfollowedAt" TIMESTAMP(3),

    CONSTRAINT "Follower_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
