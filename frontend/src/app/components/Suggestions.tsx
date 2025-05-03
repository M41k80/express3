'use client';
import { useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';

export default function Suggestions() {
    const { userId } = useContext(AuthContext);
    const [suggestion, setSuggestion] = useState('');

    const handleGetSuggestions = async () => {
        const { data } = await api.get('suggestions/suggestions/update', { params: { user_id: userId } });
        setSuggestion(data.suggestion || 'No hay datos suficientes.');
    };

    return (
        <div className="mt-6">
            <button onClick={handleGetSuggestions} className="btn bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 ">
                Obtener Sugerencias
            </button>
            {suggestion && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap text-blue-700">
                    {suggestion}
                </div>
            )}
        </div>
    );
}
