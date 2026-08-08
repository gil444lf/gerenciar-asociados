"use client";

import { useState } from "react";

const SALARIO_MINIMO_2026 = 1_750_905;
const SALARIO_BASE = SALARIO_MINIMO_2026 * 2;

const EDAD_HOMBRE = 62;
const EDAD_MUJER = 57;

type Genero = "hombre" | "mujer";
type Regimen = "RPM" | "RAIS";

export default function PensionCalculator() {
  const [genero, setGenero] = useState<Genero>("hombre");
  const [regimen, setRegimen] = useState<Regimen>("RPM");
  const [edadActual, setEdadActual] = useState("");

  const edad = Number(edadActual);

  const edadPension =
    genero === "hombre" ? EDAD_HOMBRE : EDAD_MUJER;

  const datosValidos = edad > 0 && edad <= 100;

  // Estimación orientativa para RPM
  const tasaRPM = 0.645;
  const pensionRPM = SALARIO_BASE * tasaRPM;

  // Estimación orientativa para RAIS
  const factorRAISHombre = 0.52;
  const factorRAISMujer = 0.46;

  const factorRAIS =
    genero === "hombre"
      ? factorRAISHombre
      : factorRAISMujer;

  const pensionRAIS = SALARIO_BASE * factorRAIS;

  const pensionEstimada =
    regimen === "RPM"
      ? pensionRPM
      : pensionRAIS;

  const porcentajeEstimado =
    regimen === "RPM"
      ? tasaRPM * 100
      : factorRAIS * 100;

  const aniosFaltantes = datosValidos
    ? Math.max(edadPension - edad, 0)
    : null;

  const formatoPesos = (valor: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(valor);

  return (
    <section
      className="relative left-1/2 w-screen -translate-x-1/2 min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat py-24"
      style={{
        backgroundImage: "url('/pension-bg.jpg')",
      }}
    >
      {/* Overlay sobre toda la imagen */}
      <div className="absolute inset-0 bg-blue-950/75" />

      {/* CONTENIDO */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* HERO */}
        <div className="mb-12 text-center text-white">

          <span className="mb-5 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold tracking-wide backdrop-blur-md">
            PLANEACIÓN PENSIONAL
          </span>

          <h2 className="text-4xl font-extrabold md:text-5xl">
            Calcula una estimación de tu pensión
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-blue-100">
            Compara de manera sencilla una referencia de pensión
            según tu género y el régimen pensional en el que cotizas.
          </p>

        </div>

        {/* TARJETA DE CALCULADORA */}
        <div className="mx-auto max-w-4xl rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-md md:p-10">

          <div className="mb-8">

            <h3 className="text-2xl font-bold text-slate-900">
              Calculadora de pensión
            </h3>

            <p className="mt-2 text-slate-600">
              La estimación utiliza como referencia una cotización
              equivalente a 2 salarios mínimos legales mensuales vigentes.
            </p>

          </div>

          {/* CAMPOS */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* GÉNERO */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Género
              </label>

              <select
                value={genero}
                onChange={(e) =>
                  setGenero(e.target.value as Genero)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
              >
                <option value="hombre">
                  Hombre
                </option>

                <option value="mujer">
                  Mujer
                </option>
              </select>

            </div>

            {/* EDAD */}
            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Edad actual
              </label>

              <input
                type="number"
                min="18"
                max="100"
                value={edadActual}
                onChange={(e) =>
                  setEdadActual(e.target.value)
                }
                placeholder="Ej: 40"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-200"
              />

            </div>

            {/* RÉGIMEN */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Régimen pensional
              </label>

              <div className="grid gap-4 md:grid-cols-2">

                {/* RPM */}
                <button
                  type="button"
                  onClick={() => setRegimen("RPM")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    regimen === "RPM"
                      ? "border-blue-800 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-lg font-bold text-slate-900">
                        RPM
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Régimen de Prima Media
                      </p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-4 ${
                        regimen === "RPM"
                          ? "border-blue-700"
                          : "border-slate-300"
                      }`}
                    />

                  </div>

                </button>

                {/* RAIS */}
                <button
                  type="button"
                  onClick={() => setRegimen("RAIS")}
                  className={`rounded-2xl border-2 p-5 text-left transition ${
                    regimen === "RAIS"
                      ? "border-blue-800 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-lg font-bold text-slate-900">
                        RAIS
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        Régimen de Ahorro Individual
                      </p>
                    </div>

                    <div
                      className={`h-5 w-5 rounded-full border-4 ${
                        regimen === "RAIS"
                          ? "border-blue-700"
                          : "border-slate-300"
                      }`}
                    />

                  </div>

                </button>

              </div>

            </div>

          </div>

          {/* RESULTADO */}
          {datosValidos && (
            <div className="mt-10 overflow-hidden rounded-3xl bg-blue-950 text-white shadow-xl">

              <div className="p-8">

                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">

                  <div>

                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                      Estimación de pensión
                    </p>

                    <h4 className="mt-2 text-3xl font-extrabold md:text-4xl">
                      {formatoPesos(pensionEstimada)}
                    </h4>

                    <p className="mt-2 text-blue-200">
                      Valor mensual estimado
                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">

                    <p className="text-sm text-blue-200">
                      Régimen seleccionado
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      {regimen}
                    </p>

                  </div>

                </div>

                {/* DATOS */}
                <div className="grid gap-4 md:grid-cols-3">

                  <div className="rounded-2xl bg-white/10 p-5">

                    <p className="text-sm text-blue-200">
                      Género
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {genero === "hombre"
                        ? "Hombre"
                        : "Mujer"}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">

                    <p className="text-sm text-blue-200">
                      Edad de referencia
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {edadPension} años
                    </p>

                  </div>

                  <div className="rounded-2xl bg-white/10 p-5">

                    <p className="text-sm text-blue-200">
                      Base de cotización
                    </p>

                    <p className="mt-1 text-lg font-bold">
                      {formatoPesos(SALARIO_BASE)}
                    </p>

                  </div>

                </div>

                {/* TASA */}
                <div className="mt-6 rounded-2xl bg-white/10 p-5">

                  <div className="flex items-center justify-between">

                    <span className="text-blue-200">
                      Tasa de referencia utilizada
                    </span>

                    <span className="font-bold">
                      {porcentajeEstimado.toFixed(1)}%
                    </span>

                  </div>

                </div>

                {/* EDAD RESTANTE */}
                {aniosFaltantes !== null && (
                  <div className="mt-6 rounded-2xl bg-white/10 p-5">

                    <p className="text-blue-200">
                      Edad estimada de pensión
                    </p>

                    <p className="mt-1 text-xl font-bold">

                      {aniosFaltantes === 0
                        ? "Ya alcanzó la edad de referencia"
                        : `Aproximadamente ${aniosFaltantes.toFixed(
                            1
                          )} años restantes`}

                    </p>

                  </div>
                )}

              </div>

            </div>
          )}

          {/* EXPLICACIÓN */}
          <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-5">

            <h4 className="font-bold text-blue-950">
              ¿Cómo interpretar este resultado?
            </h4>

            <p className="mt-2 text-sm leading-6 text-slate-600">

              El cálculo es una referencia educativa basada en una
              cotización equivalente a 2 SMMLV. En el RPM, el valor real
              depende principalmente del ingreso base de liquidación y de
              la historia laboral. En el RAIS, la mesada depende del capital
              acumulado, rentabilidad, bono pensional cuando corresponda,
              modalidad de pensión y características del afiliado.

            </p>

          </div>

          {/* AVISO */}
          <p className="mt-6 text-xs leading-5 text-slate-400">

            * Esta herramienta proporciona una estimación orientativa y no
            constituye una liquidación pensional ni asesoría financiera o
            jurídica. Los valores reales pueden variar de acuerdo con la
            normativa vigente, historia laboral, capital acumulado,
            rentabilidad, semanas, beneficiarios y demás condiciones
            aplicables al afiliado.

          </p>

        </div>

      </div>
    </section>
  );
}