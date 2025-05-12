import Navbar from "@/app/components/Navbar/Navbar";
import Hero from "@/app/components/Hero/Hero";
import Servicios from "@/app/components/sections/Servicios";
import BlogPage from "@/app/components/sections/CrearBlog";
import Nosotros from "@/app/components/sections/Nosotros";
import Footer from "@/app/components/Footer/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      {/* Navbar fijo */}
      <Navbar />

      {/* Sección principal (Hero) */}
      <Hero />

      {/* Secciones ancladas */}
      <section id="servicios">
        <Servicios />
      </section>

      <section id="crear-blog">
        <BlogPage />
      </section>

      <section id="nosotros">
        <Nosotros />
      </section>
      {/* Footer fijo */}
      <Footer/>
    </main>
  );
}
