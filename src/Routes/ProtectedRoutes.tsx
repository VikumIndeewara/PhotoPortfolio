// src/routes/ProtectedRoute.tsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../db/SupabaseClient';
import AdminLayout from '../pages/admin/AdminLayout';

const ProtectedRoute: React.FC = () => {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initial check for session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for authentication state changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        // Cleanup the listener on component unmount
        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        // Simple loading screen while checking auth status
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p>Checking authentication status...</p>
            </div>
        );
    }

    if (!session) {
        // If no session, redirect to the login page
        return <Navigate to="/admin/login" replace />;
    }

    // If authenticated, render the Admin Layout with its nested routes
    return <AdminLayout />;
};

export default ProtectedRoute;