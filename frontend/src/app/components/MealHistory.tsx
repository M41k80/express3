'use client'
import { useEffect, useState, useCallback } from 'react'

export default function MealHistory({ userId }: { userId: string }) {
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchMeals = useCallback(async () => {
        setLoading(true)
        const res = await fetch(`/api/meals/history?user_id=${userId}`)
        const data = await res.json()
        setMeals(data || [])
        setLoading(false)
    }, [userId])

    useEffect(() => {
        fetchMeals()
    }, [fetchMeals])

    return (
        <div className="p-4 rounded-xl shadow bg-white space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-blue-600">Historial de comidas</h2>
            {loading ? (
                <p className="text-center text-gray-600">Cargando...</p>
            ) : meals.length === 0 ? (
                <p>No hay comidas registradas.</p>
            ) : (
                meals.map((meal, index) => (
                    <div key={index} className="border-b pb-2 text-blue-600">
                        <p className="text-sm">
                            {(meal as { date: string, meal_type: string }).date} - <strong>{(meal as { date: string, meal_type: string }).meal_type}</strong>
                        </p>
                        <p className="text-sm">{(meal as { foods: string }).foods}</p>
                    </div>
                ))
            )}
        </div>
    )
}