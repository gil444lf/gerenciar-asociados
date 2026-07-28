import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

const estadisticas = [
  {
    numero: 15,
    prefijo: "+",
    sufijo: "",
    texto: "Años de experiencia",
  },
  {
    numero: 500,
    prefijo: "+",
    sufijo: "",
    texto: "Clientes asesorados",
  },
  {
    numero: 98,
    prefijo: "",
    sufijo: "%",
    texto: "Satisfacción",
  },
  {
    numero: 1200,
    prefijo: "+",
    sufijo: "",
    texto: "Declaraciones realizadas",
  },
];


export default function Hero() {
  return ( 
  <section
  id="inicio"
  className="flex min-h-[90vh] items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 px-6"
>

      <div className="max-w-5xl text-center text-white">
        

        <p className="mb-3 text-lg font-semibold uppercase tracking-[0.3em] text-blue-300">
          Bienvenido a
        </p>

        <h1 className="mb-6 text-6xl font-extrabold leading-tight">
          GERENCIAR ASOCIADOS
        </h1>

        <p className="mx-auto mb-10 max-w-3xl text-xl leading-9 text-gray-300">
          Soluciones integrales en Gestión Financiera,
          Contabilidad, Asesoría Tributaria,
          Auditoría y Revisoría Fiscal para
          empresas y personas.
        </p>

        {/* Servicios principales */}
        <div className="mb-12 flex flex-wrap justify-center gap-4">

          <span className="rounded-full bg-white/10 px-5 py-2">
            ✔ Gestión Financiera
          </span>

          <span className="rounded-full bg-white/10 px-5 py-2">
            ✔ Contabilidad
          </span>

          <span className="rounded-full bg-white/10 px-5 py-2">
            ✔ Auditoría
          </span>

        </div>

        {/* Botones */}
        <div className="flex flex-wrap justify-center gap-5">
            <Button texto="Solicitar Asesoría" href="#contacto" />

            <Button texto="Ver Servicios"
            variant="secondary"
            href="#servicios"
        />

         
        </div>

        {/* Estadísticas */}
        <div className="mt-20 grid grid-cols-2 gap-10 text-center md:grid-cols-4">

          {estadisticas.map((item) => (
            <div key={item.texto}>

            <h2 className="text-4xl font-bold text-blue-300">
            <Counter end={item.numero} prefix={item.prefijo} suffix={item.sufijo} />
            </h2>

              <p className="mt-2 text-gray-300">
                {item.texto}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}