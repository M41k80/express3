'use client';
import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name?: string;
    role?: string;
}

interface AuthContextProps {
    token: string | null;
    userId: string | null;
    userName: string | null;
    login: (args: { token: string; user: User }) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
    token: null,
    userId: null,
    userName: null,
    login: () => {},
    logout: () => {},
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
        setUserId(localStorage.getItem('user_id'));
        setUserName(localStorage.getItem('user_name'));
    }, []);

    const login = ({ token, user }: { token: string; user: User }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user.id);
        localStorage.setItem('user_name', user.name || '');
        setToken(token);
        setUserId(user.id);
        setUserName(user.name || '');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        setToken(null);
        setUserId(null);
        setUserName(null);
    };

    return (
        <AuthContext.Provider value={{ token, userId, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
