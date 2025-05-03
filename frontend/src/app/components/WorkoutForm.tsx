'use client';
import { useState, useContext } from 'react';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';

export default function WorkoutForm() {
    const { userId } = useContext(AuthContext);
    const [form, setForm] = useState({ exercise_name: '', sets: 0, reps: 0, weight_kg: 0, date: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        await api.post('workout/log', { ...form, user_id: userId });
        alert('Entrenamiento registrado');
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <input name="exercise_name" placeholder="Ejercicio" onChange={handleChange} className="input text-gray-900" />
            <input name="sets" type="number" placeholder="Series" onChange={handleChange} className="input text-gray-900" />
            <input name="reps" type="number" placeholder="Repeticiones" onChange={handleChange} className="input text-gray-900" />
            <input name="weight_kg" type="number" placeholder="Peso (kg)" onChange={handleChange} className="input text-gray-900" />
            <input name="date" type="date" onChange={handleChange} className="input text-gray-900" />
            <button onClick={handleSubmit} className="btn mt-2 text-emerald-900">Registrar</button>
        </div>
    );
}
