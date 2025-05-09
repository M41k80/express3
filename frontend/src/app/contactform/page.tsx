"use client";

import React, { useState } from "react";
import Footer from "../components/Footer/page";
import Navbar from "../components/Navbar";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen mt-8">
      <Navbar />
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1E1E1E] mb-10 text-center">
          Contacto
        </h1>

        <div className="bg-[#FEFFEF] w-full max-w-xl p-12 rounded-3xl shadow-md border border-gray-300">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="nombre"
                className="block mb-1 text-lg font-lato font-medium text-[#1E1E1E]"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-400 rounded-md bg-[#FEFFEF] text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
              />
            </div>

            <div>
              <label
                htmlFor="correo"
                className="block mb-1 font-medium text-lg font-lato text-[#1E1E1E]"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-400 rounded-md bg-[#FEFFEF] text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
              />
            </div>

            <div>
              <label
                htmlFor="asunto"
                className="block mb-1 text-lg font-lato font-medium text-[#1E1E1E]"
              >
                Asunto
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-400 rounded-md bg-[#FEFFEF] text-[#1E1E1E] focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
              />
            </div>

            <div>
              <label
                htmlFor="mensaje"
                className="block mb-1 text-xlg font-lato font-medium text-[#1E1E1E]"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={4}
                required
                className="w-full p-2 border border-gray-400 rounded-md bg-[#FEFFEF] text-[#1E1E1E] resize-none focus:outline-none focus:ring-1 focus:ring-[#3CA464]"
              />
            </div>

            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="bg-[#3CA464] hover:bg-[#329956] cursor-pointer text-lg text-white font-semibold px-18 py-2 rounded-2xl transition-shadow shadow-md"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactForm;
