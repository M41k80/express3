import Image from "next/image";
import mujerFit from "/public/healthmodel.svg";
import "@/app/globals.css";

const Hero = () => {
  return (
    <section className="pt-28 md:pt-32 bg-[#FAFAE7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between relative z-10">
        {/* Texto */}
        <div className="md:w-[55%] space-y-14 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#1E1E1E]">
            Tu progreso, <br /> nuestra inspiración:
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3CA464]">
            IA que transforma tu vida
          </h2>
          <p className="text-[#3f3f3f] text-base leading-relaxed max-w-md mx-auto md:mx-0">
            Registra tu peso, rutinas y objetivos; nuestra IA te entregará
            dietas y entrenamientos que evolucionan contigo.
          </p>
          <button className="bg-[#3CA464] text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-[#329956] transition">
            Comenzar Ahora
          </button>
        </div>

        {/* Imagen */}
        <div className="md:w-[55%] flex justify-end relative z-10">
          <Image
            src={mujerFit}
            alt="Mujer con frutas y pesas"
            className="w-[110%] max-w-none h-auto object-contain translate-x-10 -translate-y-16"
            priority
          />
        </div>
      </div>

      {/* Fondo verde de adorno */}
      <div className="absolute top-[-7rem] bottom-0 right-0 w-[38vw] bg-[#3CA464] rounded-l-[500px] z-0" />
    </section>
  );
};

export default Hero;
