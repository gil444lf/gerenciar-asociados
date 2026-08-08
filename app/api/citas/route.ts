import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cita = await prisma.cita.create({
      data: {
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        servicio: body.servicio,
        fecha: new Date(body.fecha),
        mensaje: body.mensaje || "",
      },
    });

    return NextResponse.json(
      {
        success: true,
        cita,
      },
      {
        status: 201,
      }
    );

  } catch (error) {

    console.error("ERROR API CITAS");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo guardar la cita",
      },
      {
        status: 500,
      }
    );
  }
}