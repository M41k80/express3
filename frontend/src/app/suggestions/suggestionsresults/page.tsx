import React from "react";
import Sidebar from "../../components/Sidebar/page";
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
        <Suggestions/>
        Probando
      </div>
    </div>
  );
};

export default SuggestionsResults;
