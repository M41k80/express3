import React from 'react';
import { View, Text, Button, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing } from '../styles/theme';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { logout } = useAuth();

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
            <Text style={styles.title}>Bienvenido a BalanceIA</Text>
            
            <View style={styles.logo}>
                <Text style={styles.logoText}></Text>
                <Image
                    source={require('../assets/healthmodel.png')}
                    style={{ width: 200, height: 200, marginLeft: 50 }}
                />

            </View>

            <View style={styles.button}>
                <Button
                    title="Registrar Entrenamiento"
                    onPress={() => navigation.navigate('RegisterWorkout' as never)}
                    color={colors.primary}
                />
            </View>

            <View style={styles.button}>
                <Button
                    title="Registrar Comida"
                    onPress={() => navigation.navigate('RegisterMeal' as never)}
                    color={colors.primary}
                />
            </View>
            <View style={styles.button}>
                <Button
                    title="Dashboard"
                    onPress={() => navigation.navigate('Dashboard' as never)}
                    color={colors.primary}
                />
            </View>

            <View style={styles.button}>
                <Button
                    title="Cerrar sesión"
                    color="#d00"
                    onPress={handleLogout}
                />
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
});

export default HomeScreen;
