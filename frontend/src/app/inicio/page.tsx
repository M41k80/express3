"use client";

import Sidebar from "../components/Sidebar/page";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Inicio = () => {
  const router = useRouter();

  return (
    <div className="flex bg-gray-50 min-h-screen font-lato">
      <Sidebar />

      <main className="flex-1 p-10 md:px-16 relative">
        {/* Encabezado */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-[#1E1E1E]">
              Hola, <span className="text-[#3CA464]">Luis Angel 💪</span>
            </h1>
            <p className="text-[#1E1E1E] font-medium mb-1">
              Peso Actual: <span className="font-normal">82 kg.</span>
            </p>
            <p className="text-[#3CA464] font-bold">
              Peso Objetivo: <span className="font-normal">72 kg.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <button
              className="bg-[#3CA464] text-white font-bold text-sm px-6 py-2 rounded-full shadow-md hover:bg-[#2e8c54] transition"
              onClick={() => router.push("/plan")}
            >
              Ver Planes
            </button>
            <button className="bg-[#3CA464] text-white font-bold text-sm px-6 py-2 rounded-full shadow-md hover:bg-[#2e8c54] transition">
              Registrar Progreso
            </button>
          </div>
        </div>

        {/* Gráfico */}
        <div className="mt-6 mb-8">
          <Image
            src="/grafico-peso.png"
            alt="Gráfico de peso"
            width={500}
            height={250}
            className="rounded-xl border border-gray-200 shadow"
          />
        </div>

        {/* Consejos */}
        <div className="bg-white p-6 rounded-2xl shadow-sm max-w-3xl">
          <h3 className="text-lg font-bold text-[#1E1E1E] mb-2">
            Lana te ofrece los:{" "}
            <span className="text-[#3CA464]">“Consejos del día”</span>
          </h3>
          <p className="text-gray-600 mb-2 text-sm">
            Planifica tus comidas y entrenamientos como si fueran reuniones
            importantes. Si están en tu agenda, se hacen.
          </p>
          <p className="text-gray-600 text-sm">
            No esperes motivación. Diseña tu entorno para no fallar: ten comida
            saludable lista y tu ropa de entrenamiento a la vista.
          </p>
        </div>

        {/* Imagen de Lana */}
        <div className="absolute bottom-10 right-10 hidden md:block">
          <Image
            src="/lanasidebar.png"
            alt="Lana - Asistente"
            width={120}
            height={120}
          />
        </div>
      </main>
    </div>
  );
};

export default Inicio;
