import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { colors, fonts, spacing } from '../styles/theme';

const screenWidth = Dimensions.get('window').width;

const WeightChart = () => {
    const { userId } = useAuth();
    const [labels, setLabels] = useState<string[]>([]);
    const [weights, setWeights] = useState<number[]>([]);

    useEffect(() => {
        const fetchWeights = async () => {
            try {
                const res = await api.get(`/weight-history/${userId}`);
                const rawData = res.data.weightHistory;
    
                if (Array.isArray(rawData)) {
                    const data = rawData.slice(-7);
                    setLabels(data.map((item: any) => item.date.slice(5)));
                    setWeights(data.map((item: any) => item.weight_kg)); // Asegúrate que sea `weight_kg`
                } else {
                    console.warn('Expected array for weightHistory, got:', rawData);
                    setLabels([]);
                    setWeights([]);
                }
            } catch (err) {
                console.error('Error fetching weight data:', err);
            }
        };
        fetchWeights();
    }, [userId]);
    
    

    if (weights.length === 0) {
        return <Text style={styles.message}>No hay datos de peso todavía.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Progreso de Peso</Text>
            <LineChart
                data={{
                    labels,
                    datasets: [{ data: weights }],
                }}
                width={screenWidth - 40}
                height={220}
                yAxisSuffix="kg"
                chartConfig={{
                    backgroundGradientFrom: colors.background,
                    backgroundGradientTo: colors.background,
                    decimalPlaces: 1,
                    color: () => colors.primary,
                    labelColor: () => colors.text,
                    propsForDots: {
                        r: '4',
                        strokeWidth: '2',
                        stroke: colors.primary,
                    },
                }}
                bezier
                style={styles.chart}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: spacing.medium,
        padding: spacing.medium,
        backgroundColor: '#fff',
        borderRadius: 12,
        elevation: 3,
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
        marginTop: 20,
        fontFamily: fonts.body,
        color: colors.text,
    },
});

export default WeightChart;
