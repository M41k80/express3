"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
<aside className="group flex flex-col items-center hover:items-start transition-all duration-300 w-20 hover:w-50 px-4 pt-4 pb-12 sticky top-0 bg-[#A8D4B9] text-white rounded-full shadow-lg h-screen">

      <div className="flex items-center justify-center mb-4"></div>
      <nav className="flex flex-col justify-between flex-1 overflow-hidden">

        {/* Top icons */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href="/dashboard">
              <div className="w-22 h-20 relative">
                <Image
                  src="/Logo-Balance-IA.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <Link
            href="/inicio"
            className="group flex items-center justify-center hover:justify-start gap-3 hover:bg-[#FEFFEF] px-4 py-2 rounded-full cursor-pointer transition-all duration-300 w-full"
          >
            <div className="w-[30px] h-[30px] relative flex-shrink-0">
              <Image
                src="/house-icon.svg"
                alt="Inicio"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden group-hover:inline text-[#1E1E1E] font-extrabold whitespace-nowrap">
              Inicio
            </span>
          </Link>

          <Link
            href="/plan"
            className="group flex items-center justify-center hover:justify-start gap-3 hover:bg-[#FEFFEF] px-4 py-2 rounded-full cursor-pointer transition-all duration-300 w-full"
          >
            <div className="w-[30px] h-[30px] relative flex-shrink-0">
              <Image
                src="/plans-icon.svg"
                alt="Planes de entrenamiento"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden group-hover:inline text-[#1E1E1E] font-extrabold whitespace-nowrap">
              Planes
            </span>
          </Link>

          <Link
            href="/dashboard"
            className="group flex items-center justify-center hover:justify-start gap-3 hover:bg-[#FEFFEF] px-4 py-2 rounded-full cursor-pointer transition-all duration-300 w-full"
          >
            <div className="w-[30px] h-[30px] relative flex-shrink-0">
              <Image
                src="/dashboard-icon.svg"
                alt="Dashboard"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden group-hover:inline text-[#1E1E1E] font-extrabold whitespace-nowrap">
              Dashboard
            </span>
          </Link>

          <Link
            href="/suggestions"
            className="group flex items-center justify-center hover:justify-start gap-3 hover:bg-[#FEFFEF] px-4 py-2 rounded-full cursor-pointer transition-all duration-300 w-full"
          >
            <div className="w-[30px] h-[30px] relative flex-shrink-0">
              <Image
                src="/suggestions-icon.svg"
                alt="Historial alternativo"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden group-hover:inline text-[#1E1E1E] font-extrabold whitespace-nowrap">
              Sugerencias
            </span>
          </Link>

          <Link
            href="/profile"
            className="group flex items-center justify-center hover:justify-start gap-3 hover:bg-[#FEFFEF] px-4 py-2 rounded-full cursor-pointer transition-all duration-300 w-full"
          >
            <div className="w-[30px] h-[30px] relative flex-shrink-0">
              <Image
                src="/profile-icon.svg"
                alt="Perfil de usuario"
                fill
                className="object-contain"
              />
            </div>
            <span className="hidden group-hover:inline text-[#1E1E1E] font-extrabold whitespace-nowrap">
              Perfil
            </span>
          </Link>
        </div>

        {/* Bottom logout icon */}
        <button
          onClick={handleLogout}
          className="group flex items-center justify-center gap-3 w-full px-4 py-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-[#FEFFEF]"
        >
          <div className="w-[30px] h-[30px] relative flex-shrink-0">
            <Image
              src="/logout-icon.svg"
              alt="Cerrar sesión"
              fill
              className="object-contain"
            />
          </div>
          <span className="hidden group-hover:inline text-[#1E1E1E] font-extrabold whitespace-nowrap">
            Cerrar sesión
          </span>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
