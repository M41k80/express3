import Image from "next/image";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="mt-6 mb-6 w-20 md:w-20 sm:w-40 h-[70vh] md:h-[60vh] lg:h-[115vh] bg-[#A8D4B9] text-white flex flex-col p-4 rounded-full shadow-lg">
      <div className="flex items-center justify-center mb-4"></div>
      <nav className="flex flex-col justify-between flex-1">
        {/* Top icons */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href="/dashboard">
              <div className="w-22 h-20 relative">
                <Image
                  src="/Logo-Balance-IA.svg"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <Link
            href="/home"
            className="hover:bg-[#FEFFEF] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image src="/house-icon.svg" alt="Home" width={30} height={30} />
          </Link>

          <Link
            href="/plans"
            className="hover:bg-[#FEFFEF] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/plans-icon.svg"
              alt="Planes de entrenamiento"
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/dashboard"
            className="hover:bg-[#FEFFEF] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/dashboard-icon.svg"
              alt="Dashboard"
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/suggestions"
            className="hover:bg-[#FEFFEF] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/suggestions-icon.svg"
              alt="Historial alternativo"
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/profile"
            className="hover:bg-[#FEFFEF] p-1.5 rounded-full text-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/profile-icon.svg"
              alt="Perfil de usuario"
              width={30}
              height={30}
            />
          </Link>
        </div>

        {/* Bottom logout icon */}
        <button className="hover:bg-white p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105">
          <Image
            src="/logout-icon.svg"
            alt="Cerrar sesión"
            width={30}
            height={30}
          />
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
