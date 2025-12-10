import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const TestConnection = () => {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const testConnection = async () => {
        setLoading(true);
        setStatus('Testing connection...');

        try {
            // Test 1: Check if Supabase client is configured
            if (!supabase) {
                setStatus('❌ Supabase client not initialized');
                return;
            }

            // Test 2: Try to fetch from a table
            const { data, error } = await supabase.from('leads').select('count');

            if (error) {
                setStatus(`❌ Database Error: ${error.message}`);
            } else {
                setStatus('✅ Connection successful! Database is working.');
            }
        } catch (err: any) {
            setStatus(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const testAuth = async () => {
        setLoading(true);
        setStatus('Testing authentication...');

        try {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                setStatus(`❌ Auth Error: ${error.message}`);
            } else if (data.session) {
                setStatus(`✅ Already logged in as: ${data.session.user.email}`);
            } else {
                setStatus('ℹ️ Not logged in. Please try logging in.');
            }
        } catch (err: any) {
            setStatus(`❌ Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Supabase Connection Test</h1>

                <div className="space-y-4">
                    <button
                        onClick={testConnection}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50"
                    >
                        {loading ? 'Testing...' : 'Test Database Connection'}
                    </button>

                    <button
                        onClick={testAuth}
                        disabled={loading}
                        className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 disabled:opacity-50"
                    >
                        {loading ? 'Testing...' : 'Test Authentication'}
                    </button>
                </div>

                {status && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                        <p className="text-sm font-mono whitespace-pre-wrap">{status}</p>
                    </div>
                )}

                <div className="mt-6 text-xs text-gray-500">
                    <p><strong>Supabase URL:</strong> {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</p>
                    <p><strong>Anon Key:</strong> {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Not set'}</p>
                </div>
            </div>
        </div>
    );
};

export default TestConnection;
