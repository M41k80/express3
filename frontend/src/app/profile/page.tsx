"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Image from "next/image";
import ProfileModal from "../components/ProfileModal/ProfileModal";
import UserModal from "../components/UserModal/UserModal";

export default function Profile() {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <Sidebar />

      <main className="flex-1 flex flex-col pt-10 px-6 md:px-16">
        {/* Logo alineado a la derecha */}
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
            {/* Perfil de Salud */}
            <button
              type="button"
              className="flex flex-col items-center bg-[#FEFFEF] rounded-4xl cursor-pointer shadow-lg px-14 py-4 hover:bg-[#f9f9f0] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
              onClick={() => setShowProfileModal(true)}
            >
              <div className="w-6 h-6 relative mb-2">
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

            {/* Perfil de Usuario */}
            <button
              type="button"
              className="flex flex-col items-center bg-[#FEFFEF] rounded-4xl cursor-pointer shadow-lg px-14 py-4 hover:bg-[#f9f9f0] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
              onClick={() => setShowUserModal(true)}
            >
              <div className="w-6 h-6 relative mb-2">
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

      {/* Modales */}
      {showProfileModal && (
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {showUserModal && (
        <UserModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
        />
      )}
    </div>
  );
}
