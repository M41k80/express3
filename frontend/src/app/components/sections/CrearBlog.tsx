"use client";

import { useEffect, useState } from "react";
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
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <h1 className="text-4xl font-bold text-center text-blue-200">
        Blog de Salud y Ejercicio
      </h1>

      {/* aqui va el formulario para crear un nuevo blog */}
      <form
        onSubmit={handleCreateBlog}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-700">
          Crear nuevo blog
        </h2>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Ej: hipertrofia, ayuno, pérdida de grasa..."
          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-700"
        />
        <button
          type="submit"
          disabled={creating}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {creating ? "Creando..." : "Crear Blog"}
        </button>
        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}
      </form>

      {/* lista de los blogs */}
      {loading ? (
        <p className="text-center">Cargando blogs...</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-lg shadow space-y-2"
          >
            <h3 className="text-xl font-bold text-blue-700">{blog.title}</h3>
            <p className="text-sm text-gray-500">
              Publicado el {new Date(blog.created_at).toLocaleDateString()}
            </p>
            <p className="text-gray-800 whitespace-pre-line">{blog.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
