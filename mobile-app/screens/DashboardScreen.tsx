import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import DashboardCharts from '../components/DashboardCharts';
import WorkoutHistory from '../components/WorkoutHistory';
import MealHistory from '../components/MealHistory';
import Suggestions from '../components/Suggestions';
import { spacing, fonts, colors } from '../styles/theme';

const DashboardScreen = () => {
    const sections = [
        { key: 'DashboardCharts', component: <DashboardCharts /> },
        { key: 'workoutHistory', component: <WorkoutHistory /> },
        { key: 'mealHistory', component: <MealHistory /> },
        { key: 'suggestions', component: <Suggestions /> },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tu Dashboard</Text>
            <FlatList
                data={sections}
                renderItem={({ item }) => <View style={styles.card}>{item.component}</View>}
                keyExtractor={(item) => item.key}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: spacing.medium,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.bold,
        marginBottom: spacing.medium,
        color: colors.text,
    },
    card: {
        marginBottom: spacing.large,
    },
});

export default DashboardScreen;
