import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const cliente = await prisma.cliente.findUnique({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json(cliente);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const body = await request.json();

  const cliente = await prisma.cliente.update({
    where: {
      id: Number(id),
    },
    data: body,
  });

  return NextResponse.json(cliente);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  await prisma.cliente.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}