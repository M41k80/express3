import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { colors, spacing, fonts } from '../styles/theme';

type WorkoutItem = {
    date: string;
    exercise_name: string;
    sets: number;
    reps: number;
    weight_kg: number;
};

const WorkoutHistory = () => {
    const { userId } = useAuth();
    const [history, setHistory] = useState<WorkoutItem[]>([]);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userId) return;
            try {
                const res = await api.get('/workout/history', {
                    params: { user_id: userId }
                });
                if (Array.isArray(res.data?.history)) {
                    setHistory(res.data.history);
                } else {
                    setHistory([]);
                    console.warn('Formato inesperado en la respuesta:', res.data);
                }
            } catch (err) {
                console.error('Error fetching workout history:', err);
            }
        };
        fetchHistory();
    }, [userId]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Historial de Entrenamientos</Text>
            <FlatList
                data={history}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.item}>
                        {item.date} - {item.exercise_name} ({item.sets}x{item.reps} @ {item.weight_kg}kg)
                    </Text>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { marginBottom: spacing.large },
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

export default WorkoutHistory;