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
      <h2 className="text-xl font-extrabold mb-4 text-[#1E1E1E]">
        Historial de comidas
      </h2>
      {loading ? (
        <p className="text-center text-[#1E1E1E]">Cargando...</p>
      ) : meals.length === 0 ? (
        <p className="text-center text-[#1E1E1E]">
          No hay comidas registradas.
        </p>
      ) : (
        <div className="text-left">
          <div className="bg-[#FEFFEF] border border-[#1E1E1E]/55 font-lato font-medium text-xl shadow-lg rounded-2xl mb-8 w-full overflow-clip">
            <ul className="p-6 pr-6 text-[#1E1E1E]/55 max-h-[40vh] overflow-auto list-disc pl-10 leading-relaxed">
              {meals.map((meal, index) => (
                <li
                  key={index}
                  className="text-[#1E1E1E]/55 font-semibold font-lato"
                >
                  <p className="text-base">
                    {(meal as { date: string; meal_type: string }).date} -{" "}
                    <strong>
                      {(meal as { date: string; meal_type: string }).meal_type}
                    </strong>
                  </p>
                  <p className="text-base">{(meal as { foods: string }).foods}</p>
                  <p className="text-base">
                    Agua: {(meal as { water: number }).water} L
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
