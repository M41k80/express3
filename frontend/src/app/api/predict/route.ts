import { NextResponse } from 'next/server'
import { callOpenRouterAI } from '@/app/lib/openrouter'
import { supabase } from '@/app/lib/supabase'

export async function POST(req: Request) {
    const body = await req.json()
    const { userId, profile, sessions } = body

    const prompt = `
Eres un entrenador personalizado de IA. Con base en este perfil:

${JSON.stringify(profile, null, 2)}

Y estas sesiones de entrenamiento:

${JSON.stringify(sessions.slice(-5), null, 2)}

Genera una predicción del progreso esperado en 4 semanas, y recomendaciones personalizadas. Formato:
PREDICCIÓN:
...
RECOMENDACIONES:
...`

    const ai = await callOpenRouterAI(prompt)

    const { error } = await supabase.from('predictions').insert([
        {
            user_id: userId,
            exercise: 'General',
            future_progress: ai.prediction,
            recommendations: ai.recommendations
        }
    ])

    if (error) return NextResponse.json({ error }, { status: 500 })

    return NextResponse.json({ message: 'ok', ai })
}
