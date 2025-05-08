"use client";

import { useState, useEffect } from "react";
import LoginModal from "../LoginModal/page";
import RegisterModal from "../RegisterModal/page";
import ProfileModal from "../ProfileModal/page";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
    setIsLoginModalOpen(true);
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    setIsProfileModalOpen(true);
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
          <span className="text-[#3CA464]">Balance</span>
          <span className="text-[#1E1E1E]">AI</span>
        </div>

        {/* Enlaces */}
        <div className="hidden md:flex space-x-8 font-bold text-xl text-[#1E1E1E]">
          <a href="#servicios" className="hover:text-[#3CA464] transition">
            Servicios
          </a>
          <a href="#crear-blog" className="hover:text-[#3CA464] transition">
            Crear Blog
          </a>
          <a href="#nosotros" className="hover:text-[#3CA464] transition">
            Nosotros
          </a>
        </div>

        {/* Botones de sesión */}
        <div className="flex space-x-4">
          <button
            onClick={openLoginModal}
            className="bg-[#FEFFEF] text-[#3CA464] font-medium px-4 py-2 rounded-full shadow-md hover:opacity-90 transition"
          >
            Iniciar Sesión
          </button>
          <button
            onClick={openRegisterModal}
            className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-[#3CA464] transition"
          >
            Registrarse
          </button>
        </div>
      </div>

      {/* Modales */}
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
