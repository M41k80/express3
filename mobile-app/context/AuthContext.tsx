import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    userId: string | null;
    token: string | null;
    username: string | null;
    login: (userId: string, token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    userId: null,
    token: null,
    username: null,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    const login = (id: string, token: string) => {
        setUserId(id);
        setToken(token);
        setUsername(null);
    };

    const logout = () => {
        setUserId(null);
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ userId, token, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
