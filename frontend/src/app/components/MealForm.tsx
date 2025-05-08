'use client'
import { useState, useContext } from 'react'
import { AuthContext } from '@/app/context/AuthContext'
import api from '@/app/utils/api'

export default function MealForm() {
    const { userId } = useContext(AuthContext)
    const [date, setDate] = useState('')
    const [mealType, setMealType] = useState('Desayuno')
    const [foods, setFoods] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
    const [water, setWater] = useState(0)

    const handleSubmit = async () => {
        if (!userId || !date || !foods) return
        setLoading(true)
        setMessage('')

        try {
            const res = await api.post('/meals/meals/log', {
                user_id: userId,
                date,
                meal_type: mealType,
                foods,
                water
            })
            setMessage(res.data.message || 'Comida registrada correctamente')
            setDate('')
            setFoods('')
        } catch (error) {
            console.error('Error al registrar comida:', error)
            setMessage('No se pudo registrar la comida')
        }

        setLoading(false)
    }

    return (
        <div className="p-4 rounded-xl shadow bg-white max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-semibold text-blue-700">Registrar comida</h2>

            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-2 border rounded text-blue-600" />
            <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="w-full p-2 border rounded text-blue-600">
                <option>Desayuno</option>
                <option>Almuerzo</option>
                <option>Cena</option>
                <option>Snack</option>
            </select>
            <textarea value={foods} onChange={(e) => setFoods(e.target.value)} placeholder="Ej: 2 huevos, 1 pan integral, 1 café" className="w-full p-2 border rounded h-24 text-blue-600" />

            <button onClick={handleSubmit} disabled={loading} className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? 'Registrando...' : 'Registrar comida'}
            </button>

            {message && <p className="text-sm text-center mt-2 text-gray-700">{message}</p>}
        </div>
    )
}