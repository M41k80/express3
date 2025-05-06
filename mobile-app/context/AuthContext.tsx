import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
    userId: string | null;
    token: string | null;
    login: (userId: string, token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
    userId: null,
    token: null,
    login: () => { },
    logout: () => { },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [userId, setUserId] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = (id: string, token: string) => {
        setUserId(id);
        setToken(token);
    };

    const logout = () => {
        setUserId(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ userId, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
