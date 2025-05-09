import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing } from '../styles/theme';
import { Pressable } from 'react-native';



const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            const res = await axios.post('https://intelligent-delight-production.up.railway.app/auth/login', {
                email,
                password,
            });

            const { user, accessToken } = res.data;

            if (!user?.id || !accessToken) {
                throw new Error('Credenciales inválidas');
            }

            login(user.id, accessToken);
            Alert.alert('Éxito', 'Sesión iniciada correctamente');
        } catch (err: any) {
            if (axios.isAxiosError(err)) {
                console.log('AXIOS ERROR:', err.response?.data || err.message);
            } else {
                console.log('GENERIC ERROR:', err);
            }
            Alert.alert('Error', 'Credenciales incorrectas o servidor caído.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image
                    source={require('../assets/login.png')}
                    style={{ width: 280, height: 350 }}
                />
            </View>
            <View style={styles.spacing}>

            </View>
            <TextInput
                placeholder="Correo"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
                placeholderTextColor={colors.gray}
            />
            <TextInput
                placeholder="Contraseña"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor={colors.gray}
            />


            <Pressable style={styles.customButton} onPress={handleLogin}>
                <Text style={styles.customButtonText}>Iniciar Sesión</Text>
            </Pressable>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        padding: spacing.large,
        justifyContent: 'center',
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontFamily: fonts.heading,
        marginBottom: spacing.large,
        textAlign: 'center',
        color: colors.text,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: colors.gray,
        marginBottom: spacing.medium,
        paddingVertical: spacing.small,
        fontFamily: fonts.body,
        color: colors.text,
        borderRadius: 20,
    },
    button: {
        marginTop: spacing.large,
        marginBottom: spacing.large,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: colors.primary,
    },
    logo: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: spacing.large,
    },
    logoText: {
        fontSize: 24,
        fontFamily: fonts.heading,
        marginRight: spacing.medium,
        color: colors.text,
    },
    logoText1: {
        fontSize: 24,
        fontFamily: fonts.heading,
        marginRight: spacing.medium,
        color: colors.primary,
    },
    logoImage: {
        width: 100,
        height: 100,
        color: colors.danger,

    },
    spacing: {
        marginBottom: spacing.large,
        flex: 0.3,
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

});

export default LoginScreen;
