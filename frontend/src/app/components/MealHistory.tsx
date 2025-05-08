"use client";
import { useEffect, useState, useContext } from "react";
import api from "@/app/utils/api";
import { AuthContext } from "@/app/context/AuthContext";

export default function MealHistory() {
  const { userId } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchMeals = async () => {
      setLoading(true);
      try {
        const res = await api.get("/meals/meals/history", {
          params: { user_id: userId },
        });
        setMeals(res.data || []);
      } catch (error) {
        console.error("Error al obtener historial de comidas:", error);
      }
      setLoading(false);
    };

    fetchMeals();
  }, [userId]);

  return (
    <div className="mt-4 rounded-xl ">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Historial de comidas
      </h2>
      {loading ? (
        <p className="text-center text-gray-700">Cargando...</p>
      ) : meals.length === 0 ? (
        <p className="text-center text-gray-700">No hay comidas registradas.</p>
      ) : (
        <ul className="overflow-auto h-[20vh] mt-2 space-y-2 bg-[#FEFFEF] list-disc border pl-8 pt-4 pb-4 rounded-lg text-gray-700">
          {meals.map((meal, index) => (
            <li key={index} className="text-gray-900">
              <p className="text-sm">
                {(meal as { date: string; meal_type: string }).date} -{" "}
                <strong>
                  {(meal as { date: string; meal_type: string }).meal_type}
                </strong>
              </p>
              <p className="text-sm">{(meal as { foods: string }).foods}</p>
              <p className="text-sm">
                Agua: {(meal as { water: number }).water} L
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
