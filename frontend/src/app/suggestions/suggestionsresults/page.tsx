import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Suggestions from "@/app/components/Suggestions";

const SuggestionsResults = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="text-black w-full">
        <header className="py-6 px-8">
          <div className="text-2xl font-bold text-[#1E1E1E] flex flex-row-reverse">
            AI<span className="text-green-500">Balance</span>
          </div>
        </header>
        <div className="px-8 py-6 w-full mx-auto">
          <h1 className="text-2xl font-bold mb-4">Sugerencias</h1>
          <p className="text-gray-800 mb-6">
            A partir de tu desempeño de hoy y tus hábitos alimenticios, hemos
            preparado sugerencias que te permitirán sacar el máximo provecho a
            tu plan integral.
          </p>
          
          <Suggestions />
        </div>
      </div>
    </div>
  );
};

export default SuggestionsResults;
