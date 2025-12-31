import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Check } from 'lucide-react';
import { Card, Button } from '../../components/portal/UI';

const PortalUpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    // In a real app, users arrive here via an email magic link that contains an access_token.
    // Supabase client automatically handles the session exchange if the URL fragment is present.
    // However, we should verify we have a session.

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session) {
                // If they just navigated here manually without a reset link, they might be logged out.
                // But for reset password flow, the link usually signs them in automatically.
                // If not, we might want to show an error.
                // For now, let's assume valid link.
            }
        });
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password
            });

            if (error) throw error;

            setSuccess(true);
            setTimeout(() => {
                navigate('/portal');
            }, 2000);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4">
                <Card className="p-12 text-center max-w-md w-full">
                    <div className="inline-flex p-4 bg-green-100 text-green-600 rounded-full mb-6">
                        <Check size={40} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-2">Password Updated!</h2>
                    <p className="text-brand-muted">Redirecting to portal...</p>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Card className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-brand-ivory text-brand-pink rounded-xl mb-4">
                            <Lock size={32} />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-brand-dark">Set New Password</h1>
                        <p className="text-brand-muted mt-2 text-sm">
                            Please enter your new password below.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-600">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">New Password</label>
                            <input
                                type="password"
                                required
                                minLength={6}
                                className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full py-3">
                            {loading ? 'Updating...' : 'Update Password'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default PortalUpdatePassword;
