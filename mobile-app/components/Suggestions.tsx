import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { colors, spacing, fonts } from '../styles/theme';

const Suggestions = () => {
    const { userId } = useAuth();
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchSuggestion = async () => {
        if (!userId) return;
        setLoading(true);
        try {
            const res = await api.get('suggestions/suggestions/update', {
                params: { user_id: userId },
            });
            setSuggestion(res.data?.suggestion || "No hay sugerencias aún.");
        } catch (err) {
            console.error('Error al obtener sugerencias:', err);
            setSuggestion("Error al obtener sugerencias.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sugerencias Personalizadas</Text>

            <TouchableOpacity onPress={fetchSuggestion} style={styles.button}>
                <Text style={styles.buttonText}>Obtener Sugerencias</Text>
            </TouchableOpacity>

            {loading ? (
                <ActivityIndicator style={{ marginTop: spacing.small }} size="small" color={colors.primary} />
            ) : suggestion ? (
                <Text style={styles.text}>{suggestion}</Text>
            ) : null}
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
    button: {
        backgroundColor: colors.primary,
        padding: spacing.medium,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: spacing.small,
    },
    buttonText: {
        color: '#fff',
        fontFamily: fonts.bold,
        fontSize: 16,
    },
    text: {
        fontFamily: fonts.body,
        color: colors.text,
        marginTop: spacing.small,
    },
});

export default Suggestions;