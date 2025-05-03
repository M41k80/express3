'use client';
import { useState, useContext, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/app/context/AuthContext';

interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        name?: string;
        role?: string;
    };
}

export default function LoginPage() {
    const { login } = useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true); 
        try {
            const { data } = await axios.post<AuthResponse>(
                'https://intelligent-delight-production.up.railway.app/auth/login',
                { email, password }
            );
            login({ token: data.accessToken, user: data.user });
            router.push('/profile');
        } catch (err) {
            console.error(err);
            alert('Credenciales inválidas');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Iniciar sesión</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Introduce tu correo"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Introduce tu contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Ingresar'}
                </button>
            </form>
        </div>
    );
}