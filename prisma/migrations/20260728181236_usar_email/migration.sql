/*
  Warnings:

  - You are about to drop the column `correo` on the `Solicitud` table. All the data in the column will be lost.
  - You are about to drop the column `empresa` on the `Solicitud` table. All the data in the column will be lost.
  - Added the required column `email` to the `Solicitud` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Solicitud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Solicitud" ("createdAt", "estado", "id", "mensaje", "nombre", "servicio", "telefono") SELECT "createdAt", "estado", "id", "mensaje", "nombre", "servicio", "telefono" FROM "Solicitud";
DROP TABLE "Solicitud";
ALTER TABLE "new_Solicitud" RENAME TO "Solicitud";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
