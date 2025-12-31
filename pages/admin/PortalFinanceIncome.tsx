import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import { DollarSign, Plus, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useNavigate } from 'react-router-dom';

const PortalFinanceIncome = () => {
    const { profile } = useProfile();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [invoices, setInvoices] = useState<any[]>([]);

    // Quick Form State (MVP)
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        client_name: '',
        amount: '',
        date: '',
        status: 'pending' // pending, paid
    });

    // Check access
    const isFinanceUser = profile?.role === 'founder' || profile?.role === 'accountant';

    useEffect(() => {
        if (profile && !isFinanceUser) navigate('/portal');
    }, [profile, isFinanceUser, navigate]);

    const fetchInvoices = async () => {
        try {
            const { data, error } = await supabase
                .from('finance_invoices')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setInvoices(data || []);
        } catch (error) {
            console.error('Error fetching invoices:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Simplified Invoice Creation for MVP
            const { data, error } = await supabase.from('finance_invoices').insert({
                invoice_number: `INV-${Date.now().toString().slice(-6)}`,
                client_name: newItem.client_name,
                amount: parseFloat(newItem.amount),
                status: newItem.status,
                due_date: newItem.date,
                created_by: profile?.id
            }).select().single();

            if (error) throw error;

            // If Paid, log income automatically? 
            // For now, let's just create invoice.

            setShowModal(false);
            setNewItem({ client_name: '', amount: '', date: '', status: 'pending' });
            fetchInvoices();
        } catch (error: any) {
            alert(error.message);
        }
    };

    const markAsPaid = async (id: string) => {
        if (!confirm('Mark this invoice as PAID? This cannot be undone.')) return;
        try {
            const { error } = await supabase
                .from('finance_invoices')
                .update({ status: 'paid' })
                .eq('id', id);

            if (error) throw error;
            fetchInvoices();
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (loading) return <div className="p-8">Loading Income Data...</div>;

    return (
        <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-brand-muted mb-[-20px]">
                <button onClick={() => navigate('/portal/finance')} className="hover:text-brand-pink">Finance</button>
                <span>/</span>
                <span>Income & Invoices</span>
            </div>

            <PageHeader
                title="Income Tracking"
                subtitle="Monitor revenue and manage client invoices."
                action={
                    <Button onClick={() => setShowModal(true)}>
                        <Plus size={16} className="mr-2" /> New Invoice
                    </Button>
                }
            />

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-50 border-green-100">
                    <p className="text-xs uppercase font-bold text-green-600 mb-1">Total Collected (Cycle)</p>
                    <h3 className="text-3xl font-bold text-green-800">
                        ₵{invoices.filter(i => i.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                    </h3>
                </Card>
                <Card className="bg-yellow-50 border-yellow-100">
                    <p className="text-xs uppercase font-bold text-yellow-600 mb-1">Pending Invoices</p>
                    <h3 className="text-3xl font-bold text-yellow-800">
                        ₵{invoices.filter(i => i.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}
                    </h3>
                </Card>
                <Card>
                    <p className="text-xs uppercase font-bold text-brand-muted mb-1">Total Invoices</p>
                    <h3 className="text-3xl font-bold text-brand-dark">{invoices.length}</h3>
                </Card>
            </div>

            {/* Invoice List */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white">
                        <thead className="bg-brand-ivory text-brand-muted text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4 rounded-tl-xl">Invoice #</th>
                                <th className="p-4">Client</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Amount</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 rounded-tr-xl">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-muted/10">
                            {invoices.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-brand-muted">No invoices found.</td>
                                </tr>
                            ) : invoices.map((inv) => (
                                <tr key={inv.id} className="hover:bg-brand-ivory/50 transition-colors group">
                                    <td className="p-4 font-mono text-sm text-brand-muted">{inv.invoice_number}</td>
                                    <td className="p-4 font-bold text-brand-dark">{inv.client_name}</td>
                                    <td className="p-4 text-sm text-brand-muted">{new Date(inv.due_date).toLocaleDateString()}</td>
                                    <td className="p-4 font-bold font-mono">₵{inv.amount.toLocaleString()}</td>
                                    <td className="p-4">
                                        <Badge variant="default" className={
                                            inv.status === 'paid' ? 'bg-green-100 text-green-700' :
                                                inv.status === 'overdue' ? 'bg-red-100 text-red-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                        }>
                                            {inv.status}
                                        </Badge>
                                    </td>
                                    <td className="p-4">
                                        {inv.status !== 'paid' && (
                                            <button
                                                onClick={() => markAsPaid(inv.id)}
                                                className="text-xs font-bold text-green-600 hover:text-green-800 underline bg-white py-1 px-2 rounded hover:shadow-sm"
                                            >
                                                Mark Paid
                                            </button>
                                        )}
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
                        <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Create New Invoice</h2>
                        <form onSubmit={handleCreate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Client Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                    value={newItem.client_name}
                                    onChange={(e) => setNewItem({ ...newItem, client_name: e.target.value })}
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
                                    <label className="block text-sm font-bold text-brand-muted mb-1">Due Date</label>
                                    <input
                                        required
                                        type="date"
                                        className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                        value={newItem.date}
                                        onChange={(e) => setNewItem({ ...newItem, date: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">Create Invoice</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortalFinanceIncome;
