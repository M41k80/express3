import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import RegisterWorkoutScreen from '../screens/RegisterWorkoutScreen';
import RegisterMealScreen from '../screens/RegisterMealScreen';
// import WeeklyPlanScreen from '../screens/WeeklyPlanScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { userId } = useAuth();

    return (
        <Stack.Navigator>
            {userId ? (
                <>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="RegisterWorkout" component={RegisterWorkoutScreen} />
                    <Stack.Screen name="RegisterMeal" component={RegisterMealScreen} />
                    {/* <Stack.Screen name="WeeklyPlan" component={WeeklyPlanScreen} /> */}
                </>
            ) : (
                <Stack.Screen name="Login" component={LoginScreen} />
            )}
        </Stack.Navigator>
    );
};

export default AppNavigator;