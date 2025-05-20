"use client";
import { useState, useContext, FormEvent } from "react";
import axios from "axios";
import { AuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { FiX } from "react-icons/fi";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
  onLoginSuccess,
}: LoginModalProps) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const startTime = Date.now(); //Marca el tiempo inicial

    try {
      const { data } = await axios.post<AuthResponse>(
        "https://intelligent-delight-production.up.railway.app/auth/login",
        { email, password }
      );

      // Tiempo real de la petición
      const elapsed = Date.now() - startTime;
      const minDelay = 2000; //  2 segundos de loading

      // Espera si existe demora
      if (elapsed < minDelay) {
        await new Promise((resolve) => setTimeout(resolve, minDelay - elapsed));
      }

      login({ token: data.accessToken, user: data.user });
      onLoginSuccess();
    } catch (err) {
      console.error(err);
      alert("Credenciales inválidas");
    } finally {
      setLoading(false); // Ejecucion de loading
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[4px] flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-3xl w-full md:max-w-md max-w-sm px-12 sm:px-10 md:px-14 py-10 sm:py-12 md:py-14 relative shadow-xl">
        {/* Loader */}
        {loading && (
          <div className="flex flex-col justify-center rounded-4xl items-center absolute inset-0 bg-white z-10  max-w-lg">
            <p className="mb-4 text-[#1E1E1E] md:text-2xl font-semibold sm:text-lg">
              Iniciando Sesión...
            </p>
            <div className="animate-spin rounded-full h-12 w-12 md:h-32 md:w-32  md:border-[12px] border-[6px] border-[#A8D4B9] border-t-[#3CA464]" />
          </div>
        )}

        {/* Botón cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 text-[#1E1E1E] transition-transform hover:scale-110 cursor-pointer"
        >
          <FiX size={23} />
        </button>

        {/* Título */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-[#1E1E1E]">
          Iniciar Sesión
        </h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm sm:text-base text-[#1E1E1E] font-medium mb-1 font-lato"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@hotmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border font-lato border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3CA464] text-gray-700"
            />
          </div>

          <div>
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="text-sm sm:text-base text-[#1E1E1E] font-medium font-lato"
              >
                Contraseña
              </label>
              <Link
                href="#"
                className="text-xs sm:text-sm text-[#3CA464] hover:text-green-600 font-semibold font-lato"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              placeholder="●●●●●●●"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 font-lato border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3CA464] text-white font-lato py-2 rounded-lg hover:bg-[#329956] cursor-pointer transition duration-200 font-bold"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
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
          Inicia sesión con Google
        </button>

        {/* Cambio a registro */}
        <div className="mt-6 text-center font-lato text-sm text-[#1E1E1E]">
          ¿No tienes una cuenta?{" "}
          <button
            onClick={onSwitchToRegister}
            className="text-[#1E1E1E] hover:text-[#3CA464] font-lato font-semibold cursor-pointer underline ml-2"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
