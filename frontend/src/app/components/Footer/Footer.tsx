"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#3CA464] text-white py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Home + enlaces */}
        <div className="flex flex-col items-center md:items-center">
          <h3 className="text-2xl font-bold mb-2">Home</h3>
          <div className="flex space-x-6 text-xl">
            <Link href="/#servicios" className="hover:underline">
              Servicios
            </Link>
            <Link href="/#crear-blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/#nosotros" className="hover:underline">
              Nosotros
            </Link>
          </div>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-20 h-20 sm:w-24 sm:h-24">
            <Image
              src="/Logo-Balance-IA.svg"
              alt="Logo BalanceAI"
              width={100}
              height={100}
              className="w-full h-full object-contain"
            />
          </div>
          <h2 className="text-4xl font-bold">
            Balance<span className="text-black">AI</span>
          </h2>
        </div>

        {/* Contacto */}
        <div className="flex flex-col items-center md:items-start space-y-0.5">
          <Link href="/contactform" className="text-2xl font-bold">
            Contacto
          </Link>
          <div className="flex items-center gap-2 text-lg">
            <Image
              src="/email-icon.svg"
              alt="Icono de correo"
              width={20}
              height={20}
            />
            <span>balanceai@gmail.com</span>
          </div>
          <div className="flex items-start gap-2 text-lg">
            <Image
              src="/map-pin.svg"
              alt="Icono de ubicación"
              width={20}
              height={20}
              className="mt-1"
            />
            <div className="text-lg">
              <p>Buenos Aires, Argentina</p>
              <p>Av. 9 de Julio 1150</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
