"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SuggestionsPage = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<
    "training" | "nutrition" | null
  >(null);

  // eslint-disable-next-line
  const handleCategorySelect = (category: "training" | "nutrition") => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleGoToWorkoutLog = () => {
    router.push("/suggestions/workoutlog"); // Redirige a la página de plan
  };

  const handleGoToNutrition = () => {
    router.push("/suggestions/nutrition");
  };

  const handleSuggestionsResults = () => {
    router.push("/suggestions/suggestionsresults");
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

        <div className="px-8 py-6 max-w-3xl mx-auto text-[#1E1E1E] text-center mt-2">
          {/* Main Heading */}
          <h1 className="text-2xl font-extrabold mb-4">
            ¿Te gustaría potenciar tu avance con sugerencias precisas?
          </h1>

          {/* Subheading */}
          <p className="text-2xl mb-10 font-extrabold">
            Coméntanos,{" "}
            <span className="text-[#3CA464] text-2xl font-extrabold">
              ¿Qué hiciste hoy?
            </span>
          </p>

          {/* Category Selection */}
          <div className="flex flex-col items-center  gap-7 p-8 mb-4 -mt-6 ">
            {/* Training Category */}
            <button
              //   onClick={() => handleCategorySelect("training")}
              onClick={handleGoToWorkoutLog}
              className={`flex flex-col items-center justify-center shadow-lg cursor-pointer py-6 px-20 rounded-4xl transition-transform duration-300 ease-in-out hover:scale-[1.03] ${
                selectedCategory === "training"
                  ? "bg-green-100"
                  : "bg-[#FEFFEF]"
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image
                  src="/dumbell-icon.svg"
                  alt="Entrenamiento"
                  width={32}
                  height={32}
                  className="w-10 h-10 text-[#3CA464] object-cover"
                />
              </div>
              <span className="font-bold text-xl">Entrenamiento</span>
            </button>

            {/* Nutrition Category */}
            <button
              //   onClick={() => handleCategorySelect("nutrition")}
              onClick={handleGoToNutrition}
              className={`flex flex-col items-center cursor-pointer shadow-lg justify-center py-6 px-20 rounded-4xl transition-transform duration-300 ease-in-out hover:scale-[1.03] ${
                selectedCategory === "nutrition"
                  ? "bg-green-100"
                  : "bg-[#FEFFEF]"
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image
                  src="/food-icon.svg"
                  alt="Entrenamiento"
                  width={32}
                  height={32}
                  className="w-10 h-10 text-[#3CA464] object-cover"
                />
              </div>
              <span className="font-bold text-xl">Alimentación</span>
            </button>
          </div>

          {/* Get Suggestions Button */}
          <button
            className="px-8 py-3 bg-[#3CA464] font-bold shadow-lg cursor-pointer  text-white rounded-full hover:bg-[#2e8c54] transition-colors"
            onClick={handleSuggestionsResults}
          >
            Obtener Sugerencias
          </button>
        </div>
      </main>
    </div>
  );
};

export default SuggestionsPage;
