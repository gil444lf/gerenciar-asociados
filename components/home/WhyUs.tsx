import {
  ShieldCheck,
  Clock3,
  Users,
  BadgeCheck,
} from "lucide-react";

const ventajas = [
  {
    icono: ShieldCheck,
    titulo: "Confianza y Transparencia",
    descripcion:
      "Trabajamos con ética profesional y total transparencia en cada proceso.",
  },
  {
    icono: Clock3,
    titulo: "Respuesta Oportuna",
    descripcion:
      "Atendemos cada solicitud con rapidez para que tomes decisiones a tiempo.",
  },
  {
    icono: Users,
    titulo: "Atención Personalizada",
    descripcion:
      "Cada cliente recibe acompañamiento de acuerdo con sus necesidades.",
  },
  {
    icono: BadgeCheck,
    titulo: "Calidad Profesional",
    descripcion:
      "Nuestro compromiso es ofrecer soluciones confiables y de alta calidad.",
  },
];

export default function WhyUs() {
  return (
    <section
  id="why-us"
  className="bg-slate-50 py-24"
>
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-4 text-center text-5xl font-bold text-slate-900">
          ¿Por qué elegirnos?
        </h2>

        <p className="mx-auto mb-16 max-w-3xl text-center text-lg text-gray-600">
          Más que un servicio contable, buscamos convertirnos en un aliado
          estratégico para el crecimiento de tu empresa.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {ventajas.map((ventaja) => {

            const Icono = ventaja.icono;

            return (

              <div
                key={ventaja.titulo}
                className="rounded-2xl bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">

                  <Icono className="h-8 w-8 text-blue-900" />

                </div>

                <h3 className="mb-4 text-2xl font-bold">
                  {ventaja.titulo}
                </h3>

                <p className="leading-8 text-gray-600">
                  {ventaja.descripcion}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </section>
  );
}