"use client";

import { useEffect, useState, useContext } from "react";
import api from "../utils/api";
import DashboardCharts from "@/app/components/DashboardCharts";
import WorkoutHistory from "@/app/components/WorkoutHistory";


import { AuthContext } from "@/app/context/AuthContext";
import MealHistory from "@/app/components/MealHistory";

import Sidebar from "../components/Sidebar/Sidebar";

interface WorkoutData {
  date: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight_kg: number;
}

interface WeightData {
  date: string;
  weight_kg: number;
}

export default function DashboardPage() {
  const { userId } = useContext(AuthContext);
  const [workoutData, setWorkoutData] = useState<WorkoutData[]>([]);
  const [weightData, setWeightData] = useState<WeightData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        // 1) Historial de entrenamientos
        const { data: wResp } = await api.get<{ history: WorkoutData[] }>(
          "/workout/history",
          {
            params: { user_id: userId },
          }
        );
        setWorkoutData(Array.isArray(wResp.history) ? wResp.history : []);

        // 2) Historial real de peso
        const { data: whResp } = await api.get<{ weightHistory: WeightData[] }>(
          `/weight-history/${userId}`
        );
        setWeightData(
          Array.isArray(whResp.weightHistory) ? whResp.weightHistory : []
        );
      } catch (err) {
        console.error("Error al cargar los datos del dashboard:", err);
        setWorkoutData([]); // fallback
        setWeightData([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <p className="p-6 text-gray-600">Cargando datos del dashboard…</p>;
  }

  const hasWorkouts = Array.isArray(workoutData) && workoutData.length > 0;
  const hasWeights = Array.isArray(weightData) && weightData.length > 0;

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
      <div>
        <div className="mt-2 p-6">
          {hasWorkouts && hasWeights ? (
            <DashboardCharts
              workoutData={workoutData}
              weightData={weightData}
            />
          ) : (
            <p className="text-[#1E1E1E]/55">
              {!hasWorkouts
                ? "No hay datos de entrenamiento para graficar."
                : "No hay historial de peso para graficar."}
            </p>
          )}
        </div>

        <div className="p-6">
          <WorkoutHistory />
          
          <MealHistory />
          {/* <div className="space-y-6 lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Registrar Entrenamiento
              </h2>
              <WorkoutForm />
            </div>
            <div className="grid gap-6">
              <MealForm />
              <MealHistory />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-700">
                Sugerencias Personalizadas
              </h2>
              <Suggestions />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow lg:col-span-3">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Registrar Peso
            </h2>
            <WeightForm />
          </div> */}
        </div>
      </div>
      </main>
    </div>
  );
}
