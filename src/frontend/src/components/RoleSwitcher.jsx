// src/components/RoleSwitcher.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const RoleSwitcher = () => {
    const { currentUser, switchRole } = useAuth();
    
    if (!currentUser) return null;

    const roles = [
        { id: 'senior', label: 'Senior', icon: 'ph-user-circle' },
        { id: 'doctor', label: 'Doctor', icon: 'ph-stethoscope' },
        { id: 'caretaker', label: 'Caretaker', icon: 'ph-heart' }
    ];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-2 flex items-center gap-1 scale-90 md:scale-100 hover:scale-105 transition-all duration-500 ring-1 ring-black/5">
            <div className="flex items-center px-3 py-1 mr-2 border-r border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Switch View</span>
            </div>
            {roles.map((role) => (
                <button
                    key={role.id}
                    onClick={() => switchRole(role.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                        currentUser.role === role.id
                            ? 'bg-blue-900 text-white shadow-lg shadow-blue-900/20'
                            : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    <i className={`ph-bold ${role.icon} text-lg`}></i>
                    <span className="hidden sm:inline">{role.label}</span>
                </button>
            ))}
        </div>
    );
};

export default RoleSwitcher;
