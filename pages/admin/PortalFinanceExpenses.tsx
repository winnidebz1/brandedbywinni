import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import { CreditCard, Plus, Tag, Check, CheckCircle, FileText, Upload } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useNavigate } from 'react-router-dom';

const PortalFinanceExpenses = () => {
    const { profile, isAdmin } = useProfile();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState<any[]>([]);

    // Quick Form State
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        category: 'Operations',
        amount: '',
        date: '',
        is_recurring: false
    });

    const isFinanceUser = profile?.role === 'founder' || profile?.role === 'accountant';

    useEffect(() => {
        if (profile && !isFinanceUser) navigate('/portal');
    }, [profile, isFinanceUser, navigate]);

    const fetchExpenses = async () => {
        try {
            const { data, error } = await supabase
                .from('finance_expenses')
                .select('*')
                .order('expense_date', { ascending: false });

            if (error) throw error;
            setExpenses(data || []);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const amount = parseFloat(newItem.amount);
            const requiresApproval = amount > 5000; // Auto-flag large expenses

            const { error } = await supabase.from('finance_expenses').insert({
                name: newItem.name,
                category: newItem.category,
                amount,
                expense_date: newItem.date,
                is_recurring: newItem.is_recurring,
                requires_approval: requiresApproval,
                is_approved: !requiresApproval, // Auto-approve small ones
                created_by: profile?.id
            });

            if (error) throw error;
            setShowModal(false);
            setNewItem({ name: '', category: 'Operations', amount: '', date: '', is_recurring: false });
            fetchExpenses();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const approveExpense = async (id: string) => {
        if (!isAdmin) return; // Only founder approves
        try {
            const { error } = await supabase
                .from('finance_expenses')
                .update({ is_approved: true, approved_by: profile?.id })
                .eq('id', id);

            if (error) throw error;
            fetchExpenses();
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (loading) return <div className="p-8">Loading Expense Data...</div>;

    return (
        <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-brand-muted mb-[-20px]">
                <button onClick={() => navigate('/portal/finance')} className="hover:text-brand-pink">Finance</button>
                <span>/</span>
                <span>Expenses</span>
            </div>

            <PageHeader
                title="Expense Tracking"
                subtitle="Manage spending and approvals."
                action={
                    <Button onClick={() => setShowModal(true)}>
                        <Plus size={16} className="mr-2" /> Log Expense
                    </Button>
                }
            />

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-red-50 border-red-100">
                    <p className="text-xs uppercase font-bold text-red-600 mb-1">Total Expenses (Cycle)</p>
                    <h3 className="text-3xl font-bold text-red-800">
                        ₵{expenses.reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                    </h3>
                </Card>
                <Card>
                    <p className="text-xs uppercase font-bold text-brand-muted mb-1">Recurring Costs</p>
                    <h3 className="text-3xl font-bold text-brand-dark">
                        ₵{expenses.filter(e => e.is_recurring).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} <span className="text-sm font-normal text-brand-muted">/mo</span>
                    </h3>
                </Card>
            </div>

            {/* List */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white">
                        <thead className="bg-brand-ivory text-brand-muted text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4 rounded-tl-xl">Expense</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Approval</th>
                                <th className="p-4 rounded-tr-xl">Receipt</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-muted/10">
                            {expenses.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-brand-muted">No expenses logged.</td>
                                </tr>
                            ) : expenses.map((exp) => (
                                <tr key={exp.id} className="hover:bg-brand-ivory/50 transition-colors">
                                    <td className="p-4 font-bold text-brand-dark">
                                        {exp.name}
                                        {exp.is_recurring && <Badge variant="outline" className="ml-2 text-[10px]">Recurring</Badge>}
                                    </td>
                                    <td className="p-4 text-sm text-brand-muted"><Badge variant="default" className="bg-brand-ivory">{exp.category}</Badge></td>
                                    <td className="p-4 text-sm text-brand-muted">{new Date(exp.expense_date).toLocaleDateString()}</td>
                                    <td className="p-4 font-bold font-mono text-red-600">-₵{exp.amount.toLocaleString()}</td>
                                    <td className="p-4">
                                        {exp.is_approved ? (
                                            <div className="flex items-center text-green-600 text-xs font-bold uppercase tracking-wider">
                                                <CheckCircle size={14} className="mr-1" /> Approved
                                            </div>
                                        ) : (
                                            isAdmin ? (
                                                <button onClick={() => approveExpense(exp.id)} className="text-xs bg-brand-pink text-white px-2 py-1 rounded hover:bg-brand-pink/90">
                                                    Approve
                                                </button>
                                            ) : (
                                                <span className="text-yellow-600 text-xs font-bold">Pending</span>
                                            )
                                        )}
                                    </td>
                                    <td className="p-4 text-brand-muted">
                                        <Upload size={16} className="cursor-pointer hover:text-brand-pink" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-brand-dark/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
                        <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Log Expense</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Description</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                                    placeholder="e.g. Adobe Subscription"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-1">Amount (₵)</label>
                                    <input
                                        required
                                        type="number"
                                        className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                        value={newItem.amount}
                                        onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-1">Date</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                        value={newItem.date}
                                        onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Category</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink bg-white"
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                >
                                    {['Software & Tools', 'Marketing & Ads', 'Contractors', 'Operations', 'Education', 'Miscellaneous'].map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center space-x-2 pt-2">
                                <input
                                    type="checkbox"
                                    id="rec"
                                    className="rounded text-brand-pink focus:ring-brand-pink"
                                    checked={newItem.is_recurring}
                                    onChange={(e) => setNewItem({ ...newItem, is_recurring: e.target.checked })}
                                />
                                <label htmlFor="rec" className="text-sm font-bold text-brand-dark">Recurring Monthly?</label>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">Log Expense</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortalFinanceExpenses;
