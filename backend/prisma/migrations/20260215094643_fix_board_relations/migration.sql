/*
  Warnings:

  - The `role` column on the `BoardMember` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BoardRole" AS ENUM ('OWNER', 'MEMBER');

-- AlterTable
ALTER TABLE "BoardMember" DROP COLUMN "role",
ADD COLUMN     "role" "BoardRole" NOT NULL DEFAULT 'MEMBER';
