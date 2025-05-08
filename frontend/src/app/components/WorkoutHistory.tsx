'use client';
import { useEffect, useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';

interface LogItem {
    date: string;
    exercise_name: string;
    sets: number;
    reps: number;
    weight_kg: number;
}

export default function WorkoutHistory() {
    const { userId } = useContext(AuthContext);
    const [history, setHistory] = useState<LogItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;  // ← Esperamos a que exista userId

        const fetchHistory = async () => {
            try {
                const { data } = await api.get('/workout/history', {
                    params: { user_id: userId }
                });
                setHistory(data.history);
            } catch (err) {
                console.error('Error al cargar historial:', err);
                setError('No se pudo cargar el historial.');
            }
        };

        fetchHistory();
    }, [userId]);

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
                Historial de Entrenamientos
            </h2>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <ul className="mt-2 space-y-2 bg-[#FEFFEF] list-disc border p-8 rounded-lg text-gray-700">
                {history.map((item, i) => (
                    <li key={i} className="text-gray-900">
                        <strong>{item.date}</strong>: {item.exercise_name} – {item.sets}×
                        {item.reps} @ {item.weight_kg} kg
                    </li>
                ))}
            </ul>
        </div>
    );
}
