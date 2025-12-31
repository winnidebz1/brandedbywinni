import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';
import { Card, Button } from '../../components/portal/UI';

const PortalForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'error' | 'success', message: string } | null>(null);
    const navigate = useNavigate();

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            // Note: Update site_url in Supabase to point to production
            // Ensure Supabase Auth redirect URL includes /portal/update-password
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/portal/update-password`,
            });

            if (error) throw error;

            setStatus({
                type: 'success',
                message: 'Check your email for the password reset link.'
            });
        } catch (error: any) {
            setStatus({
                type: 'error',
                message: error.message
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-ivory flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <Link to="/portal/login" className="flex items-center text-brand-muted hover:text-brand-dark mb-4 text-sm font-medium">
                    <ArrowLeft size={16} className="mr-1" /> Back to Login
                </Link>

                <Card className="p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex p-3 bg-brand-ivory text-brand-pink rounded-xl mb-4">
                            <Mail size={32} />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-brand-dark">Reset Password</h1>
                        <p className="text-brand-muted mt-2 text-sm">
                            Enter your email and we'll send you instructions to reset your password.
                        </p>
                    </div>

                    {status && (
                        <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleReset} className="space-y-6">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">Email Address</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 bg-white focus:outline-none focus:ring-2 focus:ring-brand-pink transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@brandedbywinni.com"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full py-3">
                            {loading ? 'Sending Link...' : 'Send Reset Link'}
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default PortalForgotPassword;
