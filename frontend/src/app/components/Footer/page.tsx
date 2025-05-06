import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-green-600 text-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <h3 className="text-xl font-bold">Home</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#" className="hover:underline">
                Nosotros
              </Link>
              <Link href="#" className="hover:underline">
                Blog
              </Link>
              <Link href="#" className="hover:underline">
                Contacto
              </Link>
              <Link href="#" className="hover:underline">
                Términos
              </Link>
            </nav>
          </div>

          {/* Center Column - Logo */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-24 mb-2">
              <Image
                src="/Logo-Balance-IA.svg"
                alt="Logo"
                width={100}
                height={100}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-3xl font-bold">
              Balance<span className="text-black">IA</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center md:items-end space-y-4">
            <h3 className="text-xl font-bold">Contacto</h3>
            <div className="flex items-center gap-2">
              <Image
                src="/email-icon.svg"
                alt="email icon"
                width={32}
                height={32}
                className=""
              />
              <span>balanceIA@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/map-pin.svg"
                alt="map pin icon"
                width={32}
                height={32}
                className=""
              />
              <div className="flex flex-col">
                <span>Buenos Aires, Argentina</span>
                <span>Av. 9 de Julio 1150</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
