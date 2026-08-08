import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { usuario, password } = await request.json();

  if (
    usuario === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", "autenticado", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 horas
      path: "/",
    });
    return response;
  }

  return NextResponse.json({ ok: false, error: "Credenciales incorrectas" }, { status: 401 });
}