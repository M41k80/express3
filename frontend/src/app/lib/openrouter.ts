export async function callOpenRouterAI(prompt: string) {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistral/mistral-7b-instruct',
            messages: [{ role: 'user', content: prompt }]
        })
    })

    const data = await res.json()
    const content = data.choices[0]?.message?.content || ''

    return {
        prediction: extractPrediction(content),
        recommendations: extractRecommendations(content)
    }
}

function extractPrediction(text: string) {
    return text.split('RECOMENDACIONES:')[0]?.trim()
}

function extractRecommendations(text: string) {
    return text.split('RECOMENDACIONES:')[1]?.trim() || ''
}
