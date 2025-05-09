import React from "react";

const Nosotros = () => {
  return (
    <section
      id="nosotros"
      className="max-w-5xl mx-auto px-6 md:px-0 py-16 space-y-10"
    >
      {/* Título principal */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#1E1E1E]">
        ¿Quieres conocer más sobre{" "}
        <span className="text-[#3CA464]">nosotros</span>?
      </h1>

      {/* Descripción general */}
      <p className="text-[#555] text-lg text-left md:text-xl font-lato font-medium max-w-5xl mx-auto leading">
        Somos un equipo apasionado por la IA, la salud y el desarrollo humano. Creamos una plataforma
        que se adapta a ti, te escucha y evoluciona contigo. Creemos que el bienestar es un proceso diario,
        y estamos aquí para acompañarte a construir tu propia historia.
      </p>

      {/* Misión */}
      <div className="space-y-2">
        <h2 className="text-[#3CA464] font-extrabold text-2xl md:text-3xl">Misión</h2>
        <p className="text-[#555] text-lg md:text-xl font-lato font-medium leading">
          Nuestra misión es hacer del bienestar una experiencia personalizada y accesible.
          Combinamos inteligencia artificial con sensibilidad humana para acompañarte en cada paso
          hacia una vida más saludable. Analizamos tus datos, entendemos tus metas y te entregamos lo que
          necesitas: planes reales, progreso visible y apoyo constante.
        </p>
      </div>

      {/* Visión */}
      <div className="space-y-2">
        <h2 className="text-[#3CA464] font-extrabold text-2xl md:text-3xl">Visión</h2>
        <p className="text-[#555] text-lg md:text-xl font-lato font-medium leading">
          Nuestra visión es ser la plataforma líder en bienestar inteligente, donde cada persona alcance
          su mejor versión con el apoyo de la IA. Creemos en un bienestar inclusivo, donde cada cuerpo
          importa, cada mente cuenta y cada meta es posible.
        </p>
      </div>

      {/* Diferenciadores */}
      <div className="space-y-4 pt-6">
        <h2 className="text-2xl md:text-3xl text-center font-extrabold text-[#1E1E1E]">
          ¿Qué nos hace <span className="text-[#3CA464]">diferentes</span>?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-[#555] text-lg md:text-xl font-lato font-medium leading">
          <li>
            <strong>Adaptación en tiempo real:</strong> Tu cuerpo cambia, tu plan también. Nuestra IA aprende de ti constantemente.
          </li>
          <li>
            <strong>Personalización Total:</strong> Cada cuerpo es único, por eso desde el día uno, todo está hecho para ti.
          </li>
          <li>
            <strong>Visualización Clara del Progreso:</strong> Porque no se trata de ser perfecto. Verás cómo avanzas con gráficas, reportes y datos que hablan tu idioma.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Nosotros;
