"use client";

import Sidebar from "../components/Sidebar/page";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import WeightLineChart from "../components/WeightLineChart";

const Inicio = () => {
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [pesoActual, setPesoActual] = useState("-");
  const [pesoObjetivo, setPesoObjetivo] = useState("-");
  const [weightData, setWeightData] = useState<WeightData[]>([]);

  interface WeightData {
    date: string;
    weight_kg: number;
  }

  useEffect(() => {
    const nombre = localStorage.getItem("user_name") || "Usuario";
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    setUserName(nombre);

    if (userId) {
      fetch(`https://backend-salud.onrender.com/profile/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error al obtener perfil");
          return res.json();
        })
        .then((data) => {
          setPesoActual(data.weight_kg);
          setPesoObjetivo(data.desired_weight_kg);
        })
        .catch((err) => {
          console.error("Error:", err.message);
        });
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      fetch(`https://backend-salud.onrender.com/weight-history/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data.weightHistory)) {
            setWeightData(data.weightHistory);
          }
        })
        .catch((err) =>
          console.error("Error al cargar evolución de peso:", err)
        );
    }
  }, []);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 p-10 md:px-16 relative">
        {/* Encabezado */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold my-10 text-[#1E1E1E]">
              Hola, <span className="text-[#3CA464]">{userName} 💪</span>
            </h1>
            <p className="text-[#1E1E1E] font-lato font-semibold text-lg md:text-2xl mb-4">
              Peso Actual:{" "}
              <span className="font-lato font-semibold">{pesoActual} kg.</span>
            </p>
            <p className="text-[#3CA464] font-lato font-semibold text-lg md:text-2xl">
              Peso Objetivo:{" "}
              <span className=" font-lato font-semibold">
                {pesoObjetivo} kg.
              </span>
            </p>
          </div>

          {/* Logo */}
          <div className="text-3xl font-extrabold justify-between">
            <h2 className="text-[#3CA464]">
              Balance<span className="text-[#1E1E1E]">AI</span>
            </h2>
          </div>
        </div>

        <div className="flex md:flex-row flex-col md:gap-50 -mt-4">
          {/* Gráfico */}
          <div className="mt-8 mb-8 md:w-xl w-xs">
            {weightData.length > 0 ? (
              <div className="mt-8 mb-8">
                <WeightLineChart weightData={weightData} />
              </div>
            ) : (
              <p className="text-gray-500 text-sm mt-8 mb-8">
                Aún no hay datos de peso para mostrar.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-10 mt-45">
            <button
              className="bg-[#3CA464] text-white font-bold cursor-pointer text-base px-10 py-3 rounded-3xl shadow-md hover:bg-[#2e8c54] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
              onClick={() => router.push("/plans")}
            >
              Ver Planes
            </button>
            <button
              onClick={() => router.push("/suggestions")}
              className="bg-[#3CA464] text-white font-bold cursor-pointer text-base px-10 py-3 rounded-3xl shadow-md hover:bg-[#2e8c54] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
            >
              Registrar Progreso
            </button>
          </div>
        </div>

        <div className="flex md:flex-row flex-col mt-6">
          {/* Consejos */}
          <div className="max-w-3xl -mt-10">
            <h3 className="text-2xl font-extrabold text-[#1E1E1E] mb-2">
              Lana te ofrece los:{" "}
              <span className="text-[#3CA464]">“Consejos del día”</span>
            </h3>
            <p className="text-[#1E1E1E]/55 mb-2 text-lg font-lato font-semibold">
              Planifica tus comidas y entrenamientos como si fueran reuniones
              importantes. Si están en tu agenda, se hacen.
            </p>
            <p className="text-[#1E1E1E]/55 text-lg font-lato font-semibold">
              No esperes motivación. Diseña tu entorno para no fallar: ten
              comida saludable lista y tu ropa de entrenamiento a la vista.
            </p>
          </div>

          {/* Imagen de Lana */}
          <div className="absolute bottom-10 right-30 hidden md:block transition-transform duration-300 ease-in-out hover:scale-[1.03]">
            <Image
              src="/lanasidebar.png"
              alt="Lana - Asistente"
              width={220}
              height={220}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
