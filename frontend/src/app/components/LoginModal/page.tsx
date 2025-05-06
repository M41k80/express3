"use client";
import { useState, useContext, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

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
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }: LoginModalProps) {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null // No renderizar si el modal no está abierto

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post<AuthResponse>(
        "https://intelligent-delight-production.up.railway.app/auth/login",
        { email, password }
      );
      login({ token: data.accessToken, user: data.user });
      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        {/* Loader */}
       {loading && (
        <div className="flex flex-col justify-center items-center absolute inset-0 bg-white z-10 rounded-lg">
          <p className="mb-4 text-black text-base sm:text-lg">Logeando...</p>
          <div className="animate-spin rounded-full h-32 w-32 border-[12px] border-green-600 border-t-green-500" />
        </div>
      )}
      <button onClick={onClose} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          X
        </button>
        <h2 className="text-xl font-semibold text-center mb-6 text-black">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Introduce tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Contraseña
              </label>
              <Link
                href="#"
                className="text-sm text-green-500 hover:text-green-600"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <input
              id="password"
              type="password"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>
        <div className="mt-6 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">o</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button className="mt-4 w-full bg-[#FEFFEF] flex items-center justify-center gap-2 border border-green-600 py-2 rounded-md hover:bg-green-50 transition duration-200 text-black">
          <Image
            src="/g-icon-green.svg"
            alt="Google Icon"
            width={20}
            height={20}
            className=""
          />
          Inicia sesión con Google
        </button>
        <div className="mt-6 text-center text-sm text-black">
          ¿No tienes una cuenta?{" "}
          <button onClick={onSwitchToRegister} className="text-green-500 hover:text-green-600 font-medium">
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
