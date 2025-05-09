"use client";

import React, { FormEvent, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  // Bloquea scroll de fondo
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md px-12 py-8 relative">
        {/* Cerrar */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar"
          className="absolute right-4 top-4 cursor-pointer sm:right-6 sm:top-6 text-[#1E1E1E] hover:scale-110 transition-transform"
        >
          <FiX size={23} />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center text-[#1E1E1E] mb-6">
          Perfil de Usuario
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nombre completo */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-[#1E1E1E] font-semibold text-base mb-1"
            >
              Nombre completo
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              defaultValue="Magdiel Mora"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3CA464] focus:outline-none text-gray-700"
            />
          </div>

          {/* Correo electrónico */}
          <div>
            <label
              htmlFor="email"
              className="block text-[#1E1E1E] font-semibold text-base mb-1"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              defaultValue="m41k80@icloud.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3CA464] focus:outline-none text-gray-700"
            />
          </div>

          {/* Separador */}
          <hr className="border-gray-200 my-4" />

          {/* Cambiar contraseña */}
          <div>
            <p className="block text-[#1E1E1E] font-semibold text-base mb-1">
              Cambiar contraseña
            </p>
            <input
              name="currentPassword"
              type="password"
              required
              defaultValue="••••••••••••••••"
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3CA464] focus:outline-none font-semibold text-[#1E1E1E]"
            />
            <input
              name="newPassword"
              type="password"
              required
              placeholder="Nueva contraseña"
              className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3CA464] focus:outline-none font-semibold text-[#1E1E1E]"
            />
            <input
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirmar nueva contraseña"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-[#3CA464] focus:outline-none font-semibold text-[#1E1E1E]"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-[#3CA464] text-white cursor-pointer font-semibold rounded-full hover:bg-[#329956] transition"
            >
              Guardar Cambios
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-[#1E1E1E] cursor-pointer font-semibold rounded-full hover:bg-gray-200 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
