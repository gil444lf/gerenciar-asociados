"use client";

import { useState } from "react";

const SEMANAS_HOMBRES = 1300;
const SEMANAS_MUJERES_2026 = 1250;
const EDAD_PENSION_HOMBRES = 62;
const EDAD_PENSION_MUJERES = 57;
const REDUCCION_POR_HIJO = 50;
const MAX_HIJOS_CONTABLES = 3;

export default function PensionCalculator() {
  const [genero, setGenero] = useState<"hombre" | "mujer">("hombre");
  const [edadActual, setEdadActual] = useState("");
  const [semanasActuales, setSemanasActuales] = useState("");
  const [numeroHijos, setNumeroHijos] = useState("0");

  const edad = parseFloat(edadActual);
  const semanas = parseFloat(semanasActuales);
  const hijos = Math.min(parseFloat(numeroHijos) || 0, MAX_HIJOS_CONTABLES);

  const edadPension = genero === "hombre" ? EDAD_PENSION_HOMBRES : EDAD_PENSION_MUJERES;

  const semanasRequeridas =
    genero === "hombre"
      ? SEMANAS_HOMBRES
      : SEMANAS_MUJERES_2026 - hijos * REDUCCION_POR_HIJO;

  const datosValidos = !isNaN(edad) && !isNaN(semanas) && edad > 0 && semanas >= 0;

  const semanasFaltantes = datosValidos
    ? Math.max(semanasRequeridas - semanas, 0)
    : null;

  const aniosFaltantesPorEdad = datosValidos
    ? Math.max(edadPension - edad, 0)
    : null;

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="mb-2 text-2xl font-bold text-slate-900">
        ¿Cuánto me falta para pensionarme?
      </h3>
      <p className="mb-6 text-sm text-slate-500">
        Estimación según el Régimen de Prima Media (Colpensiones) — año 2026
      </p>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Género
        </label>
        <select
          value={genero}
          onChange={(e) => setGenero(e.target.value as "hombre" | "mujer")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        >
          <option value="hombre">Hombre</option>
          <option value="mujer">Mujer</option>
        </select>
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Edad actual
        </label>
        <input
          type="number"
          value={edadActual}
          onChange={(e) => setEdadActual(e.target.value)}
          placeholder="Ej: 40"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />
      </div>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Semanas cotizadas actuales
        </label>
        <input
          type="number"
          value={semanasActuales}
          onChange={(e) => setSemanasActuales(e.target.value)}
          placeholder="Ej: 800"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />
      </div>

      {genero === "mujer" && (
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Número de hijos (máx. 3 para el beneficio)
          </label>
          <input
            type="number"
            value={numeroHijos}
            onChange={(e) => setNumeroHijos(e.target.value)}
            placeholder="Ej: 2"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
          />
        </div>
      )}

      {datosValidos && (
        <div className="mt-6 space-y-3 rounded-xl bg-blue-50 p-6">
          <p className="text-slate-700">
            <strong>Semanas requeridas:</strong> {semanasRequeridas}
          </p>
          <p className="text-slate-700">
            <strong>Semanas que te faltan:</strong> {semanasFaltantes}
          </p>
          <p className="text-slate-700">
            <strong>Edad de pensión:</strong> {edadPension} años
          </p>
          <p className="text-slate-700">
            <strong>Años que te faltan por edad:</strong>{" "}
            {aniosFaltantesPorEdad?.toFixed(1)}
          </p>
        </div>
      )}

      <p className="mt-6 text-xs text-slate-400">
        * Esta es una estimación orientativa basada en las reglas generales del
        Régimen de Prima Media para 2026. Los requisitos exactos pueden variar
        según tu historia laboral y régimen de transición. Confirma tu caso
        específico con Colpensiones o tu asesor.
      </p>
    </div>
  );
}