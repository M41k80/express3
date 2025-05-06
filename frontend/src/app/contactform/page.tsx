"use client";

import React, { useState } from "react";
import Header from "../components/Header/page";
import Footer from "../components/Footer/page";

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
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-[#FEFFEF]">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 bg-white">
        <h1 className="text-3xl font-medium mb-8 text-center text-black">
          Contacto
        </h1>

        <div className="w-full max-w-md bg-[#FEFFEF] rounded-lg p-8 shadow-sm text-black">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="nombre"
                className="block text-sm font-medium mb-2"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-[#FEFFEF]"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="correo"
                className="block text-sm font-medium mb-2"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-[#FEFFEF]"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="asunto"
                className="block text-sm font-medium mb-2"
              >
                Asunto
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded bg-[#FEFFEF]"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="mensaje"
                className="block text-sm font-medium mb-2"
              >
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                rows={5}
                className="w-full p-2 border border-gray-300 rounded bg-[#FEFFEF]"
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-12 rounded transition-colors"
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
