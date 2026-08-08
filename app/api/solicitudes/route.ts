import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  const solicitud = await prisma.solicitud.create({
    data: {
      nombre: body.nombre,
      email: body.email,
      telefono: body.telefono,
      servicio: body.servicio,
      mensaje: body.mensaje,
    },
  });

  return NextResponse.json(solicitud);
}

export async function GET() {
  const solicitudes = await prisma.solicitud.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(solicitudes);
}