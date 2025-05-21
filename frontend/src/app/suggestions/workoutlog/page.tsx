import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import WorkoutForm from "@/app/components/WorkoutForm";

const WorkoutLogPage = () => {
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

        <div className="px-8 py-6 max-w-2xl">
          <h1 className="text-2xl font-bold mt-8 mb-8 text-black">
            Por favor, ingresa los detalles del entrenamiento que realizaste.
          </h1>
          <WorkoutForm />
        </div>
      </main>
    </div>
  );
};

export default WorkoutLogPage;
