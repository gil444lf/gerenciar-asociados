import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres el asistente virtual de GERENCIAR ASOCIADOS...`;

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("No existe la variable GROQ_API_KEY");
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { mensajes } = await request.json();

    const respuesta = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
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

    console.error("============== ERROR GROQ ==============");
    console.error(error);
    console.error("========================================");

    return NextResponse.json(
      {
        error: error.message,
        detalle: error,
      },
      {
        status: 500,
      }
    );
  }
}