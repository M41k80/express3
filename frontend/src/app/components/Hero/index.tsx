"use client";

import React from "react";
import Image from "next/image";
import Footer from "../Footer/page";
import Header from "../Header/page";

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#FEFFEF]">
      {/* Header Section */}
      <Header />
      {/* Hero Section */}
      <div className="container mx-auto px-4 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center bg-[#FEFFEF] text-black">
          <div className="w-full md:w-1/2 z-10 py-12 md:py-24">
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Tu progreso, <br />
              nuestra inspiración:
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
              IA que transforma <br />
              tu vida
            </h2>
            <p className="text-[#000000]/55 mb-8 font-lato font-semibold text-2xl mt-18 max-w-xl flex absolute">
              Registra tu peso, rutinas y objetivos; nuestra IA te entregará
              dietas y entrenamientos que evolucionan contigo.
            </p>
            <a
              href="/register"
              className="px-8 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 inline-block shadow-md"
            >
              Comenzar ahora
            </a>
          </div>
          <Image
            src="/healthmodel.svg"
            alt="Health Model"
            width={1055}
            height={703}
            className="object-contain mt-8"
          />
        </div>
      </div>

      {/* Modals for Login and Register */}

      {/* Services Section */}
      <div className="bg-white">
        {/* Services Section Header */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left column with image */}
            <Image
              src="/testhealth.svg"
              alt="test health"
              width={545.6790161132812}
              height={416}
              className="mt-8"
            />
            <div className="space-y-6">
              {/* Right column with text content */}
              <h1 className="text-4xl font-bold mb-4 text-black leading-tight">
                Servicios que <br />
                Transforman <br />
                <span className="text-green-600">tu Bienestar</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 font-bold">
                Conecta tu cuerpo, mente y metas con tecnología que evoluciona
                contigo.
              </p>
              <p className="text-gray-600">
                Descubre cómo nuestra plataforma impulsada por IA puede guiarte
                hacia una vida más saludable y equilibrada:
              </p>
            </div>
          </div>
        </div>
        {/* Services Cards */}
        <div className="w-full max-w-6xl mx-auto p-6 bg-white mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black">
            <div className="bg-[#FEFFEF] rounded-3xl p-8 shadow-md flex flex-col items-center text-center">
              <Image
                src="/inteligencia-emocional 1.svg"
                alt="inteligencia emocional 1"
                width={126}
                height={126}
                className="mb-8"
              />
              <h1 className="text-xl font-bold mb-2">
                REGISTRO DE SALUD INTELIGENTE
              </h1>
              <p className="text-gray-600">
                Ingresa tus datos físicos y de bienestar en segundos. Nuestra IA
                los analiza y se adapta a ti desde el primer momento.
              </p>
            </div>
            <div className="bg-[#FEFFEF] rounded-3xl p-8 shadow-md flex flex-col items-center text-center">
              <Image
                src="/inteligencia-emocional 2.svg"
                alt="inteligencia emocional 2"
                width={126}
                height={126}
                className="mb-8"
              />
              <h1 className="text-xl font-bold mb-2">
                PLANES PERSONALIZADOS POR IA
              </h1>
              <p className="text-gray-600">
                Recibe rutinas de ejercicio y planes de alimentación únicos,
                basados en tu salud actual y tus objetivos personales.
              </p>
            </div>
            <div className="bg-[#FEFFEF] rounded-3xl p-8 shadow-md flex flex-col items-center text-center">
              <Image
                src="/inteligencia-emocional 4.svg"
                alt="inteligencia emocional 4"
                width={126}
                height={126}
                className="mb-8"
              />
              <h1 className="text-xl font-bold mb-2">DASHBOARD DE PROGRESO</h1>
              <p className="text-gray-600">
                Visualiza tu evolución con gráficas interactivas, porcentajes y
                reportes que te muestran cada avance.
              </p>
            </div>
            <div className="bg-[#FEFFEF] rounded-3xl p-8 shadow-md flex flex-col items-center text-center">
              <Image
                src="/inteligencia-emocional 3.svg"
                alt="inteligencia emocional 3"
                width={126}
                height={126}
                className="mb-8"
              />
              <h1 className="text-xl font-bold mb-2">
                RECOMENDACIONES DINÁMICAS
              </h1>
              <p className="text-gray-600">
                A medida que cambian tus datos, nuestra IA recalibra tus planes
                y te ofrece nuevas estrategias para seguir avanzando.
              </p>
            </div>
          </div>
        </div>
        {/* Footer Section */}
        <Footer />
      </div>
    </div>
  );
};

export default Hero;
