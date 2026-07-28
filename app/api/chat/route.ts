import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres el asistente virtual de GERENCIAR ASOCIADOS, una firma colombiana de servicios de gestión financiera, contabilidad, asesoría tributaria, auditoría y revisoría fiscal, para empresas y personas naturales.

Información de la empresa:
- Servicios: Gestión Financiera, Contabilidad, Asesoría Tributaria, Auditoría y Revisoría Fiscal.
- Atiende empresas y personas naturales.
- Horario: lunes a viernes de 8:00 a.m. a 5:00 p.m.
- Para agendar una asesoría el usuario debe llenar el formulario de contacto de la página.

Responde siempre en español, de forma profesional y breve.`;

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: "GROQ_API_KEY no está configurada en Vercel.",
        },
        { status: 500 }
      );
    }

    const { mensajes } = await request.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const respuesta = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...mensajes,
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    return NextResponse.json({
      texto: respuesta.choices[0]?.message?.content ?? "",
    });

  } catch (error: any) {

    console.error("========== ERROR CHAT ==========");
    console.error(error);
    console.error("===============================");

    return NextResponse.json(
      {
        error: error?.message ?? "Error desconocido",
        status: error?.status,
        type: error?.type,
        code: error?.code,
        name: error?.name,
      },
      {
        status: 500,
      }
    );
  }
}