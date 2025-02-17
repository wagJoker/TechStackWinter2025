/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Artwork` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Artwork` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artwork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "imageUrl" TEXT NOT NULL DEFAULT 'https://source.unsplash.com/random/800x600?' || uuid(),
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Artwork" ("artist", "availability", "id", "imageUrl", "price", "title", "type") SELECT "artist", "availability", "id", coalesce("imageUrl", 'https://source.unsplash.com/random/800x600?' || uuid()) AS "imageUrl", "price", "title", "type" FROM "Artwork";
DROP TABLE "Artwork";
ALTER TABLE "new_Artwork" RENAME TO "Artwork";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
