import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { colors, spacing, fonts } from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

const RepsChart = () => {
    const { userId } = useAuth();
    const [labels, setLabels] = useState<string[]>([]);
    const [reps, setReps] = useState<number[]>([]);

    useEffect(() => {
        const fetchWorkoutData = async () => {
            try {
                const res = await api.get(`/workout/history?user_id=${userId}`);
                const data = res.data.history || res.data;

                if (Array.isArray(data)) {
                    const recent = data.slice(-7);
                    setLabels(recent.map((w: any) => w.exercise_name.length > 7 ? w.exercise_name.slice(0, 6) + '…' : w.exercise_name));
                    setReps(recent.map((w: any) => w.reps));
                } else {
                    setLabels([]);
                    setReps([]);
                }
            } catch (err) {
                console.error('Error loading reps chart data:', err);
            }
        };

        fetchWorkoutData();
    }, [userId]);

    if (reps.length === 0) {
        return <Text style={styles.message}>No hay datos de ejercicios todavía.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Repeticiones por Ejercicio</Text>
            <BarChart
                yAxisLabel=""
                yAxisSuffix=""
                data={{
                    labels,
                    datasets: [{ data: reps }],
                }}
                width={screenWidth - 60}
                height={250}
                chartConfig={{
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    decimalPlaces: 0,
                    color: () => colors.primary,
                    labelColor: () => colors.text,
                }}
                style={styles.chart}
                verticalLabelRotation={labels.length > 7 ? 10 : 20}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: spacing.large,
        padding: spacing.medium,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontFamily: fonts.bold,
        marginBottom: 10,
        color: colors.text,
    },
    chart: {
        borderRadius: 8,
    },
    message: {
        textAlign: 'center',
        marginTop: 200,
        fontFamily: fonts.body,
        color: colors.text,
    },
});

export default RepsChart;