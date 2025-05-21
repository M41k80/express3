"use client"

import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SuggestionsPage = () => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState<"training" | "nutrition" | null>(null)

    // eslint-disable-next-line
    const handleCategorySelect = (category: "training" | "nutrition") => {
      setSelectedCategory(category === selectedCategory ? null : category)
    }

    const handleGoToWorkoutLog = () => {
        router.push("/suggestions/workoutlog"); // Redirige a la página de plan
      };

    const handleGoToNutrition = () => {
      router.push('/suggestions/nutrition')  
    };

    const handleSuggestionsResults = () => {
        router.push('/suggestions/suggestionsresults')  
      };
  
    
  return (
    <div className="flex min-h-screen pl-6">
        <Sidebar />
        <main className="flex-1 pl-20 text-black">
        <header className="py-6 px-8">
          <div className="text-2xl font-bold text-[#1E1E1E] flex flex-row-reverse">
            AI<span className="text-green-500">Balance</span>
          </div>
        </header>

        <div className="px-8 py-6 max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-2xl font-bold mb-4">¿Te gustaría potenciar tu avance con sugerencias precisas?</h1>

          {/* Subheading */}
          <p className="text-lg mb-10">
            Coméntanos, <span className="text-green-500 font-medium">¿Qué hiciste hoy?</span>
          </p>

          {/* Category Selection */}
          <div className="flex flex-col gap-7 p-8 mb-10 ">
            {/* Training Category */}
            <button
            //   onClick={() => handleCategorySelect("training")}
            onClick={handleGoToWorkoutLog}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${
                selectedCategory === "training"
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-[#FEFFEF] border border-yellow-100 hover:bg-green-50"
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image
                  src="/dumbell-icon.svg"
                  alt="Entrenamiento"
                  width={32}
                  height={32}
                  className="w-8 h-8 text-green-600"
                />
              </div>
              <span className="font-medium">Entrenamiento</span>
            </button>

            {/* Nutrition Category */}
            <button
            //   onClick={() => handleCategorySelect("nutrition")}
            onClick={handleGoToNutrition}
              className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all ${
                selectedCategory === "nutrition"
                  ? "bg-green-100 border-2 border-green-500"
                  : "bg-[#FEFFEF] border border-yellow-100 hover:bg-green-50"
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <Image src="/food-icon.svg"
                  alt="Entrenamiento"
                  width={32}
                  height={32}
                  className="w-8 h-8 text-green-600" />
              </div>
              <span className="font-medium">Alimentación</span>
            </button>
          </div>

          {/* Get Suggestions Button */}
          <button
            className='px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors'
            
            onClick={handleSuggestionsResults}
          >
            Obtener Sugerencias
          </button>
        </div>
      </main>
    </div>
  );
}

export default SuggestionsPage;