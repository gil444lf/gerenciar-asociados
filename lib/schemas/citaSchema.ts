import { z } from "zod";

export const citaSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Correo electrónico inválido"),
  telefono: z.string().min(7, "Número de teléfono inválido"),
  servicio: z.string().min(1, "Selecciona un servicio"),
  fecha: z.string().min(1, "Selecciona una fecha y hora"),
  mensaje: z.string().optional(),
});

export type CitaFormData = z.infer<typeof citaSchema>;