"use client";
import { useState, useContext } from "react";
import api from "../utils/api";
import { AuthContext } from "@/app/context/AuthContext";
import LoadingSpinner from "./LoadingSpinner/LoadingSpinner";

export default function WorkoutForm() {
  const { userId } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    exercise_name: "",
    sets: 0,
    reps: 0,
    weight_kg: 0,
    date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await api.post("workout/log", { ...form, user_id: userId });
      setMessage(res.data.message || "Entrenamiento registrado correctamente");
    } catch (error) {
      console.error("Error al registrar entrenamiento:", error);
      setMessage("No se pudo registrar el entrenamiento");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 text-[#1E1E1E]">
      {/* Section Title */}
      <h2 className="text-xl font-bold mb-4 text-[#3CA464]">Entrenamiento</h2>
      {/* Exercise Input */}
      <div className="space-y-2">
        <label className="block text-[#1E1E1E] font-bold mb-1">
          Ejercicio Realizado
        </label>
        <input
          name="exercise_name"
          placeholder="Ej: Sentadillas"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
        />
      </div>
      {/* Sets Input */}
      <div className="space-y-2">
        <label className="block text-[#1E1E1E] font-bold mb-1">
          Numero de series
        </label>
        <input
          name="sets"
          type="number"
          placeholder="Ej: 3"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
        />
      </div>
      {/* Reps Input */}
      <div className="space-y-2">
        <label className="block text-[#1E1E1E] font-bold mb-1">
          Numero de Repeticiones
        </label>
        <input
          name="reps"
          type="number"
          placeholder="Ej: 12"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
        />
      </div>
      {/* Weight Input */}
      <div className="space-y-2">
        <label className="block text-[#1E1E1E] font-bold mb-1">
          Cantidad de Peso (en Kg)
        </label>
        <input
          name="weight_kg"
          type="number"
          placeholder="Ej: 50"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
        />
      </div>
      {/* Date Input */}
      <div className="space-y-2">
        <label className="block text-[#1E1E1E] font-bold mb-1">Fecha</label>
        <input
          name="date"
          type="date"
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
        />
      </div>
      {message && (
        <p className="text-sm text-center mt-2 text-[#1E1E1E]">{message}</p>
      )}
      {/* Submit Button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-2 px-6 py-3 bg-[#3CA464] text-white rounded-full cursor-pointer font-bold hover:bg-[#2e8c54] transition-colors"
        >
          {loading ? "Registrando..." : "Registrar Entrenamiento"}
        </button>
      </div>
      <LoadingSpinner
        isOpen={loading}
        message="Registrando tu entrenamiento..."
      />
    </div>
  );
}
