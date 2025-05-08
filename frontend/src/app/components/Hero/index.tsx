"use client";
import Image from "next/image";
import mujerFit from "/public/healthmodel.svg";
import "@/app/globals.css";
import RegisterModal from "../RegisterModal/page";
import { useState } from "react";
import LoginModal from "../LoginModal/page";
import ProfileModal from "../ProfileModal/page";

const Hero = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

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
    <section className="pt-28 md:pt-32 bg-[#FAFAE7] relative overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
        {/* Texto */}
        <div className="md:w-[51%] -mt-10 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading text-[#1E1E1E] mb-5">
            Tu progreso, <br /> nuestra inspiración:
          </h1>
          <h2 className="text-5xl md:text-6xl  mb-6 font-extrabold leading text-[#3CA464]">
            IA que transforma tu vida
          </h2>
          <p className="text-[#000000]/55 font-semibold mb-6 font-lato text-2xl leading max-w-xl mx-auto md:mx-0">
            Registra tu peso, rutinas y objetivos; nuestra IA te entregará
            dietas y entrenamientos que evolucionan contigo.
          </p>
          <button
            onClick={openRegisterModal}
            className="bg-[#3CA464] text-white px-8 py-3 mb-4 cursor-pointer text-base rounded-3xl font-extrabold shadow-lg hover:bg-[#329956] transition"
          >
            Comenzar Ahora
          </button>
        </div>

        {/* Imagen */}
        <div className="md:w-[55%] flex justify-end relative z-10">
          <Image
            src={mujerFit}
            alt="Mujer con frutas y pesas"
            className="w-[110%] max-w-none h-auto object-contain translate-x-10 -translate-y-16"
            priority
          />
        </div>
      </div>

      {/* Fondo verde de adorno */}
      <div className="absolute md:top-[-7rem] top-[6rem] bottom-0 right-0 md:w-[38vw] w-[65vw] h-[68vw] bg-[#3CA464] md:rounded-l-[500px] rounded-l-[600px] z-0" />

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
    </section>
  );
};

export default Hero;
