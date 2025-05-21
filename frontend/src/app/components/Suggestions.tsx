"use client";
import { useState, useContext, useEffect } from "react";
import api from "../utils/api";
import { AuthContext } from "@/app/context/AuthContext";
import ReactMarkdown from "react-markdown";

export default function Suggestions() {
  const { userId } = useContext(AuthContext);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const { data } = await api.get("suggestions/suggestions/update", {
          params: { user_id: userId },
        });
        setSuggestion(data.suggestion || "No hay datos suficientes.");
      } catch (error) {
        console.error("Error al obtener sugerencias:", error);
        setSuggestion("Hubo un error al cargar las sugerencias.");
      }
    };

    if (userId) {
      fetchSuggestions();
    }
  }, [userId]);

  return (
    <div className="bg-[#FEFFEF] border border-[#1E1E1E]/55 font-lato font-semibold text-base shadow-lg rounded-2xl mb-8 w-full overflow-clip">
      {suggestion && (
        <div className="p-6 pr-6 text-[#1E1E1E]/55 max-h-[80vh] overflow-auto">
          <ReactMarkdown>{suggestion}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
