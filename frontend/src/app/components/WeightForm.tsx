'use client';

import { useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';

export default function WeightForm() {
    const { userId } = useContext(AuthContext);
    const [weight, setWeight] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId || !weight) return;

        try {
            setLoading(true);
            await api.post('weight-log', {
                user_id: userId,
                weight_kg: parseFloat(weight),
            });
            setSuccess(true);
            setWeight('');
            setTimeout(() => setSuccess(false), 2000);
        } catch (error) {
            console.error('Error al guardar el peso:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700 font-medium mb-1">Peso actual (kg)</label>
                <input
                    type="number"
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                    required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
                {loading ? 'Guardando...' : 'Guardar peso'}
            </button>
            {success && <p className="text-green-600">Peso registrado correctamente.</p>}
        </form>
    );
}
