"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

interface Mensaje {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy el asistente virtual de Gerenciar Asociados. ¿En qué te puedo ayudar?",
    },
  ]);
  const [textoInput, setTextoInput] = useState("");
  const [cargando, setCargando] = useState(false);

  const enviarMensaje = async () => {
    if (textoInput.trim() === "" || cargando) return;

    const mensajeUsuario: Mensaje = { role: "user", content: textoInput };
    const nuevosMensajes = [...mensajes, mensajeUsuario];

    setMensajes(nuevosMensajes);
    setTextoInput("");
    setCargando(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: nuevosMensajes }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMensajes((mensajesAnteriores) => [
        ...mensajesAnteriores,
        { role: "assistant", content: data.texto },
      ]);
    } catch (error) {
      setMensajes((mensajesAnteriores) => [
        ...mensajesAnteriores,
        {
          role: "assistant",
          content: "Lo siento, tuve un problema para responder. Intenta de nuevo.",
        },
      ]);
    } finally {
      setCargando(false);
    }
  };

  const manejarTecla = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      enviarMensaje();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {abierto && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 flex h-96 w-80 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="bg-blue-950 px-5 py-4 text-white">
              <h4 className="font-semibold">Gerenciar Asociados</h4>
              <p className="text-xs text-blue-200">Asistente virtual</p>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {mensajes.map((mensaje, index) => (
                <div
                  key={index}
                  className={`flex ${
                    mensaje.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <p
                    className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                      mensaje.role === "user"
                        ? "bg-blue-950 text-white"
                        : "bg-slate-100 text-slate-800"
                    }`}
                  >
                    {mensaje.content}
                  </p>
                </div>
              ))}

              {cargando && (
                <div className="flex justify-start">
                  <p className="max-w-[80%] rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-500">
                    Escribiendo...
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 border-t border-slate-200 p-3">
              <input
                type="text"
                value={textoInput}
                onChange={(e) => setTextoInput(e.target.value)}
                onKeyDown={manejarTecla}
                placeholder="Escribe tu mensaje..."
                disabled={cargando}
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 disabled:opacity-50"
              />
              <button
                onClick={enviarMensaje}
                disabled={cargando}
                className="rounded-lg bg-blue-950 p-2 text-white transition hover:bg-blue-900 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setAbierto(!abierto)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-950 text-white shadow-xl transition hover:bg-blue-900"
      >
        {abierto ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </div>
  );
}