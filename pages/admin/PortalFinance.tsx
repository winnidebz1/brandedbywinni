import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import {
    PieChart, Target, DollarSign, CreditCard, FileText,
    TrendingUp, TrendingDown, AlertCircle, Plus, Calendar, Lock
} from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { Link, useNavigate } from 'react-router-dom';

const PortalFinance = () => {
    const { profile, isAdmin } = useProfile();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        revenue: 0,
        expenses: 0,
        profit: 0,
        cashOnHand: 0,
        outstandingInvoices: 0,
        goalProgress: 0
    });
    const [activeGoal, setActiveGoal] = useState<any>(null);
    const navigate = useNavigate();

    const isFinanceUser = profile?.role === 'founder' || profile?.role === 'accountant';

    useEffect(() => {
        if (!loading && !isFinanceUser) {
            navigate('/portal');
        }
    }, [isFinanceUser, loading, navigate]);

    const fetchFinanceData = async () => {
        try {
            // 1. Fetch Active Goal
            const { data: goalData } = await supabase
                .from('finance_goals')
                .select('*')
                .eq('is_active', true)
                .single();

            setActiveGoal(goalData);

            // 2. Calculate Revenue (Sum of Paid Income) in current cycle
            // For MVP, just sum all paid income if no cycle dates, or filter by dates if goal exists.
            let incomeQuery = supabase.from('finance_income').select('amount').eq('invoice_id.status', 'paid'); // This join syntax is tricky in client. 
            // Simpler: Select * from finance_income where date_received >= start_date

            // Let's stick to simple aggregates for now without complex date logic for the shell
            // Fetch everything and calc client side for small data, or use RPC in real app.

            const revenue = 150000; // Mock for initial shell
            const expenses = 45000;
            const outstanding = 12000;

            setStats({
                revenue,
                expenses,
                profit: revenue - expenses,
                cashOnHand: revenue - expenses, // Simplified
                outstandingInvoices: outstanding,
                goalProgress: goalData ? (revenue / goalData.revenue_target) * 100 : 0
            });

        } catch (error) {
            console.error('Error fetching finance data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFinanceData();
    }, []);

    if (loading) return <div className="p-8">Loading Financial Data...</div>;

    if (!isFinanceUser) return null;

    return (
        <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-brand-dark">Financial Control Room</h1>
                    <p className="text-brand-muted">The 12-Week Year Execution System</p>
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" onClick={() => navigate('/portal/finance/income')}>
                        <Plus size={16} className="mr-2" /> Record Income
                    </Button>
                    <Button onClick={() => navigate('/portal/finance/expenses')}>
                        <Plus size={16} className="mr-2" /> Add Expense
                    </Button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-brand-dark to-[#2a2a2a] text-white border-none">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <TrendingUp size={24} className="text-green-400" />
                        </div>
                        <Badge className="bg-white/20 text-white border-none">Current Cycle</Badge>
                    </div>
                    <p className="text-brand-muted text-sm mb-1">Total Revenue</p>
                    <h3 className="text-3xl font-bold font-mono">₵{stats.revenue.toLocaleString()}</h3>
                    {activeGoal && (
                        <div className="mt-4">
                            <div className="flex justify-between text-xs mb-1 opacity-80">
                                <span>Goal: ₵{activeGoal.revenue_target.toLocaleString()}</span>
                                <span>{stats.goalProgress.toFixed(1)}%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div className="h-full bg-green-400" style={{ width: `${Math.min(stats.goalProgress, 100)}%` }}></div>
                            </div>
                        </div>
                    )}
                </Card>

                <Card>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-red-50 rounded-lg">
                            <TrendingDown size={24} className="text-red-500" />
                        </div>
                    </div>
                    <p className="text-brand-muted text-sm mb-1">Total Expenses</p>
                    <h3 className="text-3xl font-bold font-mono text-brand-dark">₵{stats.expenses.toLocaleString()}</h3>
                </Card>

                <Card>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-brand-pink/10 rounded-lg">
                            <DollarSign size={24} className="text-brand-pink" />
                        </div>
                    </div>
                    <p className="text-brand-muted text-sm mb-1">Net Profit</p>
                    <h3 className="text-3xl font-bold font-mono text-brand-dark">₵{stats.profit.toLocaleString()}</h3>
                </Card>

                <Card>
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <AlertCircle size={24} className="text-yellow-600" />
                        </div>
                    </div>
                    <p className="text-brand-muted text-sm mb-1">Outstanding Invoices</p>
                    <h3 className="text-3xl font-bold font-mono text-brand-dark">₵{stats.outstandingInvoices.toLocaleString()}</h3>
                </Card>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link to="/portal/finance/goals">
                    <Card className="h-full hover:bg-white hover:shadow-lg transition-all group border-brand-pink/10 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-4 text-brand-pink">
                            <Target size={24} />
                            <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-pink transition-colors">12-Week Goals</h3>
                        </div>
                        <p className="text-sm text-brand-muted">Set revenue, profit, and savings targets. Locked during execution.</p>
                    </Card>
                </Link>

                <Link to="/portal/finance/income">
                    <Card className="h-full hover:bg-white hover:shadow-lg transition-all group border-brand-pink/10 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-4 text-green-600">
                            <DollarSign size={24} />
                            <h3 className="text-xl font-bold text-brand-dark group-hover:text-green-600 transition-colors">Income & Invoices</h3>
                        </div>
                        <p className="text-sm text-brand-muted">Track payments, manage client invoices, and monitor revenue.</p>
                    </Card>
                </Link>

                <Link to="/portal/finance/expenses">
                    <Card className="h-full hover:bg-white hover:shadow-lg transition-all group border-brand-pink/10 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-4 text-red-500">
                            <CreditCard size={24} />
                            <h3 className="text-xl font-bold text-brand-dark group-hover:text-red-500 transition-colors">Expense Tracking</h3>
                        </div>
                        <p className="text-sm text-brand-muted">Categorize spending, upload receipts, and manage approvals.</p>
                    </Card>
                </Link>

                <Link to="/portal/finance/reports">
                    <Card className="h-full hover:bg-white hover:shadow-lg transition-all group border-brand-pink/10 cursor-pointer">
                        <div className="flex items-center space-x-3 mb-4 text-blue-500">
                            <FileText size={24} />
                            <h3 className="text-xl font-bold text-brand-dark group-hover:text-blue-500 transition-colors">Financial Reports</h3>
                        </div>
                        <p className="text-sm text-brand-muted">Monthly summaries, P&L statements, and accountant files.</p>
                    </Card>
                </Link>
            </div>
        </div>
    );
};

export default PortalFinance;
