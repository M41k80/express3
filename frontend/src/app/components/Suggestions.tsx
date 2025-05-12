'use client';
import { useState, useContext, useEffect } from 'react';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';
import ReactMarkdown from 'react-markdown';

export default function Suggestions() {
    const { userId } = useContext(AuthContext);
    const [suggestion, setSuggestion] = useState('');

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const { data } = await api.get('suggestions/suggestions/update', {
                    params: { user_id: userId }
                });
                setSuggestion(data.suggestion || 'No hay datos suficientes.');
            } catch (error) {
                console.error('Error al obtener sugerencias:', error);
                setSuggestion('Hubo un error al cargar las sugerencias.');
            }
        };

        if (userId) {
            fetchSuggestions();
        }
    }, [userId]); 

    return (
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
            {suggestion && (
                <div className="bg-[#FEFFEF] border border-yellow-100 p-6 text-black max-h-[100vh] overflow-auto mb-8 w-full text-left">
                    <ReactMarkdown>{suggestion}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}
