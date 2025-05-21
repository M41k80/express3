"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar/Sidebar";
import api from "../utils/api";
import { AuthContext } from "@/app/context/AuthContext";
import ReactMarkdown from "react-markdown";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PlanPDF } from "@/app/components/MyPlanPDF";
import Image from "next/image";

interface UserProfile {
  user_id: string;
  age: number;
  gender: string;
  height_cm: number;
  weight_kg: number;
  desired_weight_kg: number;
  fitness_level: string;
  training_place: string;
  goals: string[];
  restrictions?: string[];
  medical_conditions?: string[];
  habits?: string;
}

export default function PlanPage() {
  const { userId } = useContext(AuthContext);
  const [plan, setPlan] = useState<string>("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const router = useRouter();

  const handleGenerate = async () => {
    if (!userId) return alert("Usuario no autenticado");
    setLoading(true);

    try {
      const { data: profile } = await api.get<UserProfile>(
        `/profile/${userId}`
      );
      const { data } = await api.post<{ plan: string }>(
        "/plan/generate",
        profile
      );
      setPlan(data.plan);
    } catch (error) {
      alert("Error al generar el plan");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex pl-6 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-10 md:px-16 relative">
        {/* Header */}
        <div className="flex justify-between items-end">
          <div></div>
          {/* Logo */}
          <div className="text-3xl font-extrabold justify-between">
            <h2 className="text-[#3CA464]">
              Balance<span className="text-[#1E1E1E]">AI</span>
            </h2>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="px-2 py-6 max-w-6xl mx-auto text-left text-[#1E1E1E]">
          <h1 className="text-3xl font-extrabold mb-4">
            Planes de Entrenamiento y Comidas
          </h1>
          <p className="text-xl mb-8 font-lato font-medium text-[#1E1E1E]">
            Gracias a tu perfil de salud, hemos generado planes a tu medida que
            te ayudaran a alcanzar tus objetivos.
          </p>

          {/* Botón generar */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-[#3CA464] hover:bg-[#2e8c54] font-bold cursor-pointer  text-white py-3 px-6 rounded-3xl disabled:bg-[#1E1E1E]/55 disabled:cursor-not-allowed mb-8"
          >
            {loading ? "Generando..." : "Generar Plan Semanal"}
          </button>

          {/* Resultado del plan */}
          {plan && (
            <div className="text-left">
              {/* Contenedor externo */}
              <div className="bg-[#FEFFEF] border border-[#1E1E1E]/55 font-lato font-medium text-lg shadow-lg rounded-2xl mb-8 w-full overflow-clip">
                {/* Contenedor scroll */}
                <div className="p-6 pr-6 text-[#1E1E1E]/55 max-h-[60vh] overflow-auto">
                  <ReactMarkdown>{plan}</ReactMarkdown>
                </div>
              </div>

              <div className="flex justify-end w-full">
                <PDFDownloadLink
                  document={<PlanPDF content={plan} />}
                  fileName="plan_entrenamiento.pdf"
                  className="inline-block bg-[#3CA464] font-bold shadow-lg cursor-pointer hover:bg-[#2e8c54] text-white py-2 px-6 rounded-2xl transition-colors"
                >
                  {({ loading }) => (
                    <div className="flex items-center gap-2">
                      <Image
                        src="/descargar.png"
                        alt="Icono Descargar"
                        width={20}
                        height={20}
                      />
                      {loading ? "Preparando PDF..." : "Descargar"}
                    </div>
                  )}
                </PDFDownloadLink>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
