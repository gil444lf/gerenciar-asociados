-- CreateTable
CREATE TABLE "Solicitud" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "empresa" TEXT,
    "servicio" TEXT NOT NULL,
    "mensaje" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'Pendiente',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
