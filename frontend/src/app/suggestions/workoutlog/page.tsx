import React from "react";
import Sidebar from "../../components/Sidebar/page";
import WorkoutForm from "@/app/components/WorkoutForm";

const WorkoutLogPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="w-full">
        <header className="py-6 px-8">

          <div className="text-2xl font-bold text-[#1E1E1E] flex flex-row-reverse">
            AI<span className="text-green-500">Balance</span>
          </div>
        </header>
        <div className="px-8 py-6 max-w-2xl">
          <h1 className="text-2xl font-bold mt-8 mb-8 text-black">
            Por favor, ingresa los detalles del entrenamiento que realizaste.
          </h1>
          <WorkoutForm />
        </div>
      </div>

    </div>
  );
};

export default WorkoutLogPage;
