'use client'
import { useState } from 'react'

export default function WeeklyPlan({ userId }: { userId: string }) {
    const [plan, setPlan] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleGeneratePlan = async () => {
        setLoading(true)
        setPlan('')
        setMessage('')

        try {
            const res = await fetch(`/api/plan/weekly?user_id=${userId}`)
            const data = await res.json()

            if (data.plan) {
                setPlan(data.plan)
            } else {
                setMessage(data.message || data.error || 'No se pudo generar el plan.')
            }
        } catch {
            setMessage('Error al generar el plan.')
        }

        setLoading(false)
    }

    return (
        <div className="p-4 rounded-xl shadow bg-white max-w-2xl mx-auto space-y-4">
            <h2 className="text-xl font-semibold text-green-700">Plan semanal personalizado</h2>

            <button
                onClick={handleGeneratePlan}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                {loading ? 'Generando...' : 'Generar nuevo plan semanal'}
            </button>

            {message && <p className="text-sm text-red-500">{message}</p>}

            {plan && (
                <div className="whitespace-pre-wrap border rounded p-4 text-sm text-gray-800 bg-gray-50">
                    {plan}
                </div>
            )}
        </div>
    )
}