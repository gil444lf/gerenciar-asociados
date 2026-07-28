import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const enlaces = [
  { texto: "Inicio", href: "#inicio" },
  { texto: "Servicios", href: "#servicios" },
  { texto: "¿Por qué elegirnos?", href: "#why-us" },
  { texto: "Contacto", href: "#contacto" },
];

const servicios = [
  "Gestión Financiera",
  "Contabilidad",
  "Asesoría Tributaria",
  "Auditoría",
  "Revisoría Fiscal",
];

export default function Footer() {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 px-6 py-16 text-slate-300">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 md:grid-cols-4">
        {/* Columna 1: sobre la empresa */}
        <div>
          <h3 className="mb-4 text-xl font-bold text-white">
            GERENCIAR ASOCIADOS
          </h3>
          <p className="mb-5 text-sm leading-6">
            Soluciones integrales en gestión financiera, contabilidad,
            tributaria, auditoría y revisoría fiscal para empresas y personas.
          </p>
          <div className="flex gap-4">
<a href="#" className="transition hover:text-blue-300">
  <FaFacebook size={20} />
</a>
<a href="#" className="transition hover:text-blue-300">
  <FaInstagram size={20} />
</a>
<a href="#" className="transition hover:text-blue-300">
  <FaLinkedin size={20} />
</a>
          </div>
        </div>

        {/* Columna 2: enlaces rápidos */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Enlaces rápidos</h4>
          <ul className="space-y-3 text-sm">
            {enlaces.map((enlace) => (
              <li key={enlace.texto}>
                <a href={enlace.href} className="transition hover:text-blue-300">
                  {enlace.texto}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Columna 3: servicios */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Servicios</h4>
          <ul className="space-y-3 text-sm">
            {servicios.map((servicio) => (
              <li key={servicio}>{servicio}</li>
            ))}
          </ul>
        </div>

        {/* Columna 4: contacto */}
        <div>
          <h4 className="mb-4 font-semibold text-white">Contacto</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span>Manizales, Caldas, Colombia</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} className="shrink-0" />
              <span>+57 300 000 0000</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} className="shrink-0" />
              <span>contacto@gerenciarasociados.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="mx-auto mt-12 max-w-7xl border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        © {anioActual} Gerenciar Asociados. Todos los derechos reservados.
      </div>
    </footer>
  );
}