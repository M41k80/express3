"use client";
import { useState, useEffect, useContext, ChangeEvent, FormEvent } from "react";
import api from "../../utils/api";
import { AuthContext } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

interface ProfileForm {
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

interface ProfileResponse {
  status: string;
  user_id: string;
  imc: number;
  calories_target: number;
  macros: {
    protein_g: number;
    carbs_g: number;
    fats_g: number;
  };
}

interface HealthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileModal({
  isOpen,
  onClose,
}: HealthProfileModalProps) {
  const { userId } = useContext(AuthContext);
  const router = useRouter();
  const [form, setForm] = useState<ProfileForm>({
    age: 0,
    gender: "",
    height_cm: 0,
    weight_kg: 0,
    desired_weight_kg: 0,
    fitness_level: "",
    training_place: "",
    goals: [],
    restrictions: [],
    medical_conditions: [],
    habits: "",
  });
  const [result, setResult] = useState<ProfileResponse | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "age" ||
        name === "height_cm" ||
        name === "weight_kg" ||
        name === "desired_weight_kg"
          ? Number(value)
          : value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;
  // Modal is open, render the content

  const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      goals: checked
        ? [...prev.goals, value]
        : prev.goals.filter((goal) => goal !== value),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!userId) return alert("Usuario no autenticado");
    const payload = { user_id: userId, ...form };
    const { data } = await api.post<ProfileResponse>("/profile/init", payload);
    setResult(data);
  };

  const handleGoToPlan = () => {
    router.push("/plan"); // Redirige a la página de plan
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-50 overflow-y-auto">
      <div className="flex justify-center px-4 py-12">
        <div className="bg-white rounded-3xl w-full md:max-w-2xl max-w-sm px-6 py-10 relative shadow-xl sm:px-12 sm:py-12">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 sm:right-6 sm:top-6 text-[#1E1E1E] hover:scale-110 transition-transform cursor-pointer"
          >
            <FiX size={23} />
          </button>
          <h2 className="text-3xl font-bold text-center mb-8 text-[#1E1E1E]">
            Perfil de Salud
          </h2>
          <p className="text-[#1E1E1E]/55 text-lg mb-6 font-medium text-left leading-6 mx-7">
            Completa los siguientes datos para que nuestra IA estructure tus
            planes de alimentación y entrenamiento en base a tu estado actual.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                {" "}
                <label
                  htmlFor="age"
                  className="grid grid-cols-2 gap-4 text-[#1E1E1E] font-bold text-lg font-lato"
                >
                  Edad
                </label>
                <input
                  name="age"
                  type="number"
                  placeholder="Edad"
                  value={form.age}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] text-[#3CA464]"
                />
              </div>
              <div>
                <label
                  htmlFor="gender"
                  className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
                >
                  Género
                </label>
                <div className="relative">
                  <select
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] appearance-none bg-white text-[#3CA464]"
                  >
                    <option value="">Género</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Physical Measurements */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                {" "}
                <label
                  htmlFor="height_cm"
                  className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
                >
                  Altura (cm)
                </label>
                <input
                  name="height_cm"
                  type="number"
                  placeholder="Altura (cm)"
                  value={form.height_cm}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] text-[#3CA464]"
                />
              </div>
              <div>
                <label
                  htmlFor="weight_kg"
                  className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
                >
                  Peso (kg)
                </label>
                <input
                  name="weight_kg"
                  type="number"
                  placeholder="Peso (kg)"
                  value={form.weight_kg}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] text-[#3CA464]"
                />
              </div>
              <div>
                <label
                  htmlFor="desired_weight_kg"
                  className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
                >
                  Peso deseado (kg)
                </label>
                <input
                  name="desired_weight_kg"
                  type="number"
                  placeholder="Peso deseado (kg)"
                  value={form.desired_weight_kg}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] text-[#3CA464]"
                />
              </div>
            </div>

            {/* Fitness Level and Training Location */}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fitness_level"
                  className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
                >
                  Nivel de fitness
                </label>
                <div className="relative">
                  <select
                    name="fitness_level"
                    value={form.fitness_level}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] appearance-none bg-white text-[#3CA464]"
                  >
                    <option value="">Nivel</option>
                    <option value="novato">Novato</option>
                    <option value="principiante">Principiante</option>
                    <option value="medio">Medio</option>
                    <option value="experto">Experto</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="training_place"
                  className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
                >
                  Lugar de entrenamiento
                </label>
                <div className="relative">
                  <select
                    name="training_place"
                    value={form.training_place}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464] appearance-none bg-white text-[#3CA464]"
                  >
                    <option value="">Lugar</option>
                    <option value="casa">Casa</option>
                    <option value="gym">Gym</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Goals */}
            <div>
              <legend className="block text-[#1E1E1E] font-bold text-lg font-lato mb-2">
                Objetivos
              </legend>
              <fieldset className="space-y-2 grid grid-cols-2 ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value="bajar_peso"
                    onChange={handleGoalChange}
                    className="h-4 w-4 text-[#3CA464] focus:ring-[#3CA464] border-gray-300 accent-gray-500 rounded"
                  />
                  <label className="ml-2 text-base text-[#3CA464]">
                    Bajar de peso
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value="aumentar_masa"
                    onChange={handleGoalChange}
                    className="h-4 w-4 text-[#3CA464] focus:ring-[#3CA464] border-gray-300 accent-gray-500 rounded"
                  />
                  <label className="ml-2 text-base text-[#3CA464]">
                    Aumentar masa muscular
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value="mantener"
                    onChange={handleGoalChange}
                    className="h-4 w-4 text-[#3CA464] focus:ring-[#3CA464] border-gray-300 accent-gray-500 rounded"
                  />
                  <label className="ml-2 text-base text-[#3CA464]">
                    Mantener peso
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Dietary Restrictions */}
            <div>
              <legend className="block text-[#1E1E1E] font-bold text-lg font-lato mb-2">
                Restricciones alimenticias
              </legend>
              <fieldset className="space-y-2 grid grid-cols-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value="sin_gluten"
                    onChange={handleGoalChange}
                    className="h-4 w-4 text-[#3CA464] focus:ring-[#3CA464] accent-gray-500  rounded"
                  />
                  <label className="ml-2 text-base text-[#3CA464]">
                    Sin gluten
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value="sin_lactosa"
                    onChange={handleGoalChange}
                    className="h-4 w-4 text-[#3CA464] focus:ring-[#3CA464] border-gray-300 accent-gray-500 rounded"
                  />

                  <label className="ml-2 text-base text-[#3CA464]">
                    Sin lactosa
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    value="vegetariano"
                    onChange={handleGoalChange}
                    className="h-4 w-4 text-[#3CA464] focus:ring-[#3CA464] border-gray-300 accent-gray-500 rounded"
                  />
                  <label className="ml-2 text-base text-[#3CA464]">
                    Vegetariano
                  </label>
                </div>
              </fieldset>
            </div>

            {/* Medical Conditions */}
            <div>
              <label
                htmlFor="medical_conditions"
                className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
              >
                Condiciones Médicas
              </label>
              <textarea
                name="medical_conditions"
                placeholder="Condiciones médicas"
                value={form.medical_conditions?.join(", ") || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    medical_conditions: e.target.value.split(", "),
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#3CA464]0 h-24 text-[#3CA464]"
              />
            </div>

            {/* Habits */}
            <div>
              <label
                htmlFor="habits"
                className="block text-[#1E1E1E] font-bold text-lg font-lato mb-1"
              >
                {" "}
                Hábitos Ejemplo:
              </label>
              <p className="text-base text-[#1E1E1E] mb-2 font-light font-lato">
                Duermo 7 h diarias, tomo 2 L de agua, bebo 2 cafés al día, como
                cada 3 h (3 comidas + 2 snacks), trabajo sentado y hago pausas
                activas, no consumo alcohol ni tabaco, medito 10 min en la
                mañana.
              </p>
              <textarea
                name="habits"
                placeholder="Hábitos"
                value={form.habits || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, habits: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3CA464] h-24 text-[#3CA464]"
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-10 py-2 font-bold bg-[#3CA464] shadow-xl cursor-pointer text-white rounded-2xl hover:bg-[#329956] transition duration-200 flex items-center"
              >
                Guardar Perfil
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-md text-[#1E1E1E]">
              <p className="text-lg font-semibold">Resultados</p>
              <p>IMC: {result.imc} masa corporal</p>
              <p>Calorías objetivo: {result.calories_target} calorías</p>
              <p>
                Macros: Proteinas:{result.macros.protein_g}g / Carbohidratos:
                {result.macros.carbs_g}g / Grasas(F):{result.macros.fats_g}g
              </p>
              <button
                onClick={handleGoToPlan}
                className="mt-4 py-2 px-10  font-bold bg-[#3CA464] shadow-xl cursor-pointer text-white rounded-2xl hover:bg-[#329956] focus:outline-none"
              >
                Ver mi planes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
