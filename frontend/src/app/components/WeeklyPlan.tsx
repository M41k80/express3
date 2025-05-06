'use client'
import { useState, useRef, useContext } from 'react'
import api from '../utils/api'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { AuthContext } from '@/app/context/AuthContext'

export default function WeeklyPlan() {
    const { userId } = useContext(AuthContext)
    const [plan, setPlan] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const planRef = useRef<HTMLDivElement>(null)

    const handleGeneratePlan = async () => {
        if (!userId) return
        setLoading(true)
        setMessage('')
        setPlan('')

        try {
            const res = await api.get('/plan/weekly', {
                params: { user_id: userId }
            })
            setPlan(res.data.plan || '')
            if (!res.data.plan) {
                setMessage(res.data.message || res.data.error || 'No se pudo generar el plan.')
            }
        } catch (err) {
            console.error('Error generando plan:', err)
            setMessage('Error al generar el plan.')
        }

        setLoading(false)
    }

    const handleDownloadPDF = async () => {
        if (!planRef.current) return
        const canvas = await html2canvas(planRef.current)
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF()
        const width = pdf.internal.pageSize.getWidth()
        const height = (canvas.height * width) / canvas.width
        pdf.addImage(imgData, 'PNG', 0, 0, width, height)
        pdf.save('plan_semanal.pdf')
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
                <>
                    <div ref={planRef} className="whitespace-pre-wrap border rounded p-4 text-sm text-gray-800 bg-gray-50">
                        {plan}
                    </div>
                    <button
                        onClick={handleDownloadPDF}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Descargar en PDF
                    </button>
                </>
            )}
        </div>
    )
}