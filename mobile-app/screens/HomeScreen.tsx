import React from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing } from '../styles/theme';
import { Pressable } from 'react-native';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { logout } = useAuth();
    const { username } = useAuth();

    const handleLogout = () => {
        Alert.alert('Cerrar sesión', '¿Estás seguro de que deseas salir?', [
            { text: 'Cancelar', style: 'cancel' },
            {
                text: 'Salir',
                style: 'destructive',
                onPress: () => {
                    logout();
                    navigation.navigate('Login' as never);
                },
            },
        ]);
    };

    return (
        <View style={styles.container}>

            <View style={styles.logo}>
                <Text style={styles.logoText}></Text>
                <Image
                    source={require('../assets/home.png')}
                    style={{ width: 280, height: 280, marginLeft: 25 }}
                />

            </View>

            <View style={styles.button}>
                <Pressable style={styles.customButton} onPress={() => navigation.navigate('RegisterWorkout' as never)}>
                    <Text style={styles.customButtonText}>Registrar Entrenamiento</Text>
                </Pressable>
            </View>

            <View style={styles.button}>
                <Pressable style={styles.customButton} onPress={() => navigation.navigate('RegisterMeal' as never)}>
                <Text style={styles.customButtonText}>Registrar Comida</Text>
                </Pressable>
                
                
            </View>
            <View style={styles.button}>
                <Pressable style={styles.customButton} onPress={() => navigation.navigate('Dashboard' as never)}>
                <Text style={styles.customButtonText}>Dashboard</Text>
                </Pressable>
            </View>

            <View style={styles.button}>
                <Pressable style={styles.customButtonlogout} onPress={handleLogout}>
                    <Text style={styles.customButtonTextlogout}>Cerrar sesión</Text>
                </Pressable>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: spacing.large,
        gap: spacing.medium,
    },
    title: {
        fontSize: 26,
        fontFamily: fonts.heading,
        marginBottom: spacing.large,
        textAlign: 'center',
        color: colors.text,
    },
    button: {
        marginVertical: spacing.small,
    },
    logo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.large,
    },
    logoText: {
        fontSize: 24,
        fontFamily: fonts.heading,
        marginRight: spacing.medium,
        color: colors.text,
    },
    logoImage: {
        width: 100,
        height: 100,
    },
    customButton: {
        backgroundColor: colors.primary,
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: spacing.large,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    customButtonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.bold,
    },
    customButtonTextlogout: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.bold,
    },
    customButtonlogout: {
        backgroundColor: colors.gray,
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: spacing.large,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
});

export default HomeScreen;
