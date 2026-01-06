import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            navigate('/admin');
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/hero-1.jpg')` }}
            />
            <div className="absolute inset-0 z-0 bg-brand-dark/60 backdrop-blur-sm" />

            {/* Glass Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md mx-4 p-8 md:p-10 rounded-3xl bg-white/10 border border-white/20 shadow-2xl backdrop-blur-md"
            >
                <div className="text-center mb-10">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-pink/20 mb-6 border border-brand-pink/30 text-brand-pink"
                    >
                        <Lock size={28} />
                    </motion.div>
                    <h1 className="text-3xl font-serif font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-brand-ivory/70 font-light">Enter your credentials to access the portal</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-200 rounded-xl text-sm text-center"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-ivory/80 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink/50 transition-all font-light"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@brandedbywinni.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-ivory/80 ml-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-brand-pink/50 focus:border-brand-pink/50 transition-all font-light"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white py-4 rounded-xl font-medium transition-all shadow-lg shadow-brand-pink/20 flex items-center justify-center gap-2 group mt-2"
                    >
                        {loading ? (
                            <>
                                <Loader className="animate-spin" size={20} />
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            <>
                                <span>Sign In to Portal</span>
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </motion.button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-brand-ivory/40">© {new Date().getFullYear()} Branded By Winni. Secure Reference.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
