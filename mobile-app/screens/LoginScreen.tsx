import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { colors, fonts, spacing } from '../styles/theme';



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
                <Text style={styles.logoText1}>Balance</Text><Text style={styles.logoText}>IA</Text>
                <Image
                    source={require('../assets/Logo.png')}
                    style={{ width: 200, height: 200 , tintColor: colors.primary}}
                />
            </View>


            <Text style={styles.title}>Iniciar sesión</Text>

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
            <View style={styles.button}>
                <Button title="Entrar" onPress={handleLogin} color={colors.primary} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacing.large,
        justifyContent: 'center',
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
    },
    button: {
        marginTop: spacing.large,
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
});

export default LoginScreen;
