import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Obtener todos los clientes
export async function GET() {
  try {
    const clientes = await prisma.cliente.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(clientes);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "No se pudieron obtener los clientes." },
      { status: 500 }
    );
  }
}

// Crear cliente
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cliente = await prisma.cliente.create({
      data: {
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        empresa: body.empresa,
      },
    });

    return NextResponse.json(cliente, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "No se pudo crear el cliente." },
      { status: 500 }
    );
  }
}