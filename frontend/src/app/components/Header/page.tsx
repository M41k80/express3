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
     <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="text-3xl font-bold text-green-600 ">
          Balance<span className="text-black">IA</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 font-bold">
          <Link href="#" className="text-black hover:text-green-500">
            Servicios
          </Link>
          <Link href="#" className="text-black hover:text-green-500">
            Crear Blog
          </Link>
          <Link href="#" className="text-black hover:text-green-500">
            Nosotros
          </Link>
          <Link href="#" className="text-black hover:text-green-500">
          Términos
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={openLoginModal}
            className="px-5 py-2 rounded-full bg-white text-green-500 border border-green-500 hover:bg-green-50"
          >
            Iniciar sesión
          </button>
          <button
            onClick={openRegisterModal}
            className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
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