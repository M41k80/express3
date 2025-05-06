export interface User {
    id: string;
    token: string;
}

export interface WorkoutLog {
    user_id: string;
    date: string;
    exercise_name: string;
    sets: number;
    reps: number;
    weight_kg: number;
    
}

export interface MealLog {
    user_id: string;
    meal_type: string;
    foods: string;
    date: string;
}