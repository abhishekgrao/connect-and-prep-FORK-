import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockBackend } from '../services/mockBackend';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage for persisted session
        try {
            const storedUser = localStorage.getItem('cp_user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from local storage", error);
            localStorage.removeItem('cp_user'); // Clean up invalid data
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email, password, type) => {
        try {
            const { user } = await mockBackend.login(email, password, type);
            setUser(user);
            localStorage.setItem('cp_user', JSON.stringify(user));
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cp_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
