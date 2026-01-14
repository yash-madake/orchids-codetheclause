// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import RoleBasedLogin from './components/RoleBasedLogin';
import SeniorDashboard from './components/SeniorDashboard';
import DoctorDashboard from './components/DoctorDashboard';
import CaretakerDashboard from './components/CaretakerDashboard';

import RoleSwitcher from './components/RoleSwitcher';

// Protected Route Component (Simplified to just handle loading)
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { currentUser, loading } = useAuth();
    
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-900 mx-auto mb-4"></div>
                    <p className="text-slate-600 font-semibold">Loading...</p>
                </div>
            </div>
        );
    }
    
    // No more redirect to login, just render children if we have a user
    // The AuthContext now provides a default user
    return (
        <>
            {children}
            <RoleSwitcher />
        </>
    );
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route 
                        path="/senior-dashboard" 
                        element={
                            <ProtectedRoute allowedRoles={['senior']}>
                                <SeniorDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route 
                        path="/doctor-dashboard" 
                        element={
                            <ProtectedRoute allowedRoles={['doctor']}>
                                <DoctorDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    
                    <Route 
                        path="/caretaker-dashboard" 
                        element={
                            <ProtectedRoute allowedRoles={['caretaker']}>
                                <CaretakerDashboard />
                            </ProtectedRoute>
                        } 
                    />
                    
                    {/* Default to Senior Dashboard */}
                    <Route path="/" element={<Navigate to="/senior-dashboard" replace />} />
                    <Route path="*" element={<Navigate to="/senior-dashboard" replace />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
