// src/components/admin/AdminLayout.tsx
import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Upload, LogOut, LayoutDashboard } from 'lucide-react';
import ImageUploadForm from './ImageUploadForm'; // The upload component
import { supabase } from '../../db/SupabaseClient';

const Sidebar: React.FC = () => {
    const location = useLocation();
    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
        { name: 'Upload Images', path: '/admin/upload', icon: Upload },
        // Add more routes for managing projects, clients, etc.
    ];

    const handleLogout = async () => {
        await supabase.auth.signOut();
        // The ProtectedRoute logic in App.tsx will handle the redirect
    };

    return (
        <div className="w-64 bg-gray-900 min-h-screen p-4 flex flex-col justify-between">
            <div>
                <h1 className="text-3xl font-bold text-amber-500 mb-8">Admin Panel</h1>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center p-3 rounded-lg transition-colors text-white ${
                                location.pathname === item.path ? 'bg-amber-500 text-black font-semibold' : 'hover:bg-gray-700'
                            }`}
                        >
                            <item.icon size={20} className="mr-3" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <button 
                onClick={handleLogout}
                className="flex items-center p-3 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
                <LogOut size={20} className="mr-3" />
                Log Out
            </button>
        </div>
    );
};

// Placeholder for the main Dashboard content
const AdminDashboard: React.FC = () => (
    <div className="text-white p-8">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h2>
        <p className="text-gray-400">Manage your portfolio, clients, and settings here.</p>
    </div>
);


const AdminLayout: React.FC = () => {
    return (
        <div className="flex bg-gray-800">
            <Sidebar />
            <div className="flex-1 p-8">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/upload" element={<ImageUploadForm />} />
                    {/* Add more admin routes here */}
                    <Route path="*" element={<div className="text-red-400 p-8">404 Admin Page Not Found</div>} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminLayout;