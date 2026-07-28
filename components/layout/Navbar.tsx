"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scroll, setScroll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scroll
          ? "bg-slate-950/95 shadow-xl backdrop-blur-md py-2"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-8">
        <h1 className="text-2xl font-bold text-white">
          GERENCIAR ASOCIADOS
        </h1>

        {/* Links de escritorio: se ocultan en celular */}
        <ul className="hidden md:flex items-center gap-8 text-white">
          <li>
            <a href="#inicio" className="transition hover:text-blue-300">
              Inicio
            </a>
          </li>
          <li>
            <a href="#servicios" className="transition hover:text-blue-300">
              Servicios
            </a>
          </li>
          <li>
            <a href="#why-us" className="transition hover:text-blue-300">
              ¿Por qué elegirnos?
            </a>
          </li>
          <li>
            <a href="#contacto" className="transition hover:text-blue-300">
              Contacto
            </a>
          </li>
        </ul>

        {/* Botón hamburguesa: solo visible en celular */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Menú desplegable de celular */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden flex flex-col gap-4 bg-slate-950/95 backdrop-blur-md px-8 py-6 overflow-hidden"
          >
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#why-us" onClick={() => setMenuOpen(false)}>¿Por qué elegirnos?</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}