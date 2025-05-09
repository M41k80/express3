'use client';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar/Sidebar';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';
import ReactMarkdown from 'react-markdown';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PlanPDF } from '@/app/components/MyPlanPDF';

interface UserProfile {
    user_id: string;
    age: number;
    gender: string;
    height_cm: number;
    weight_kg: number;
    desired_weight_kg: number;
    fitness_level: string;
    training_place: string;
    goals: string[];
    restrictions?: string[];
    medical_conditions?: string[];
    habits?: string;
}

export default function PlanPage() {
    const { userId } = useContext(AuthContext);
    const [plan, setPlan] = useState<string>('');
    const [loading, setLoading] = useState(false);
    // eslint-disable-next-line
    const router = useRouter();

    const handleGenerate = async () => {
        if (!userId) return alert('Usuario no autenticado');
        setLoading(true);

        try {
            const { data: profile } = await api.get<UserProfile>(`/profile/${userId}`);
            const { data } = await api.post<{ plan: string }>('/plan/generate', profile);
            setPlan(data.plan);
        } catch (error) {
            alert('Error al generar el plan');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 pl-20 text-black">
                {/* Header */}
                <header className="py-6 px-8 flex justify-between items-center">
                    <div></div>
                    <div className="text-2xl font-bold text-green-500">BalanceIA</div>
                </header>

                {/* Contenido principal */}
                <div className="px-8 py-6 max-w-3xl mx-auto text-center">
                    <h1 className="text-2xl font-bold mb-4">Planes de Entrenamiento y Comidas</h1>
                    <p className="text-lg mb-8">Gracias a tu perfil de salud, hemos generado planes a tu medida que te ayudaran a alcanzar tus objetivos..</p>

                    {/* Botón generar */}
                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="bg-green-500 text-white py-3 px-6 rounded-full hover:bg-gray-600 disabled:bg-gray-400 disabled:cursor-not-allowed mb-8"
                    >
                        {loading ? 'Generando...' : 'Generar Plan Semanal'}
                    </button>

                    {/* Resultado del plan */}
                    {plan && (
                        <div className="text-left">
                            <div className="bg-[#FEFFEF] border border-yellow-100 p-6 text-black  max-h-[70vh] overflow-auto mb-8 w-full">
                                <ReactMarkdown>{plan}</ReactMarkdown>
                            </div>

                            <PDFDownloadLink
                                document={<PlanPDF content={plan} />}
                                fileName="plan_entrenamiento.pdf"
                                className="inline-block bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition-colors"
                            >
                                {({ loading }) => loading ? 'Preparando PDF...' : 'Descargar como PDF'}
                            </PDFDownloadLink>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
