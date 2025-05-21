import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Suggestions from "@/app/components/Suggestions";

const SuggestionsResults = () => {
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

        <div className="px-8 py-6 w-full mx-auto">
          <h1 className="text-3xl font-extrabold mb-4 text-[#1E1E1E] ">
            Sugerencias
          </h1>
          <p className="text-[#1E1E1E] font-semibold font-lato text-lg mb-6">
            A partir de tu desempeño de hoy y tus hábitos alimenticios, hemos
            preparado sugerencias que te permitirán sacar el máximo provecho a
            tu plan integral.
          </p>

          <Suggestions />
        </div>
      </main>
    </div>
  );
};

export default SuggestionsResults;
