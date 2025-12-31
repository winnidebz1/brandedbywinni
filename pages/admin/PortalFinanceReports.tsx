import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import { FileText, Upload, AlertTriangle, Download, Trash2, Printer, X } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useNavigate } from 'react-router-dom';

const PortalFinanceReports = () => {
    const { profile, isAdmin, isAccountant } = useProfile();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<any[]>([]);
    const [showSystemReport, setShowSystemReport] = useState(false);
    const [systemData, setSystemData] = useState<any>(null);



    const isFinanceUser = isAdmin || isAccountant;

    useEffect(() => {
        if (profile && !isFinanceUser) navigate('/portal');
    }, [profile, isFinanceUser, navigate]);

    const fetchReports = async () => {
        try {
            const { data, error } = await supabase
                .from('finance_reports')
                .select('*, profiles(full_name)')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReports(data || []);
        } catch (error) {
            console.error('Error fetching reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const fetchSystemReport = async () => {
        setLoading(true);
        try {
            // 1. Invoices
            const { data: invoices } = await supabase.from('finance_invoices').select('*').order('created_at', { ascending: false });
            // 2. Expenses
            const { data: expenses } = await supabase.from('finance_expenses').select('*').order('expense_date', { ascending: false });
            // 3. Goals
            const { data: goal } = await supabase.from('finance_goals').select('*').eq('is_active', true).single();

            setSystemData({ invoices: invoices || [], expenses: expenses || [], goal });
            setShowSystemReport(true);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }



    if (loading && !systemData) return <div className="p-8">Loading Reports...</div>;

    if (showSystemReport && systemData) {
        return (
            <div className="fixed inset-0 bg-white z-[100] overflow-auto animate-fadeIn">
                <div className="max-w-[210mm] mx-auto p-8 bg-white min-h-screen my-8 border shadow-2xl print:shadow-none print:border-none print:m-0 print:w-full print:max-w-none">

                    {/* Print Header */}
                    <div className="flex justify-between items-start mb-8 border-b-2 border-brand-dark pb-4">
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-brand-dark">Financial System Report</h1>
                            <p className="text-brand-muted">Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}</p>
                        </div>
                        <div className="print:hidden flex space-x-2">
                            <Button onClick={() => window.print()}>
                                <Printer size={16} className="mr-2" /> Print / Save PDF
                            </Button>
                            <button onClick={() => setShowSystemReport(false)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-6 mb-8">
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                            <h3 className="text-sm font-bold uppercase text-gray-500">Total Revenue</h3>
                            <p className="text-2xl font-bold font-mono">
                                ₵{systemData.invoices.filter((i: any) => i.status === 'paid').reduce((acc: any, c: any) => acc + c.amount, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                            <h3 className="text-sm font-bold uppercase text-gray-500">Total Expenses</h3>
                            <p className="text-2xl font-bold font-mono text-red-600">
                                -₵{systemData.expenses.reduce((acc: any, c: any) => acc + c.amount, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                            <h3 className="text-sm font-bold uppercase text-gray-500">Net Profit</h3>
                            <p className="text-2xl font-bold font-mono text-brand-dark">
                                ₵{(
                                    systemData.invoices.filter((i: any) => i.status === 'paid').reduce((acc: any, c: any) => acc + c.amount, 0) -
                                    systemData.expenses.reduce((acc: any, c: any) => acc + c.amount, 0)
                                ).toLocaleString()}
                            </p>
                        </div>
                    </div>

                    {/* Goal Context */}
                    {systemData.goal && (
                        <div className="mb-8 p-4 border border-dashed border-gray-300 rounded-lg">
                            <h3 className="font-bold text-lg mb-2">Active Cycle Goals</h3>
                            <div className="grid grid-cols-4 text-sm gap-4">
                                <div>
                                    <span className="text-gray-500">Target Revenue:</span> <br />
                                    <span className="font-bold">₵{systemData.goal.revenue_target.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Target Profit:</span> <br />
                                    <span className="font-bold">₵{systemData.goal.profit_target.toLocaleString()}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Dates:</span> <br />
                                    <span className="font-bold">{new Date(systemData.goal.start_date).toLocaleDateString()} - {new Date(systemData.goal.end_date).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tables */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Recorded Income</h2>
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-2">Date</th>
                                        <th className="py-2">Client</th>
                                        <th className="py-2">Ref #</th>
                                        <th className="py-2">Status</th>
                                        <th className="py-2 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {systemData.invoices.map((inv: any) => (
                                        <tr key={inv.id} className="border-b border-gray-100">
                                            <td className="py-2">{new Date(inv.created_at).toLocaleDateString()}</td>
                                            <td className="py-2 font-medium">{inv.client_name}</td>
                                            <td className="py-2 text-gray-500">{inv.invoice_number}</td>
                                            <td className="py-2">{inv.status}</td>
                                            <td className="py-2 text-right font-mono">₵{inv.amount.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 mb-4">Recorded Expenses</h2>
                            <table className="w-full text-sm text-left">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="py-2">Date</th>
                                        <th className="py-2">Item</th>
                                        <th className="py-2">Category</th>
                                        <th className="py-2">Approved?</th>
                                        <th className="py-2 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {systemData.expenses.map((exp: any) => (
                                        <tr key={exp.id} className="border-b border-gray-100">
                                            <td className="py-2">{new Date(exp.expense_date).toLocaleDateString()}</td>
                                            <td className="py-2 font-medium">{exp.name}</td>
                                            <td className="py-2 text-gray-500">{exp.category}</td>
                                            <td className="py-2">{exp.is_approved ? 'Yes' : 'No'}</td>
                                            <td className="py-2 text-right font-mono text-red-600">-₵{exp.amount.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="mt-12 text-center text-xs text-gray-400 print:fixed print:bottom-4 print:left-0 print:w-full">
                        Branded By Winni Internal System • Confidential Financial Data
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
            <div className="flex items-center space-x-2 text-sm text-brand-muted mb-[-20px]">
                <button onClick={() => navigate('/portal/finance')} className="hover:text-brand-pink">Finance</button>
                <span>/</span>
                <span>Reports</span>
            </div>

            <PageHeader
                title="Accountant Workspace"
                subtitle="Financial reports, audits, and flagged issues."
                action={
                    <div className="flex space-x-2">
                        <Button variant="outline" onClick={fetchSystemReport}>
                            <Printer size={16} className="mr-2" /> Generate System Report (PDF)
                        </Button>
                    </div>
                }
            />

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.length === 0 ? (
                    <div className="col-span-full text-center p-12 bg-white rounded-xl border border-dashed text-brand-muted">
                        No manual reports uploaded yet. Use "Generate System Report" to print live compiled data.
                    </div>
                ) : reports.map((rep) => (
                    <Card key={rep.id} className="relative group border-l-4 border-l-brand-pink">
                        <div className="flex justify-between items-start mb-3">
                            <Badge variant="outline" className="uppercase text-[10px]">{rep.report_type}</Badge>
                            <span className="text-xs text-brand-muted">{new Date(rep.created_at).toLocaleDateString()}</span>
                        </div>
                        <h3 className="font-bold text-lg text-brand-dark mb-2">{rep.title}</h3>

                        {rep.flags && (
                            <div className="bg-red-50 p-2 rounded text-xs text-red-700 font-medium mb-3 flex items-start gap-2">
                                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                                <span>{rep.flags}</span>
                            </div>
                        )}

                        {rep.notes && <p className="text-sm text-brand-muted mb-4 line-clamp-2">{rep.notes}</p>}

                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-muted/10">
                            <span className="text-xs font-bold text-brand-dark">
                                By: {rep.profiles?.full_name || 'Accountant'}
                            </span>
                            {/* Keep download for uploaded files if we implement storage later */}
                        </div>
                    </Card>
                ))}
            </div>


        </div>
    );
};

export default PortalFinanceReports;
