import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import { FileText, Upload, Plus, AlertTriangle, Download, Trash2 } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useNavigate } from 'react-router-dom';

const PortalFinanceReports = () => {
    const { profile, isAdmin, isAccountant } = useProfile();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<any[]>([]);

    // Quick Form State
    const [showModal, setShowModal] = useState(false);
    const [newReport, setNewReport] = useState({
        title: '',
        type: 'Monthly Summary',
        flags: '',
        notes: ''
    });

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

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // MVP: Just inserting record, file upload logic assumed separate or placeholder
            const { error } = await supabase.from('finance_reports').insert({
                title: newReport.title,
                report_type: newReport.type,
                flags: newReport.flags,
                notes: newReport.notes,
                file_url: '#', // Placeholder until buckets set up
                created_by: profile?.id
            });

            if (error) throw error;
            setShowModal(false);
            setNewReport({ title: '', type: 'Monthly Summary', flags: '', notes: '' });
            fetchReports();
        } catch (error: any) {
            alert(error.message);
        }
    };

    if (loading) return <div className="p-8">Loading Reports...</div>;

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
                    <Button onClick={() => setShowModal(true)}>
                        <Plus size={16} className="mr-2" /> Upload Report
                    </Button>
                }
            />

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reports.length === 0 ? (
                    <div className="col-span-full text-center p-12 bg-white rounded-xl border border-dashed text-brand-muted">
                        No reports uploaded yet.
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
                            <button className="text-brand-pink hover:text-brand-dark transition-colors">
                                <Download size={20} />
                            </button>
                        </div>
                    </Card>
                ))}
            </div>


            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-brand-dark/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fadeIn">
                    <div className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl">
                        <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Upload Report</h2>
                        <form onSubmit={handleUpload} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Report Title</label>
                                <input
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink"
                                    value={newReport.title}
                                    onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                                    placeholder="e.g. Q4 2025 P&L Statement"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Type</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink bg-white"
                                    value={newReport.type}
                                    onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}
                                >
                                    <option>Monthly Summary</option>
                                    <option>Tax Report</option>
                                    <option>Audit</option>
                                    <option>Expense Review</option>
                                    <option>12-Week Review</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Flag Issues? (Optional)</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink h-20"
                                    value={newReport.flags}
                                    onChange={(e) => setNewReport({ ...newReport, flags: e.target.value })}
                                    placeholder="E.g. Missing receipts for marketing expense..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Notes</label>
                                <textarea
                                    className="w-full px-4 py-3 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink h-20"
                                    value={newReport.notes}
                                    onChange={(e) => setNewReport({ ...newReport, notes: e.target.value })}
                                    placeholder="Add context..."
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button type="button" variant="outline" onClick={() => setShowModal(false)} className="flex-1">
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1">Upload</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortalFinanceReports;
