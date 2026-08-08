import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ACTUALIZAR CITA (estado y/o fecha)
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const data: {
      estado?: string;
      fecha?: Date;
    } = {};

    // Actualizar estado
    if (body.estado) {
      data.estado = body.estado;
    }

    // Reprogramar fecha
    if (body.fecha) {
      data.fecha = new Date(body.fecha);
    }

    const cita = await prisma.cita.update({
      where: {
        id: Number(id),
      },
      data,
    });

    return NextResponse.json(
      {
        success: true,
        cita,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("ERROR PATCH CITA");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo actualizar la cita",
      },
      {
        status: 500,
      }
    );
  }
}

// ELIMINAR CITA
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.cita.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Cita eliminada correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("ERROR DELETE CITA");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo eliminar la cita",
      },
      {
        status: 500,
      }
    );
  }
}

// OBTENER UNA CITA
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const cita = await prisma.cita.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!cita) {
      return NextResponse.json(
        {
          success: false,
          error: "La cita no existe",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        success: true,
        cita,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("ERROR GET CITA");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo obtener la cita",
      },
      {
        status: 500,
      }
    );
  }
}