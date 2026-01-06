import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, Heart, ArrowRight, Loader, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PortalLogin = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSignUp, setIsSignUp] = useState(false);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            full_name: fullName
                        }
                    }
                });
                if (error) throw error;
                setError('Check your email to confirm your account!');
                setTimeout(() => setIsSignUp(false), 3000);
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/portal');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/hero-1.jpg')` }}
            />
            <div className="absolute inset-0 z-0 bg-brand-dark/70 backdrop-blur-sm" />

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md mx-4 p-8 md:p-10 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-xl"
            >
                <div className="text-center mb-8">
                    <motion.div
                        key={isSignUp ? 'signup-icon' : 'login-icon'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 border border-white/20 shadow-inner ${isSignUp ? 'bg-brand-pink text-white shadow-brand-pink/40' : 'bg-white/10 text-brand-pink'}`}
                    >
                        {isSignUp ? <Heart size={28} className="fill-current" /> : <Lock size={28} />}
                    </motion.div>

                    <motion.h1
                        layout
                        className="text-3xl font-serif font-bold text-white mb-2"
                    >
                        {isSignUp ? 'Join the Team' : 'Welcome Back'}
                    </motion.h1>
                    <motion.p
                        layout
                        className="text-brand-ivory/70 font-light"
                    >
                        {isSignUp ? 'Create your profile to get started' : 'Enter your credentials to access the portal'}
                    </motion.p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-xl text-sm text-center border ${error.includes('Check')
                                ? 'bg-green-500/20 border-green-500/30 text-green-100'
                                : 'bg-red-500/20 border-red-500/30 text-red-100'
                            }`}
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleAuth} className="space-y-4">
                    <AnimatePresence>
                        {isSignUp && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="space-y-2 mb-4">
                                    <label className="text-sm font-medium text-brand-ivory/80 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                                        <input
                                            type="text"
                                            required={isSignUp}
                                            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink/50 transition-all font-light"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Winni Debz"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-ivory/80 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink/50 transition-all font-light"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@brandedbywinni.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label className="text-sm font-medium text-brand-ivory/80">Password</label>
                            {!isSignUp && (
                                <button
                                    type="button"
                                    onClick={() => navigate('/portal/forgot-password')}
                                    className="text-xs text-brand-pink hover:text-brand-pink/80 transition-colors"
                                >
                                    Forgot Password?
                                </button>
                            )}
                        </div>
                        <input
                            type="password"
                            required
                            className="w-full px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink/50 transition-all font-light"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <motion.button
                        layout
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white py-4 rounded-xl font-medium transition-all shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2 group mt-6"
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <span>{isSignUp ? 'Create Account' : 'Sign In to Portal'}</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-brand-ivory/60">
                        {isSignUp ? 'Already have an account?' : 'New team member?'}
                    </p>
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
                        className="text-white hover:text-brand-pink font-medium mt-1 transition-colors border-b border-white/20 pb-0.5 hover:border-brand-pink"
                    >
                        {isSignUp ? 'Log in with existing account' : 'Register for access'}
                    </button>
                </div>
            </motion.div>

            <div className="absolute bottom-6 text-center w-full text-xs text-white/30">
                © {new Date().getFullYear()} Branded By Winni Internal Portal
            </div>
        </div>
    );
};

export default PortalLogin;
