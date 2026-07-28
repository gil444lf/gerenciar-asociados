"use client";

import { useState } from "react";

const VALOR_UVT_2026 = 52374;

export default function UvtCalculator() {
  const [uvt, setUvt] = useState("");
  const [pesos, setPesos] = useState("");

  const handleUvtChange = (valor: string) => {
    setUvt(valor);

    const numero = parseFloat(valor);
    if (!isNaN(numero)) {
      setPesos((numero * VALOR_UVT_2026).toFixed(0));
    } else {
      setPesos("");
    }
  };

  const handlePesosChange = (valor: string) => {
    setPesos(valor);

    const numero = parseFloat(valor);
    if (!isNaN(numero)) {
      setUvt((numero / VALOR_UVT_2026).toFixed(2));
    } else {
      setUvt("");
    }
  };

  const formatearPesos = (valor: string) => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return "";
    return numero.toLocaleString("es-CO");
  };

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h3 className="mb-2 text-2xl font-bold text-slate-900">
        Conversor UVT ↔ Pesos
      </h3>
      <p className="mb-6 text-sm text-slate-500">
        Valor UVT 2026: ${VALOR_UVT_2026.toLocaleString("es-CO")} COP
      </p>

      <div className="mb-5">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          UVT
        </label>
        <input
          type="number"
          value={uvt}
          onChange={(e) => handleUvtChange(e.target.value)}
          placeholder="Ej: 10"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />
      </div>

      <div className="mb-2 text-center text-sm font-semibold text-blue-700">
        ↕
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Pesos colombianos (COP)
        </label>
        <input
          type="number"
          value={pesos}
          onChange={(e) => handlePesosChange(e.target.value)}
          placeholder="Ej: 523740"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />
        {pesos && (
          <p className="mt-2 text-sm text-slate-500">
            ${formatearPesos(pesos)} COP
          </p>
        )}
      </div>
    </div>
  );
}