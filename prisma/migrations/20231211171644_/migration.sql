/*
  Warnings:

  - You are about to alter the column `id` on the `Todo` table. The data in that column will be cast from `BigInt` to `Int`. This cast may fail. Please make sure the data in the column can be cast.

*/
-- RedefineTables
CREATE TABLE "_prisma_new_Todo" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "status" BOOL NOT NULL DEFAULT false,
    "name" STRING NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("id")
);
INSERT INTO "_prisma_new_Todo" ("id","name","status") SELECT "id","name","status" FROM "Todo";
DROP TABLE "Todo" CASCADE;
ALTER TABLE "_prisma_new_Todo" RENAME TO "Todo";