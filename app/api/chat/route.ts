import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Eres el asistente virtual de GERENCIAR ASOCIADOS.

Información:
- Gestión Financiera.
- Contabilidad.
- Asesoría Tributaria.
- Auditoría.
- Revisoría Fiscal.

Atiende empresas y personas naturales.

Si el usuario pregunta por precios específicos o casos legales complejos, indícale que debe solicitar una asesoría mediante el formulario de contacto.

Responde siempre en español, de forma profesional y breve.
`;

export async function POST(request: Request) {
  try {
    console.log("========== CHATBOT ==========");
    console.log("API KEY:", !!process.env.GROQ_API_KEY);

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: "La variable GROQ_API_KEY no existe.",
        },
        {
          status: 500,
        }
      );
    }

    const { mensajes } = await request.json();

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const respuesta = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...mensajes,
      ],
    });

    return NextResponse.json({
      texto: respuesta.choices[0].message.content,
    });

  } catch (error: any) {

    console.error("ERROR CHATBOT");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Error desconocido",
        status: error?.status || null,
        type: error?.type || null,
        code: error?.code || null,
      },
      {
        status: 500,
      }
    );
  }
}