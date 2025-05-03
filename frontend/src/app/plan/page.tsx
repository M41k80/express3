'use client';
import { useContext, useState } from 'react';
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
        <>
            <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {loading ? 'Generando...' : 'Generar Plan Semanal'}
            </button>

            {plan && (
                <div className="mt-6">
                    <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 text-black whitespace-pre-wrap max-h-[80vh] overflow-auto">
                        <ReactMarkdown>{plan}</ReactMarkdown>
                    </div>

                    <div className="mt-4">
                        <PDFDownloadLink
                            document={<PlanPDF content={plan} />}
                            fileName="plan_entrenamiento.pdf"
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                        >
                            {({ loading }) => loading ? 'Preparando PDF...' : 'Descargar como PDF'}
                        </PDFDownloadLink>
                    </div>
                </div>
            )}
        </>
    );
}
