'use client'
import { useEffect, useState, useContext } from 'react'
import api from '@/app/utils/api'
import { AuthContext } from '@/app/context/AuthContext'

export default function MealHistory() {
    const { userId } = useContext(AuthContext)
    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!userId) return

        const fetchMeals = async () => {
            setLoading(true)
            try {
                const res = await api.get('/meals/meals/history', {
                    params: { user_id: userId }
                })
                setMeals(res.data || [])
            } catch (error) {
                console.error('Error al obtener historial de comidas:', error)
            }
            setLoading(false)
        }

        fetchMeals()
    }, [userId])

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
                        <p className="text-sm">{(meal as {date: string, meal_type: string}).date} - <strong>{(meal as {date: string, meal_type: string}).meal_type}</strong></p>
                        <p className="text-sm">{(meal as {foods: string}).foods}</p>
                    </div>
                ))
            )}
        </div>
    )
}