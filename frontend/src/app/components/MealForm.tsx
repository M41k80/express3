'use client'
import { useState } from 'react'

export default function MealForm({ userId }: { userId: string }) {
    const [date, setDate] = useState('')
    const [mealType, setMealType] = useState('Desayuno')
    const [foods, setFoods] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    const handleSubmit = async () => {
        setLoading(true)
        setMessage('')

        const res = await fetch('/meals/meals/log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, date, meal_type: mealType, foods })
        })

        const data = await res.json()
        setMessage(data.message || data.error)
        setLoading(false)
    }

    return (
        <div className="p-4 rounded-xl shadow bg-white max-w-md mx-auto space-y-4">
            <h2 className="text-xl font-semibold text-blue-700">Registrar comida</h2>

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-2 border rounded text-blue-600"
            />

            <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value)}
                className="w-full p-2 border rounded text-blue-600"
            >
                <option>Desayuno</option>
                <option>Almuerzo</option>
                <option>Cena</option>
                <option>Snack</option>
            </select>

            <textarea
                value={foods}
                onChange={(e) => setFoods(e.target.value)}
                placeholder="Ej: 2 huevos, 1 pan integral, 1 café"
                className="w-full p-2 border rounded h-24 text-blue-600"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Registrando...' : 'Registrar comida'}
            </button>

            {message && <p className="text-sm text-center mt-2">{message}</p>}
        </div>
    )
}
