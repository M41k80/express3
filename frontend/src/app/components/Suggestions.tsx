'use client';
import { useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';
import ReactMarkdown from 'react-markdown';

export default function Suggestions() {
    const { userId } = useContext(AuthContext);
    const [suggestion, setSuggestion] = useState('');

    const handleGetSuggestions = async () => {
        const { data } = await api.get('suggestions/suggestions/update', { params: { user_id: userId } });
        setSuggestion(data.suggestion || 'No hay datos suficientes.');
    };

    return (
        <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
            <button onClick={handleGetSuggestions} className="btn bg-green-500 text-white py-3 px-6 margin-left-auto rounded-full hover:bg-green-600 transition-colors mb-8">
                Obtener Sugerencias
            </button>
            {suggestion && (
                <div className="bg-[#FEFFEF] border border-yellow-100 p-6 text-black  max-h-[100vh] overflow-auto mb-8 w-full text-left">
                    <ReactMarkdown>{suggestion}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}
