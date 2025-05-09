"use client";

import React from "react";
import Sidebar from "../components/Sidebar/page";
import Image from "next/image";

const Profile = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col pt-10 px-6 md:px-16">
        {/* Logo */}
        <div className="w-full flex justify-end mb-8">
          <h2 className="text-3xl font-extrabold text-[#3CA464]">
            Balance<span className="text-[#1E1E1E]">AI</span>
          </h2>
        </div>

        {/* Contenedor */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Título */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#1E1E1E] mb-10">
            Edición de Perfiles
          </h1>

          {/* Botones de perfil */}
          <div className="flex flex-col items-center space-y-6">
            <button
              className="flex flex-col items-center bg-[#FEFFEF] rounded-4xl cursor-pointer shadow-lg px-14 py-4 hover:bg-[#f9f9f0] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
              onClick={() => {
                // Perfil de Salud
              }}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/profilesalud.png"
                  alt="Perfil de Salud"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#1E1E1E]">
                Perfil de Salud
              </span>
            </button>

            <button
              className="flex items-center flex-col bg-[#FEFFEF] cursor-pointer rounded-4xl shadow-lg px-14 py-4 hover:bg-[#f9f9f0] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
              onClick={() => {
                // Perfil de Usuario
              }}
            >
              <div className="w-6 h-6 relative">
                <Image
                  src="/profileuser.png"
                  alt="Perfil de Usuario"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#1E1E1E]">
                Perfil de Usuario
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
