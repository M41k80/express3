import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { colors, fonts, spacing } from '../styles/theme';

const RegisterMealScreen = () => {
    const { userId } = useAuth();
    const [mealType, setMealType] = useState('Desayuno');
    const [foods, setFoods] = useState('');
    const [water, setWater] = useState('');

    const handleSubmit = async () => {
        if (!userId) {
            Alert.alert('Error', 'Usuario no autenticado');
            return;
        }

        try {
            const today = new Date().toISOString().split('T')[0];

            await api.post('/meals/meals/log', {
                user_id: userId,
                date: today,
                meal_type: mealType,
                foods: foods,
                water: water,
            });

            Alert.alert('Éxito', 'Comida registrada');
            setFoods('');
        } catch (err) {
            console.error('ERROR REGISTRO:', err);
            Alert.alert('Error', 'No se pudo registrar la comida');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Tipo de comida</Text>
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={mealType}
                    onValueChange={setMealType}
                    style={styles.picker}
                >
                    <Picker.Item label="Desayuno" value="Desayuno" />
                    <Picker.Item label="Almuerzo" value="Almuerzo" />
                    <Picker.Item label="Comida" value="Comida" />
                    <Picker.Item label="Cena" value="Cena" />
                    <Picker.Item label="Snack" value="Snack" />
                </Picker>
            </View>


            <Text style={styles.label}>Alimentos consumidos</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. 2 huevos, 1 tostada, 1 vaso de jugo"
                value={foods}
                onChangeText={setFoods}
                multiline
            />
            <View style={styles.waterContainer}>
                <Text style={styles.label}>Agua (250ml)</Text>
                <View style={styles.stepper}>
                    <Text style={styles.stepperButton} onPress={() => setWater(prev => String(Math.max(0, Number(prev) - 1)))}>−</Text>
                    <Text style={styles.waterValue}>{water} vasos</Text>
                    <Text style={styles.stepperButton} onPress={() => setWater(prev => String(Math.min(100, Number(prev) + 1)))}>+</Text>
                </View>
            </View>

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
        padding: 50,
        paddingBottom: 50,

    },
    label: {
        fontSize: 16,
        fontFamily: fonts.body,
        marginBottom: spacing.small,
        color: colors.text,
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 6,
        marginBottom: 220,
    },
    picker: {
        height: 50,
        fontFamily: fonts.body,
    },
    input: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: spacing.large,
        height: 100,
        textAlignVertical: 'top',
        fontFamily: fonts.body,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: spacing.medium,
    },
    waterContainer: {
        marginTop: 16,
    },
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    stepperButton: {
        fontSize: 24,
        color: colors.primary,
        paddingHorizontal: 12,
    },
    waterValue: {
        fontSize: 18,
        fontFamily: fonts.body,
        color: colors.text,
    },

});

export default RegisterMealScreen;
