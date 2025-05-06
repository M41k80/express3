import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { colors, fonts, spacing } from '../styles/theme';

const RegisterWorkoutScreen = () => {
    const { userId } = useAuth();
    const [exercise, setExercise] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = async () => {
        if (!userId) {
            Alert.alert('Error', 'Usuario no autenticado');
            return;
        }

        try {
            const today = new Date().toISOString().split('T')[0];

            await api.post('/workout/log', {
                user_id: userId,
                date: today,
                exercise_name: exercise,
                sets: parseInt(sets),
                reps: parseInt(reps),
                weight_kg: parseFloat(weight),
            });

            Alert.alert('Éxito', 'Entrenamiento registrado');
            setExercise('');
            setSets('');
            setReps('');
            setWeight('');
        } catch (err) {
            console.error('ERROR REGISTRO:', err);
            Alert.alert('Error', 'No se pudo registrar el entrenamiento');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ejercicio</Text>
            <TextInput
                placeholder="Ej. Sentadillas"
                style={styles.input}
                onChangeText={setExercise}
                value={exercise}
            />

            <Text style={styles.label}>Series</Text>
            <TextInput
                placeholder="Ej. 3"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={setSets}
                value={sets}
            />

            <Text style={styles.label}>Repeticiones</Text>
            <TextInput
                placeholder="Ej. 12"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={setReps}
                value={reps}
            />

            <Text style={styles.label}>Peso (kg)</Text>
            <TextInput
                placeholder="Ej. 50"
                keyboardType="numeric"
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
            />

            <View style={styles.button}>
                <Button title="Guardar" onPress={handleSubmit} color={colors.primary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.large,
    },
    label: {
        fontSize: 16,
        fontFamily: fonts.body,
        marginBottom: spacing.small,
        color: colors.text,
    },
    input: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: spacing.medium,
        fontFamily: fonts.body,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: spacing.medium,
    },
});

export default RegisterWorkoutScreen;
