"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FiX } from "react-icons/fi";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onRegisterSuccess: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
  onRegisterSuccess,
}: RegisterModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const startTime = Date.now(); // Marca inicio del tiempo

    try {
      const response = await axios.post(
        "https://intelligent-delight-production.up.railway.app/auth/register",
        formData
      );

      const elapsed = Date.now() - startTime;
      const minDelay = 2000; // 2 segundos

      if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
      }

      console.log("Usuario registrado:", response.data);
      onRegisterSuccess();
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err) && err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Error al registrar");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] z-50 overflow-y-auto">
      <div className="flex justify-center px-4 py-12">
        <div className="bg-white rounded-3xl w-full md:max-w-md max-w-sm px-6 py-10 relative shadow-xl sm:px-12 sm:py-12">
          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center absolute inset-0 bg-white z-10 rounded-xl">
              <p className="mb-4 text-black text-base sm:text-lg">
                Registrando...
              </p>
              <div className="animate-spin rounded-full h-20 w-20 md:h-24 md:w-24 border-[8px] border-[#3CA464] border-t-[#3CA464]" />
            </div>
          )}

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-4 top-4 sm:right-6 sm:top-6 text-[#1E1E1E] hover:scale-110 transition-transform cursor-pointer"
          >
            <FiX size={23} />
          </button>

          {/* Título */}
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#1E1E1E]">
            Crear Cuenta
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block font-medium text-sm sm:text-base text-[#1E1E1E] mb-1 font-lato">
                Nombre
              </label>
              <input
                type="text"
                name="name"
                placeholder="Luis Angel"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border font-lato border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CA464] text-gray-700"
              />
            </div>

            {/* Correo */}
            <div>
              <label className="block font-medium text-sm sm:text-base text-[#1E1E1E] mb-1 font-lato">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                placeholder="ejemplo@hotmail.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border font-lato border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CA464] text-gray-700"
              />
            </div>

            {/* Contraseña */}
            <div>
              <label className="block font-medium text-sm sm:text-base text-[#1E1E1E] mb-1 font-lato">
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border font-lato border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CA464] text-gray-700"
              />
            </div>

            {/* Repetir contraseña */}
            <div>
              <label className="block font-medium text-sm sm:text-base text-[#1E1E1E] mb-1 font-lato">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border font-lato border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CA464] text-gray-700"
              />
            </div>

            {error && <p className="text-red-600 text-sm font-lato">{error}</p>}

            {/* Botón registro */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#3CA464] text-white font-lato py-2 rounded-lg hover:bg-[#329956] cursor-pointer transition duration-200 font-bold"
            >
              {loading ? "Registrando..." : "Registrarse"}
            </button>
          </form>

          {/* Separador */}
          <div className="mt-6 flex items-center justify-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500 text-sm">o</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Botón Google */}
          <button className="mt-4 w-full font-lato bg-[#FEFFEF] border border-[#3CA464] flex items-center justify-center gap-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200 text-black text-sm">
            <Image
              src="/g-icon-green.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            Registrarse con Google
          </button>

          {/* Cambio a login */}
          <div className="mt-6 text-center font-lato text-sm text-[#1E1E1E]">
            ¿Ya tienes una cuenta?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-[#1E1E1E] hover:text-[#3CA464] font-lato font-semibold cursor-pointer underline ml-2"
            >
              Iniciar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
