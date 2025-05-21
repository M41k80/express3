"use client";
import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "@/app/context/AuthContext";

interface LogItem {
  date: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight_kg: number;
}

export default function WorkoutHistory() {
  const { userId } = useContext(AuthContext);
  const [history, setHistory] = useState<LogItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return; // ← Esperamos a que exista userId

    const fetchHistory = async () => {
      try {
        const { data } = await api.get("/workout/history", {
          params: { user_id: userId },
        });
        setHistory(data.history);
      } catch (err) {
        console.error("Error al cargar historial:", err);
        setError("No se pudo cargar el historial.");
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-extrabold mb-4 text-[#1E1E1E]">
        Historial de Entrenamientos
      </h2>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <div className="bg-[#FEFFEF] border border-[#1E1E1E]/55 font-lato font-medium text-base shadow-lg rounded-2xl mb-8 w-full overflow-clip">
        <ul className="p-6 pr-6 text-[#1E1E1E]/55 max-h-[40vh] overflow-auto list-disc pl-10 leading-relaxed">
          {history.map((item, i) => (
            <li key={i} className="text-[#1E1E1E]/55">
              <strong>{item.date}</strong>: {item.exercise_name} – {item.sets}×
              {item.reps} @ {item.weight_kg} kg
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
