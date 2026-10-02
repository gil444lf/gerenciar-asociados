import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/schemas/contactSchema";
import { enviarCorreoSolicitud } from "@/lib/mailer";

export async function POST(request: Request) {
  const body = await request.json();

  // Validar también en el servidor (el del navegador se puede saltar)
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const data = parsed.data;

  const solicitud = await prisma.solicitud.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      servicio: data.servicio,
      mensaje: data.mensaje,
    },
  });

  // Si el correo falla, la solicitud igual queda guardada
  try {
    await enviarCorreoSolicitud(data);
  } catch (error) {
    console.error("Error enviando correo:", error);
  }

  return NextResponse.json(solicitud);
}

export async function GET() {
  const solicitudes = await prisma.solicitud.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(solicitudes);
}