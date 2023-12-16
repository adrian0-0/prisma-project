/*
  Warnings:

  - Made the column `description` on table `Todo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Todo" ALTER COLUMN "name" SET DEFAULT '';
ALTER TABLE "Todo" ALTER COLUMN "description" SET NOT NULL;
ALTER TABLE "Todo" ALTER COLUMN "description" SET DEFAULT '';
