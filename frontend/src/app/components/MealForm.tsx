"use client";
import { useState, useContext } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import api from "@/app/utils/api";
import LoadingSpinner  from "./LoadingSpinner/page";

export default function MealForm() {

    

  const { userId } = useContext(AuthContext);
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("Desayuno");
  const [foods, setFoods] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [water, setWater] = useState(0);

  const handleSubmit = async () => {
    if (!userId || !date || !foods) return;
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/meals/meals/log", {
        user_id: userId,
        date,
        meal_type: mealType,
        foods,
        water,
      });
      setMessage(res.data.message || "Comida registrada correctamente");
      setDate("");
      setFoods("");
      setWater(0)
    } catch (error) {
      console.error("Error al registrar comida:", error);
      setMessage("No se pudo registrar la comida");
    }

    setLoading(false);
  };

  return (
    <div className="p-4 bg-white max-w-md mx-auto space-y-4 text-gray-700 flex flex-col gap-2">
      <h2 className="text-xl font-bold mb-4 text-green-700">Alimentación</h2>

      <div>
        <label className="block text-gray-700 font-bold mb-1">Fecha</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-1">
          Tipo de comida
        </label>
        <select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option>Desayuno</option>
          <option>Almuerzo</option>
          <option>Cena</option>
          <option>Snack</option>
        </select>
      </div>

      <div>
        <label className="block text-gray-700 font-bold mb-1">
          Alimentos Consumidos
        </label>
        <textarea
          value={foods}
          onChange={(e) => setFoods(e.target.value)}
          placeholder="Ej: 2 huevos, 1 pan integral, 1 café"
          className="w-full px-4 py-2 h-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-bold mb-1">
          Cantidad de Vasos de Agua (250 ml)
        </label>
        <input
          value={water}
          type="number"
          onChange={(e) => setWater(Number(e.target.value))}
          placeholder="Vasos de agua (250ml)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] text-[#3CA464]"
        />
      </div>
      {message && (
        <p className="text-sm text-center mt-2 text-gray-700">{message}</p>
      )}
      <div className="flex justify-center">
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
        >
          {loading ? "Registrando..." : "Registrar Alimentación"}
        </button>
      </div>
      <LoadingSpinner isOpen={loading} message="Registrando tu alimentación..." />
    </div>
  );
}
