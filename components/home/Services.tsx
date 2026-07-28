"use client";

import { motion } from "framer-motion";
import {
  LineChart,
  Calculator,
  FileText,
  ShieldCheck,
  ClipboardCheck,
} from "lucide-react";



const servicios = [
  {
    icono: LineChart,
    titulo: "Gestión Financiera",
    descripcion: "Planeación, flujo de caja, presupuestos y proyecciones para decisiones financieras sólidas.",
    items: ["Planeación financiera", "Flujo de caja", "Indicadores financieros", "Valoración empresarial"],
  },
  {
    icono: Calculator,
    titulo: "Contabilidad",
    descripcion: "Contabilidad general bajo NIIF, nómina, facturación electrónica y cierre contable.",
    items: ["Estados financieros", "Nómina", "Facturación electrónica", "Conciliaciones"],
  },
  {
    icono: FileText,
    titulo: "Asesoría Tributaria",
    descripcion: "Declaración de renta, IVA, retención en la fuente y planeación fiscal ante la DIAN.",
    items: ["Declaración de renta", "IVA y retenciones", "Planeación tributaria", "Régimen simple"],
  },
  {
    icono: ShieldCheck,
    titulo: "Auditoría",
    descripcion: "Auditoría financiera, interna, externa y de cumplimiento normativo.",
    items: ["Auditoría financiera", "Auditoría interna", "Auditoría de riesgos", "Auditoría de cumplimiento"],
  },
  {
    icono: ClipboardCheck,
    titulo: "Revisoría Fiscal",
    descripcion: "Cumplimiento de funciones legales de revisoría fiscal con informes periódicos.",
    items: ["Informes de revisoría", "Cumplimiento normativo", "Dictamen de estados financieros", "Control interno"],
  },
];

export default function Services() {
  return (
    <section id="servicios" className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-700">
            Nuestros servicios
          </p>
          <h2 className="text-4xl font-bold text-slate-900">
            Soluciones para empresas y personas
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {servicios.map((servicio, index) => {
            const Icono = servicio.icono;

            return (
              <motion.div
                key={servicio.titulo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-slate-100 p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-950">
                  <Icono className="h-7 w-7 text-white" />
                </div>

                <h3 className="mb-3 text-xl font-bold text-slate-900">
                  {servicio.titulo}
                </h3>

                <p className="mb-5 text-slate-600">
                  {servicio.descripcion}
                </p>

                <ul className="space-y-2">
                  {servicio.items.map((item) => (
                    <li key={item} className="flex items-center text-sm text-slate-500">
                      <span className="mr-2 h-1.5 w-1.5 rounded-full bg-blue-700" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}