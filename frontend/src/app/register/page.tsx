"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
  const router = useRouter();

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

    try {
      const response = await axios.post(
        "https://intelligent-delight-production.up.railway.app/auth/register",
        formData
      );
      console.log("Usuario registrado:", response.data);
      router.push("/login");
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

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
          x
        </button>
        <h2 className="text-xl font-semibold text-center mb-6 text-black">
          Crear cuenta
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Luis Angel"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-900">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              placeholder="tunombre@hotmail.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-900">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium text-gray-900">
              Repetir contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-700"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <div className="mt-6 flex items-center">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">o</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>
        <button className="mt-4 w-full bg-[#FEFFEF] flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-green-50 transition duration-200 text-black">
          <Image
            src="/g-icon-green.svg"
            alt="Google Icon"
            width={20}
            height={20}
            className=""
          />
          Registrarse con Google
        </button>

        <div className="mt-6 text-center text-sm text-black">
          ¿Ya tienes una cuenta?{" "}
          <button className="text-green-500 hover:text-green-600 font-medium">
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
