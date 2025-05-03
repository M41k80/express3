'use client';
import { useState, useContext, ChangeEvent, FormEvent } from 'react';
import api from '../utils/api';
import { AuthContext } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';

interface ProfileForm {
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

interface ProfileResponse {
    status: string;
    user_id: string;
    imc: number;
    calories_target: number;
    macros: {
        protein_g: number;
        carbs_g: number;
        fats_g: number;
    };
}

export default function ProfilePage() {
    const { userId } = useContext(AuthContext);
    const router = useRouter();
    const [form, setForm] = useState<ProfileForm>({
        age: 0,
        gender: '',
        height_cm: 0,
        weight_kg: 0,
        desired_weight_kg: 0,
        fitness_level: '',
        training_place: '',
        goals: [],
        restrictions: [],
        medical_conditions: [],
        habits: ''
    });
    const [result, setResult] = useState<ProfileResponse | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'age' ||
                name === 'height_cm' ||
                name === 'weight_kg' ||
                name === 'desired_weight_kg'
                ? Number(value)
                : value
        }));
    };

    const handleGoalChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setForm(prev => ({
            ...prev,
            goals: checked
                ? [...prev.goals, value]
                : prev.goals.filter(goal => goal !== value)
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!userId) return alert('Usuario no autenticado');
        const payload = { user_id: userId, ...form };
        const { data } = await api.post<ProfileResponse>('/profile/init', payload);
        setResult(data);
    };

    const handleGoToPlan = () => {
        router.push('/plan');  // Redirige a la página de plan
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700">Perfil</h2>
                <div className="space-y-4">
                    <label htmlFor="age" className="block text-gray-600 font-semibold mb-2">
                        Edad
                    </label>
                    <input
                        name="age"
                        type="number"
                        placeholder="Edad"
                        value={form.age}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    />
                    <label htmlFor="gender" className="block text-gray-600 font-semibold mb-2">
                        Género
                    </label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    >
                        <option value="">Género</option>
                        <option value="masculino">Masculino</option>
                        <option value="femenino">Femenino</option>
                    </select>
                    <label htmlFor="height_cm" className="block text-gray-600 font-semibold mb-2">
                        Altura (cm)
                    </label>
                    <input
                        name="height_cm"
                        type="number"
                        placeholder="Altura (cm)"
                        value={form.height_cm}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    />
                    <label htmlFor="weight_kg" className="block text-gray-600 font-semibold mb-2">
                        Peso (kg)
                    </label>
                    <input
                        name="weight_kg"
                        type="number"
                        placeholder="Peso (kg)"
                        value={form.weight_kg}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    />
                    <label htmlFor="desired_weight_kg" className="block text-gray-600 font-semibold mb-2">
                        Peso deseado (kg)   
                    </label>
                    <input
                        name="desired_weight_kg"
                        type="number"
                        placeholder="Peso deseado (kg)"
                        value={form.desired_weight_kg}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    />
                    <label htmlFor="fitness_level" className="block text-gray-600 font-semibold mb-2">
                        Nivel de fitness
                    </label>
                    <select
                        name="fitness_level"
                        value={form.fitness_level}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    >
                        <option value="">Nivel</option>
                        <option value="novato">Novato</option>
                        <option value="principiante">Principiante</option>
                        <option value="medio">Medio</option>
                        <option value="experto">Experto</option>
                    </select>
                    <label htmlFor="training_place" className="block text-gray-600 font-semibold mb-2">
                        Lugar de entrenamiento
                    </label>
                    <select
                        name="training_place"
                        value={form.training_place}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                    >
                        <option value="">Lugar</option>
                        <option value="casa">Casa</option>
                        <option value="gym">Gym</option>
                    </select>
                </div>

                <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-gray-700">Objetivos</legend>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" value="bajar_peso" onChange={handleGoalChange} />
                        <span className="ml-2 text-blue-500">Bajar de peso</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" value="aumentar_masa" onChange={handleGoalChange} />
                        <span className="ml-2 text-blue-500">Aumentar masa muscular</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" value="mantener" onChange={handleGoalChange} />
                        <span className="ml-2 text-blue-500">Mantener peso</span>
                    </label>
                </fieldset>

                <fieldset className="space-y-4">
                    <legend className="text-lg font-semibold text-gray-700">Restricciones alimenticias</legend>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" value="sin_gluten" onChange={handleGoalChange} />
                        <span className="ml-2 text-blue-500">Sin gluten</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" value="sin_lactosa" onChange={handleGoalChange} />
                        <span className="ml-2 text-blue-500">Sin lactosa</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input type="checkbox" value="vegetariano" onChange={handleGoalChange} />
                        <span className="ml-2 text-blue-500">Vegetariano</span>
                    </label>
                </fieldset>

                <label htmlFor="medical_conditions" className="block text-gray-600 font-semibold mb-2">
                    Condiciones médicas
                </label>
                <textarea
                    name="medical_conditions"
                    placeholder="Condiciones médicas"
                    value={form.medical_conditions?.join(', ') || ''}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, medical_conditions: e.target.value.split(', ') }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                />
                <label htmlFor="habits" className="block text-gray-600 font-semibold mb-2">
                    Hábitos Ejemplo:“Duermo 7 h diarias, tomo 2 L de agua, bebo 2 cafés al día, como cada 3 h (3 comidas + 2 snacks), trabajo sentado y hago pausas activas, no consumo alcohol ni tabaco, medito 10 min en la mañana.”
                </label>
                <textarea
                    name="habits"
                    placeholder="Hábitos"
                    value={form.habits || ''}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, habits: e.target.value }))
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-500"
                />

                <button
                    type="submit"
                    className="w-full py-3 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                    Guardar Perfil
                </button>
            </form>

            {result && (
                <div className="mt-8 p-6 bg-white rounded-lg shadow-md text-gray-700">
                    <p className="text-lg font-semibold">Resultados</p>
                    <p>IMC: {result.imc} masa corporal</p>
                    <p>Calorías objetivo: {result.calories_target} calorías</p>
                    <p>
                        Macros: Proteinas:{result.macros.protein_g}g / Carbohidratos:{result.macros.carbs_g}g / Grasas(F):{result.macros.fats_g}g
                    </p>
                    <button
                        onClick={handleGoToPlan}
                        className="mt-4 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none"
                    >
                        Ver mi plan
                    </button>
                </div>
            )}
        </>
    );
}
