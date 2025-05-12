"use client";
import Image from "next/image";
import laptop from "/public/testhealth.svg";

const Servicios = () => {
  return (
    <section
      id="servicios"
      className="bg-white py-20 px-6 md:px-12 lg:px-24 w-full mx-auto"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Imagen */}
        <div className="w-full md:w-1/2">
          <Image
            src={laptop}
            alt="Laptop con plataforma BalanceAI"
            className="rounded-3xl w-full h-auto object-contain"
            priority
          />
        </div>

        {/* Texto */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-5">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E1E1E] leading-[1.2]">
            Servicios que <br /> Transforman
            <br />
            <span className="text-[#3CA464]">tu Bienestar</span>
          </h2>
          <p className="text-2xl font-extrabold font-lato text-[#1E1E1E]/55">
            Conecta tu cuerpo, mente y metas con tecnología que evoluciona
            contigo.
          </p>
          <p className="text-xl font-medium font-lato text-[#1E1E1E]/55 leading-relaxed">
            Descubre cómo nuestra plataforma impulsada por IA puede guiarte
            hacia una vida más saludable y equilibrada:
          </p>
        </div>
      </div>

      {/* Tarjetas de servicios */}
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
        {/* Tarjeta 1 */}
        <div className="bg-[#FAFAE7] rounded-3xl shadow-md p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:scale-[1.03]">
          <Image
            src="/registro.svg"
            alt="Ícono registro salud"
            width={80}
            height={80}
            className="mb-4"
          />
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">
            REGISTRO DE SALUD <br className="hidden md:block" /> INTELIGENTE
          </h3>
          <p className="text-[#1E1E1E]/55 text-xl font-medium font-lato">
            Ingresa tus datos físicos y de bienestar en segundos. Nuestra IA los
            analiza y se adapta a ti desde el primer momento.
          </p>
        </div>

        {/* Tarjeta 2 */}
        <div className="bg-[#FAFAE7] rounded-3xl shadow-md p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:scale-[1.03]">
          <Image
            src="/planes.svg"
            alt="Ícono planes personalizados"
            width={80}
            height={80}
            className="mb-4"
          />
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">
            PLANES PERSONALIZADOS <br className="hidden md:block" /> POR IA
          </h3>
          <p className="text-[#1E1E1E]/55 text-xl font-medium font-lato">
            Recibe rutinas de ejercicio y planes de alimentación únicos, basados
            en tu salud actual y tus objetivos personales.
          </p>
        </div>

        {/* Tarjeta 3 */}
        <div className="bg-[#FAFAE7] rounded-3xl shadow-md p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:scale-[1.03]">
          <Image
            src="/dashboard.svg"
            alt="Ícono dashboard progreso"
            width={80}
            height={80}
            className="mb-4"
          />
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">
            DASHBOARD DE <br className="hidden md:block" /> PROGRESO
          </h3>
          <p className="text-[#1E1E1E]/55 text-xl font-medium font-lato">
            Visualiza tu evolución con gráficas interactivas, porcentajes y
            reportes que te muestran cada avance.
          </p>
        </div>

        {/* Tarjeta 4 */}
        <div className="bg-[#FAFAE7] rounded-3xl shadow-md p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-300 ease-in-out hover:scale-[1.03]">
          <Image
            src="/recomendaciones.svg"
            alt="Ícono recomendaciones dinámicas"
            width={80}
            height={80}
            className="mb-4"
          />
          <h3 className="text-2xl font-bold text-[#1E1E1E] mb-2">
            RECOMENDACIONES <br className="hidden md:block" /> DINÁMICAS
          </h3>
          <p className="text-[#1E1E1E]/55 text-xl font-medium font-lato">
            A medida que cambian tus datos, nuestra IA recalibra tus planes y te
            ofrece nuevas estrategias para seguir avanzando.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Servicios;
