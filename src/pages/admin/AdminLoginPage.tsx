// src/components/admin/AdminLoginPage.tsx

import React, { useState, useEffect } from 'react';
import { supabase } from '../../db/SupabaseClient';
import { Navigate } from 'react-router-dom';

const AdminLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    // NEW STATE: Tracks if the initial session check is complete
    const [authChecking, setAuthChecking] = useState(true); 
    
    // NEW STATE: Stores the result of the session check
    const [session, setSession] = useState<any>(null); 
    const [message, setMessage] = useState('');

    // --- EFFECT TO CHECK INITIAL AUTH STATUS (Asynchronous) ---
    useEffect(() => {
        const checkAuth = async () => {
            // Get the session asynchronously
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);
            setAuthChecking(false); // Mark check as complete
        };
        checkAuth();
    }, []); // Runs only once on mount

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setMessage(error.message);
        } else {
            // If login succeeds, reload the page or manually update the session state
            // For simplicity here, we assume the user is logged in immediately.
            setSession(await supabase.auth.getSession().then(res => res.data.session));
        }
        setLoading(false);
    };

    // 1. Show a loading state while we wait for the asynchronous session check
    if (authChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p>Checking login status...</p>
            </div>
        );
    }
    
    // 2. If session is found (not null), redirect to the dashboard
    if (session) {
        return <Navigate to="/admin" replace />;
    }

    // 3. Otherwise, render the login form
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-white">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-600 transition duration-150"
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                {message && <p className="text-red-400 text-sm mt-4 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default AdminLoginPage;