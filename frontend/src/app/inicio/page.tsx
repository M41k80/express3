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
    <div className="flex bg-gray-50 min-h-screen font-lato">
      <Sidebar />

      <main className="flex-1 p-10 md:px-16 relative">
        {/* Encabezado */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl md:text-2xl font-bold mb-2 text-[#1E1E1E]">
              Hola, <span className="text-[#3CA464]">{userName} 💪</span>
            </h1>
            <p className="text-[#1E1E1E] font-medium mb-1">
              Peso Actual: <span className="font-normal">{pesoActual} kg.</span>
            </p>
            <p className="text-[#3CA464] font-bold">
              Peso Objetivo:{" "}
              <span className="font-normal">{pesoObjetivo} kg.</span>
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <button
              className="bg-[#3CA464] text-white font-bold text-sm px-6 py-2 rounded-full shadow-md hover:bg-[#2e8c54] transition"
              onClick={() => router.push("/plans")}
            >
              Ver Planes
            </button>
            <button
              onClick={() => router.push("/suggestions")}
              className="bg-[#3CA464] text-white font-bold text-sm px-6 py-2 rounded-full shadow-md hover:bg-[#2e8c54] transition"
            >
              Registrar Progreso
            </button>
          </div>
        </div>

        {/* Gráfico */}
        <div className="mt-8 mb-8 max-w-xl">
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
