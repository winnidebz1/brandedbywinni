import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Heart } from 'lucide-react';

const PortalLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSignUp, setIsSignUp] = useState(false); // Quick toggle
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (isSignUp) {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) {
                setError(error.message);
            } else {
                setError('Check your email to confirm your account!');
                // Wait a bit or let them switch to login
                setTimeout(() => setIsSignUp(false), 3000);
            }
        } else {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
            } else {
                navigate('/portal');
            }
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-brand-softBlush flex items-center justify-center p-4 relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primaryPink/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-deepPlum/10 rounded-full blur-3xl -z-0"></div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-brand-primaryPink/20 z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex p-4 bg-brand-primaryPink text-white rounded-2xl mb-4 shadow-lg shadow-brand-primaryPink/30">
                        {isSignUp ? <Heart className="w-8 h-8 animate-pulse" /> : <Lock className="w-8 h-8" />}
                    </div>
                    <h1 className="text-3xl font-bold text-brand-deepPlum font-serif">
                        {isSignUp ? 'Join the Team' : 'Welcome Back'}
                    </h1>
                    <p className="text-brand-muted mt-2">
                        {isSignUp ? 'Create your profile to get started.' : 'Sign in to access the portal.'}
                    </p>
                </div>

                {error && (
                    <div className={`mb-6 p-4 rounded-xl text-sm font-medium ${error.includes('Check') ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}`}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleAuth} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">Email</label>
                        <input
                            type="email"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-softGray bg-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primaryPink focus:border-transparent transition-all"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@brandedbywinni.com"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-brand-softGray bg-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primaryPink focus:border-transparent transition-all"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-primaryPink text-white py-3.5 rounded-xl font-bold text-lg hover:bg-brand-primaryPink/90 hover:shadow-xl hover:shadow-brand-primaryPink/20 transition-all disabled:opacity-50 transform hover:-translate-y-0.5"
                    >
                        {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
                    </button>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                            className="text-sm text-brand-muted hover:text-brand-primaryPink font-medium underline decoration-dashed underline-offset-4"
                        >
                            {isSignUp ? 'Already have an account? Log In' : 'New here? Create an Account'}
                        </button>
                    </div>
                </form>
            </div>

            <div className="absolute bottom-6 text-center w-full text-xs text-brand-muted/50">
                © Branded By Winni Internal Portal
            </div>
        </div>
    );
};

export default PortalLogin;
