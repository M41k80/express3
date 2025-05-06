import React from "react";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen bg-[#FEFFEF] flex flex-col">
        {/* Header Section */}
      <div className="mt-4 flex justify-around text-black p-4 shadow-md">
        <div className="font-bold text-green-600 text-3xl">
          Balance<span className="text-black">IA</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
        <Link href="#" className="text-black hover:text-green-500">
            Nosotros
          </Link>
          <Link href="#" className="text-black hover:text-green-500">
            Blog
          </Link>
          <Link href="#" className="text-black hover:text-green-500">
            Contacto
          </Link>
          <Link href="#" className="text-black hover:text-green-500">
            Términos
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="/login"
            className="px-5 py-2 rounded-full bg-white text-green-500 border border-green-500 hover:bg-green-50"
          >
            Iniciar sesión
          </a>
          <a
            href="/register"
            className="px-5 py-2 rounded-full bg-green-600 text-white hover:bg-green-700"
          >
            Registrarse
          </a>
        </div>
      </div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center bg-[#FEFFEF] text-black">
        <div className="w-full md:w-1/2 z-10 py-12 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Tu progreso, <br />
            nuestra inspiración:
            <h2 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
              IA que transforma <br />
              tu vida
            </h2>
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
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
      {/* Services Section */}
      <div className="bg-white">
        <div className="w-full max-w-6xl mx-auto p-6 flex text-black gap-7 mt-10 mx-auto">
          <Image
            src="/testhealth.svg"
            alt="test health"
            width={545.6790161132812}
            height={416}
            className="mt-8"
          />
          <div>
            {" "}
            <h1 className="text-4xl font-bold mb-4">
              Servicios que Transforman tu{" "}
              <span className="text-green-600">Bienestar</span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 font-bold">
              Conecta tu cuerpo, mente y metas con tecnología que evoluciona
              contigo.
            </p>
            <p>
              Descubre cómo nuestra plataforma impulsada por IA puede guiarte
              hacia una vida más saludable y equilibrada:
            </p>
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto p-6 bg-white mt-10">
          <div className="flex grid grid-cols-1 md:grid-cols-2 gap-8 text-black gap-7">
            <div className="bg-[#FEFFEF] rounded-3xl p-8 shadow-md flex flex-col items-center text-center">
              <Image
                src="/inteligencia-emocional 1.svg"
                alt="inteligencia emocional 1"
                width={126}
                height={126}
                className="mb-8"
              />
              <h1 className="text-xl font-bold mb-2">REGISTRO DE SALUD INTELIGENTE</h1>
              <p>
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
              <h1 className="text-xl font-bold mb-2">PLANES PERSONALIZADOS POR IA</h1>
              <p>
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
              <p>
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
              <h1 className="text-xl font-bold mb-2">RECOMENDACIONES DINÁMICAS</h1>
              <p>
                A medida que cambian tus datos, nuestra IA recalibra tus planes
                y te ofrece nuevas estrategias para seguir avanzando.
              </p>
            </div>
          </div>
        </div>
        {/* Footer Section */}
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
                className="mb-8"
              />
                <span>balanceIA@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
              <Image
                src="/map-pin.svg"
                alt="map pin icon"
                width={32}
                height={32}
                className="mb-8"
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
        <div>
            
        </div>
      </div>
    </div>
  );
};

export default Hero;
