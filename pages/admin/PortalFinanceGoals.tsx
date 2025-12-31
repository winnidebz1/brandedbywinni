import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import { Target, Lock, Calendar, DollarSign, Save, AlertTriangle } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useNavigate } from 'react-router-dom';

const PortalFinanceGoals = () => {
    const { profile, isAdmin } = useProfile(); // isAdmin here means Founder
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [activeGoal, setActiveGoal] = useState<any>(null);
    const [history, setHistory] = useState<any[]>([]);

    // Form State
    const [formData, setFormData] = useState({
        start_date: '',
        revenue_target: '',
        profit_target: '',
        savings_target: '',
        tax_target: '',
        founder_pay_target: ''
    });

    const isAccountant = profile?.role === 'accountant';
    const canEdit = isAdmin && (!activeGoal || !activeGoal.is_locked);

    useEffect(() => {
        fetchGoals();
    }, []);

    const fetchGoals = async () => {
        try {
            // Fetch Active Goal
            const { data: active } = await supabase
                .from('finance_goals')
                .select('*')
                .eq('is_active', true)
                .single();

            if (active) {
                setActiveGoal(active);
                setFormData({
                    start_date: active.start_date,
                    revenue_target: active.revenue_target,
                    profit_target: active.profit_target,
                    savings_target: active.savings_target,
                    tax_target: active.tax_target,
                    founder_pay_target: active.founder_pay_target
                });
            }

            // Fetch History
            const { data: past } = await supabase
                .from('finance_goals')
                .select('*')
                .eq('is_active', false)
                .order('start_date', { ascending: false });

            setHistory(past || []);
        } catch (error) {
            console.error('Error fetching goals:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdmin) return;

        // Calculate end date (12 weeks from start)
        const start = new Date(formData.start_date);
        const end = new Date(start);
        end.setDate(start.getDate() + (12 * 7));

        try {
            const { error } = await supabase.from('finance_goals').insert({
                start_date: formData.start_date,
                end_date: end.toISOString().split('T')[0],
                revenue_target: parseFloat(formData.revenue_target),
                profit_target: parseFloat(formData.profit_target),
                savings_target: parseFloat(formData.savings_target),
                tax_target: parseFloat(formData.tax_target),
                founder_pay_target: parseFloat(formData.founder_pay_target),
                is_active: true,
                is_locked: true // Lock immediately upon creation for discipline? Or allow manual lock? User said "Locked once the 12-week cycle starts". Let's lock it.
            });

            if (error) throw error;
            fetchGoals();
        } catch (error: any) {
            alert('Error creating goal: ' + error.message);
        }
    };

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('en-GH', { style: 'currency', currency: 'GHS' }).format(val);
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="space-y-8 animate-fadeIn max-w-5xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-brand-muted mb-[-20px]">
                <button onClick={() => navigate('/portal/finance')} className="hover:text-brand-pink">Finance</button>
                <span>/</span>
                <span>Goals</span>
            </div>

            <PageHeader
                title="12-Week Financial Goals"
                subtitle="Set clear targets. Execute with discipline."
                action={activeGoal && isAdmin && (
                    <Badge variant="pink" className="flex items-center gap-1">
                        <Lock size={12} /> Cycle Locked
                    </Badge>
                )}
            />

            {/* Active Goal Config */}
            {!activeGoal ? (
                isAdmin ? (
                    <Card className="border-t-4 border-brand-pink">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2 bg-brand-pink/10 rounded-lg text-brand-pink">
                                <Target size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-brand-dark">Start New 12-Week Cycle</h3>
                                <p className="text-sm text-brand-muted">Define your targets. These will be locked for execution.</p>
                            </div>
                        </div>

                        <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-brand-muted mb-1">Cycle Start Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                    value={formData.start_date}
                                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                                />
                                <p className="text-xs text-brand-muted mt-1">End date will be calculated automatically (12 weeks).</p>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Revenue Target (₵)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                    placeholder="0.00"
                                    value={formData.revenue_target}
                                    onChange={(e) => setFormData({ ...formData, revenue_target: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Profit Target (₵)</label>
                                <input
                                    type="number"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                    placeholder="0.00"
                                    value={formData.profit_target}
                                    onChange={(e) => setFormData({ ...formData, profit_target: e.target.value })}
                                />
                            </div>

                            <div className="space-y-4 md:col-span-2 border-t border-dashed pt-4">
                                <h4 className="font-bold text-brand-dark">Allocations</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-brand-muted mb-1">Savings (₵)</label>
                                        <input
                                            type="number"
                                            required
                                            className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                            value={formData.savings_target}
                                            onChange={(e) => setFormData({ ...formData, savings_target: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-muted mb-1">Tax Provision (₵)</label>
                                        <input
                                            type="number"
                                            required
                                            className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                            value={formData.tax_target}
                                            onChange={(e) => setFormData({ ...formData, tax_target: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-brand-muted mb-1">Founder Pay (₵)</label>
                                        <input
                                            type="number"
                                            required
                                            className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                            value={formData.founder_pay_target}
                                            onChange={(e) => setFormData({ ...formData, founder_pay_target: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="md:col-span-2 bg-yellow-50 p-4 rounded-xl flex items-start space-x-3">
                                <AlertTriangle className="text-yellow-600 shrink-0" size={20} />
                                <p className="text-sm text-yellow-800">
                                    <strong>Warning:</strong> Once started, this cycle will be <strong>LOCKED</strong>.
                                    Discipline is Key. You cannot edit targets mid-execution.
                                </p>
                            </div>

                            <div className="md:col-span-2">
                                <Button type="submit" className="w-full py-4 text-lg">
                                    <Lock size={18} className="mr-2" /> Commit & Lock Goals
                                </Button>
                            </div>
                        </form>
                    </Card>
                ) : (
                    <div className="text-center p-12 bg-white rounded-xl border border-dashed">
                        No active 12-Week Year cycle. Founder must initialize.
                    </div>
                )
            ) : (
                <div className="space-y-6">
                    {/* Active Goal Display */}
                    <Card className="bg-brand-dark text-white border-none relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <div>
                                <h2 className="text-2xl font-bold font-serif mb-1">Current Cycle Active</h2>
                                <p className="opacity-80 flex items-center gap-2">
                                    <Calendar size={14} />
                                    {new Date(activeGoal.start_date).toLocaleDateString()} — {new Date(activeGoal.end_date).toLocaleDateString()}
                                </p>
                            </div>
                            <Badge className="bg-green-500 text-white border-none flex items-center gap-1">
                                <Target size={12} /> Execution Mode
                            </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8 relative z-10">
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Revenue Goal</p>
                                <p className="text-3xl font-bold text-green-400">{formatCurrency(activeGoal.revenue_target)}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Profit Goal</p>
                                <p className="text-3xl font-bold">{formatCurrency(activeGoal.profit_target)}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Founder Pay</p>
                                <p className="text-2xl font-bold">{formatCurrency(activeGoal.founder_pay_target)}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Tax Provision</p>
                                <p className="text-2xl font-bold">{formatCurrency(activeGoal.tax_target)}</p>
                            </div>
                        </div>
                    </Card>

                    {/* Progress (Placeholder for now, logic to be connected to income later) */}
                    <Card>
                        <h3 className="font-bold text-brand-dark mb-4">Execution Progress</h3>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span>Time Elapsed</span>
                                    <span>Week X of 12</span>
                                </div>
                                <div className="h-2 bg-brand-muted/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-brand-pink" style={{ width: '25%' }}></div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default PortalFinanceGoals;
