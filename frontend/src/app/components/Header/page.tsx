import React, {useState} from "react";
import Link from "next/link";
import LoginModal from "../LoginModal/page";
import RegisterModal from "../RegisterModal/page";
import ProfileModal from "@/app/components/ProfileModal/page";


const Header = () => {

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  
    const openLoginModal = () => {
      setIsLoginModalOpen(true)
      setIsRegisterModalOpen(false)
    }
  
    const openRegisterModal = () => {
      setIsRegisterModalOpen(true)
      setIsLoginModalOpen(false)
    }
  
    const closeModals = () => {
      setIsLoginModalOpen(false)
      setIsRegisterModalOpen(false)
    }

    const handleRegisterSuccess = () => {
        setIsRegisterModalOpen(false);
        setIsLoginModalOpen(true); // Abre el modal de login
      };

      const handleLoginSuccess = () => {
        setIsLoginModalOpen(false)
        setIsProfileModalOpen(true) // Abre el modal de profile
      }

  return (
     <div className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div className="text-4xl font-extrabold text-[#3CA464]">
          Balance<span className="text-[#1E1E1E]">AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-bold text-xl">
          <Link href="/Servicios" className="text-[#1E1E1E] hover:text-[#3CA464]">
            Servicios
          </Link>
          <Link href="/Crearblog" className="text-[#1E1E1E] hover:text-[#3CA464]">
            Crear Blog
          </Link>
          <Link href="/Nosotros" className="text-[#1E1E1E] hover:text-[#3CA464]">
            Nosotros
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={openLoginModal}
            className="px-7 py-2 rounded-full bg-[#FEFFEF] text-[#3CA464] font-bold text-base cursor-pointer shadow-md transition duration-300 ease-in-out"
          >
            Iniciar sesión
          </button>
          <button
            onClick={openRegisterModal}
            className="px-7 py-2 rounded-full text-[#FEFFEF] border-2 border-[#FEFFEF] font-bold text-base cursor-pointer shadow-md  transition duration-300 ease-in-out"
          >
            Registrarse
          </button>
        </div>
        {/*Modals */}
        <LoginModal isOpen={isLoginModalOpen} onClose={closeModals} onSwitchToRegister={openRegisterModal} onLoginSuccess={handleLoginSuccess}/>
        <RegisterModal isOpen={isRegisterModalOpen} onClose={closeModals} onSwitchToLogin={openLoginModal} onRegisterSuccess={handleRegisterSuccess}/>
        <ProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}/>
      </div>
  );
}

export default Header;