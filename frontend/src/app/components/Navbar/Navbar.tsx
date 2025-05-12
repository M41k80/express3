"use client";

import { useState, useEffect } from "react";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import ProfileModal from "../ProfileModal/ProfileModal";
import Link from "next/link";
import { useRouter } from "next/navigation";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();


  // Scroll dinámico para cambiar el fondo del navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lógica de modales
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsRegisterModalOpen(false);
  };

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeModals = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  const handleRegisterSuccess = () => {
    setIsRegisterModalOpen(false);
    setIsNewUser(true);
    setIsProfileModalOpen(true);
  };
  

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
  
    if (isNewUser) {
      setIsProfileModalOpen(true);
    } else {
      router.push("/dashboard");
    }
  };
  

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FAFAE7]/95 shadow" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-extrabold">
          <Link href="/" className="text-[#3CA464]">Balance</Link>
          <Link href="/" className="text-[#1E1E1E]">AI</Link>
        </div>

        {/* Botón hamburguesa en mobile */}
        <button
          className="md:hidden text-[#3CA464] text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Enlaces */}
        <div className="hidden md:flex space-x-8 items-center font-bold text-xl text-[#1E1E1E]">
          <Link href="/#servicios" className="hover:text-[#3CA464] transition">
            Servicios
          </Link>
          <Link href="/#crear-blog" className="hover:text-[#3CA464] transition">
            Crear Blog
          </Link>
          <Link href="/#nosotros" className="hover:text-[#3CA464] transition">
            Nosotros
          </Link>
        </div>

        {/* Botones de sesión */}
        <div className="hidden md:flex space-x-4">
          <button
            onClick={openLoginModal}
            className="bg-[#FEFFEF] text-[#3CA464] cursor-pointer text-base font-bold px-6 rounded-2xl py-2 shadow-md hover:opacity-90 transition-transform duration-300 ease-in-out hover:scale-[1.03]"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={openRegisterModal}
            className="border-[1.78px] border-[#FEFFEF] text-[#FEFFEF] bg-[#3CA464] cursor-pointer shadow-xs text-base font-bold px-6 rounded-2xl py-2 hover:bg-[#329956] transition-transform duration-300 ease-in-out hover:scale-[1.03]"
          >
            Registrarse
          </button>
        </div>
      </div>

      {/* Menú mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-4 pt-2 space-y-4 bg-[#FAFAE7] shadow-md flex flex-col">
          <a
            href="#servicios"
            className="text-[#1E1E1E] hover:text-[#3CA464] font-bold"
          >
            Servicios
          </a>
          <a
            href="#crear-blog"
            className="text-[#1E1E1E] hover:text-[#3CA464]  font-bold"
          >
            Crear Blog
          </a>
          <a
            href="#nosotros"
            className="text-[#1E1E1E] hover:text-[#3CA464]  font-bold"
          >
            Nosotros
          </a>
          <button
            onClick={openLoginModal}
            className="bg-[#FEFFEF] text-[#3CA464] hover:opacity-90 cursor-pointer font-bold w-full px-6 py-2 rounded-2xl shadow-md"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={openRegisterModal}
            className="border-[1.78px] border-[#FEFFEF] hover:bg-[#329956] cursor-pointer text-[#FEFFEF] bg-[#3CA464] font-bold w-full px-6 py-2 rounded-2xl shadow-xs"
          >
            Registrarse
          </button>
        </div>
      )}

      {/* Modales de accion */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeModals}
        onSwitchToRegister={openRegisterModal}
        onLoginSuccess={handleLoginSuccess}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeModals}
        onSwitchToLogin={openLoginModal}
        onRegisterSuccess={handleRegisterSuccess}
      />
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
