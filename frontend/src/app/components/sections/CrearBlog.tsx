"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import api from "../../utils/api";

interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchBlogs = async () => {
    try {
      const response = await api.get("blog/blog/all");
      setBlogs(response.data);
    } catch (error) {
      console.error("Error al cargar los blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    try {
      setCreating(true);
      setError("");
      setSuccess("");

      await api.post("blog/blog/create", null, {
        params: { topic },
      });

      setSuccess("Blog creado exitosamente ✅");
      setTopic("");
      fetchBlogs();
    } catch (err) {
      console.error(err);
      setError("Error al crear el blog ❌");
    } finally {
      setCreating(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-10 px-6 md:px-0">
      {/* Encabezado visual estilo prototipo */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1E1E1E] leading mx-auto max-w-5xl mb-8 px-4">
          ¿Te gustaría descubrir cómo el{" "}
          <span className="text-[#3CA464]">balance</span> puede impulsar una{" "}
          <span className="text-[#3CA464]">vida saludable</span>?
        </h1>

        <h2 className="text-2xl md:text-3xl font-lato font-extrabold text-[#1E1E1E]/55">
          “Lana”, nuestra agente IA crea contenido para ti.
        </h2>

        {/* Contenido con imagen y texto */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between pt-6 px-4 gap-6">
          {/* Texto */}
          <div className="md:w-3/5 w-full text-left space-y-4 text-[#1E1E1E]/55 font-lato text-base sm:text-lg md:text-2xl font-medium mt-4 md:-mt-8">
            <p>
              Solo basta una idea, y <strong>Lana</strong> hará el resto:
              generará un artículo completo con{" "}
              <strong>títulos que cautivan</strong> y{" "}
              <strong>contenido alineado a tu propósito</strong>.
            </p>
            <p>
              Deja que <strong>Lana</strong> impulse tu curiosidad, amplíe tu
              visión y te acerque cada vez más a{" "}
              <span className="font-semibold">una vida plena</span> y en{" "}
              <span className="text-[#3CA464] font-semibold">balance</span>.
            </p>
          </div>

          {/* Imagen */}
          <div className="md:w-2/5 w-full flex justify-center">
            <Image
              src="/lana.png"
              alt="Lana leyendo"
              width={420}
              height={420}
              className="object-contain w-full max-w-[280px] md:max-w-[420px] h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Formulario de creación */}
      <form
        onSubmit={handleCreateBlog}
        className="space-y-4 max-w-5xl md:-mt-10 -mt-6"
      >
        <h2 className="md:text-2xl text-lg font-extrabold text-[#1E1E1E]/55 font-lato">
          Ingresa tu idea:
        </h2>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ej: hipertrofia, ayuno, pérdida de grasa..."
          className="w-full border rounded-xl px-4 py-2 mb-7 focus:outline-none font-lato font-medium md:text-xl focus:ring-1 focus:ring-[#3CA464] text-[#1E1E1E]/75"
        />

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={creating}
            className="bg-[#3CA464] cursor-pointer text-white px-10 py-2 font-extrabold text-base rounded-2xl hover:bg-[#329956] shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.03]"
          >
            {creating ? "Creando..." : "Crear Blog"}
          </button>
        </div>

        {success && <p className="text-[#3CA464] text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>

      {/* Lista de blogs */}
      {loading ? (
        <p className="text-center">Cargando blogs...</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-[#FEFFEF] p-8 rounded-2xl shadow space-y-2 border-2 border-[#1E1E1E]/55"
          >
            <h3 className="text-xl font-extrabold text-[#3CA464] font-lato">
              {blog.title}
            </h3>
            <p className="text-lg italic text-[#1E1E1E]/55 font-lato">
              Publicado el {new Date(blog.created_at).toLocaleDateString()}
            </p>
            <p className="text-[#1E1E1E]/75 whitespace-pre-line font-medium text-xl font-lato break-words">
              {blog.content}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
