import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { colors, spacing, fonts } from '../styles/theme';

type MealItem = {
    date: string;
    meal_type: string;
    foods: string;
};


const MealHistory = () => {
    const { userId } = useAuth();
    const [meals, setMeals] = useState<MealItem[]>([]);


    useEffect(() => {
        const fetchMeals = async () => {
            if (!userId) return;
            const res = await api.get(`/meals/meals/history?user_id=${userId}`);
            setMeals(res.data);
        };
        fetchMeals();
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Comidas</Text>
            {meals.map((item, index) => (
                <Text key={index} style={styles.item}>
                    {item.date} - {item.meal_type}: {item.foods}
                </Text>
            ))}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.large,
    },
    title: {
        fontFamily: fonts.bold,
        fontSize: 18,
        marginBottom: spacing.small,
        color: colors.text,
    },
    item: {
        fontFamily: fonts.body,
        marginBottom: 6,
        color: colors.text,
    },
});

export default MealHistory;
