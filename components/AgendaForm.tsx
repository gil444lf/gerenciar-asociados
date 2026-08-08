"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { citaSchema, CitaFormData } from "@/lib/schemas/citaSchema";

export default function AgendaForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CitaFormData>({
    resolver: zodResolver(citaSchema),
  });

  const onSubmit = async (data: CitaFormData) => {
    try {
      const res = await fetch("/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Error al enviar");

      reset();
      alert("¡Cita agendada con éxito! Te contactaremos para confirmarla.");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al agendar tu cita.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <input
          {...register("nombre")}
          placeholder="Nombre completo"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
        {errors.nombre && (
          <p className="mt-1 text-sm text-red-600">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          placeholder="Correo electrónico"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("telefono")}
          placeholder="Teléfono"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
        {errors.telefono && (
          <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("servicio")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        >
          <option value="">¿Qué servicio necesitas?</option>
          <option value="gestion-financiera">Gestión Financiera</option>
          <option value="contabilidad">Contabilidad</option>
          <option value="tributaria">Asesoría Tributaria</option>
          <option value="auditoria">Auditoría</option>
          <option value="revisoria">Revisoría Fiscal</option>
        </select>
        {errors.servicio && (
          <p className="mt-1 text-sm text-red-600">{errors.servicio.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm text-slate-600">Fecha y hora de la cita</label>
        <input
          type="datetime-local"
          {...register("fecha")}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
        />
        {errors.fecha && (
          <p className="mt-1 text-sm text-red-600">{errors.fecha.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("mensaje")}
          placeholder="¿Algo que debamos saber antes de la cita? (opcional)"
          rows={4}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-950 py-4 font-semibold text-white transition hover:bg-blue-900 disabled:opacity-50"
      >
        {isSubmitting ? "Agendando..." : "Agendar cita"}
      </button>
    </form>
  );
}