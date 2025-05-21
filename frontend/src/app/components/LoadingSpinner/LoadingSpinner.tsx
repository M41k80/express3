"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoadingSpinnerProps {
  isOpen: boolean;
  message?: string;
}

const LoadingSpinner = ({
  isOpen,
  message = "Cargando...",
}: LoadingSpinnerProps) => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  // Muestra el spinner
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    }
  }, [isOpen]);

  // Espera 2 segundos y redirige
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        router.push("/suggestions");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, router]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-10 max-w-lg w-full text-center">
        <p className="text-2xl font-bold mb-6">{message}</p>
        <div className="flex justify-center">
          <div className="h-26 w-26 rounded-full border-10 border-green-200 border-t-[#3CA464] animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
