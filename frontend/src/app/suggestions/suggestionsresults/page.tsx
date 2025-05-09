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
        <div className="px-8 py-6 max-w-2xl ">
          <h1 className="text-2xl font-bold mt-8 mb-8 text-black">
            Apartir de tu desempeño de hoy y tus habitos alimenticios, hemos preparado sugerencias que te permitiran sacar el maximo provecho a tu plan integral.
          </h1>
          <p className="text-lg mb-10">
            Click, <span className="text-green-500 font-medium"> al boton verde</span>
          </p>
          <Suggestions/>
        </div>
        
      </div>
    </div>
  );
};

export default SuggestionsResults;
