'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:8000/auth/register', formData);
            console.log('Usuario registrado:', response.data);
            router.push('/login'); 
        } catch (err: unknown) {
            console.error(err);
            if (axios.isAxiosError(err) && err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else {
                setError('Error al registrar');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Crear cuenta</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded text-blue-600"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-900">Correo electrónico</label>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded text-blue-600"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-900">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded text-blue-600"
                    />
                </div>

                <div>
                    <label className="block font-medium text-gray-900">Repetir contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded text-blue-600"
                    />
                </div>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                    {loading ? 'Registrando...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
}
