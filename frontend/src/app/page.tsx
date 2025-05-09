import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Servicios from "./components/sections/Servicios";
import BlogPage from "./components/sections/CrearBlog";
import Nosotros from "./components/sections/Nosotros";
import Footer from "./components/Footer/page";

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
