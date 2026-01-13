// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Load user from session storage on mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem('currentUser');
        if (storedUser) {
            setCurrentUser(JSON.parse(storedUser));
        } else {
            // Default to senior role if no user is found (bypassing login)
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const defaultUser = users.find(u => u.role === 'senior');
            if (defaultUser) {
                setCurrentUser(defaultUser);
                sessionStorage.setItem('currentUser', JSON.stringify(defaultUser));
            }
        }
        setLoading(false);
    }, []);

    const switchRole = (roleName) => {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.role === roleName);
        if (user) {
            const userWithSenior = { ...user };
            if (roleName !== 'senior') {
                userWithSenior.selectedSeniorId = 'SEN001';
                sessionStorage.setItem('selectedSeniorId', 'SEN001');
            }
            setCurrentUser(userWithSenior);
            sessionStorage.setItem('currentUser', JSON.stringify(userWithSenior));
            
            // Route based on role
            switch (roleName) {
                case 'senior':
                    navigate('/senior-dashboard');
                    break;
                case 'doctor':
                    navigate('/doctor-dashboard');
                    break;
                case 'caretaker':
                    navigate('/caretaker-dashboard');
                    break;
                default:
                    navigate('/');
            }
        }
    };

    const login = (user) => {
        setCurrentUser(user);
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        
        // Route based on role
        switch (user.role) {
            case 'senior':
                navigate('/senior-dashboard');
                break;
            case 'doctor':
                navigate('/doctor-dashboard');
                break;
            case 'caretaker':
                navigate('/caretaker-dashboard');
                break;
            default:
                navigate('/');
        }
    };

    const logout = () => {
        // Instead of logging out, we can just switch back to senior
        switchRole('senior');
    };

    const value = {
        currentUser,
        login,
        logout,
        switchRole,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
