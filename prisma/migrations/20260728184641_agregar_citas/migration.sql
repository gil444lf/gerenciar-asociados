-- CreateTable
CREATE TABLE "Cita" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "servicio" TEXT NOT NULL,
    "fecha" DATETIME NOT NULL,
    "mensaje" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'Pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
