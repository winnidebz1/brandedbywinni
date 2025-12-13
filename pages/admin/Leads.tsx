import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Download, Mail, Phone, Calendar, Search, Filter,
    Instagram, Linkedin, Twitter, MoreHorizontal, X,
    Send, MessageCircle, CheckCircle, Clock
} from 'lucide-react';
import Papa from 'papaparse';

const Leads = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        const { data } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setLeads(data);
        setLoading(false);
    };

    const handleExport = () => {
        const csv = Papa.unparse(leads);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const updateStatus = async (id: string, status: string) => {
        // Optimistic update
        setLeads(leads.map(l => l.id === id ? { ...l, status } : l));
        if (selectedLead && selectedLead.id === id) {
            setSelectedLead({ ...selectedLead, status });
        }
        await supabase.from('leads').update({ status }).eq('id', id);
    };

    const filteredLeads = leads.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="relative h-full flex flex-col">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Leads & Outreach</h1>
                    <p className="text-gray-500">Track inquiries and manage your outreach pipeline.</p>
                </div>
                <div className="flex items-center space-x-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#E89BA7] focus:border-transparent outline-none"
                        />
                    </div>
                    <button onClick={handleExport} className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600">
                        <Download size={20} />
                    </button>
                    <button className="bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg font-medium hover:bg-[#644B52] transition-colors">
                        + New Lead
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-2 mb-6 overflow-x-auto pb-2">
                {['all', 'new', 'contacted', 'closed'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === status
                                ? 'bg-[#4A3B40] text-white'
                                : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex-1 overflow-hidden flex flex-col">
                <div className="overflow-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAF9F6] text-[#4A3B40] sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 font-bold text-sm">Lead Name</th>
                                <th className="px-6 py-4 font-bold text-sm">Brand / Company</th>
                                <th className="px-6 py-4 font-bold text-sm">Status</th>
                                <th className="px-6 py-4 font-bold text-sm">Source</th>
                                <th className="px-6 py-4 font-bold text-sm">Last Contact</th>
                                <th className="px-6 py-4 font-bold text-sm">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredLeads.map((lead) => (
                                <tr
                                    key={lead.id}
                                    onClick={() => setSelectedLead(lead)}
                                    className={`group hover:bg-[#FAF9F6]/50 cursor-pointer transition-colors ${selectedLead?.id === lead.id ? 'bg-[#FAF9F6]' : ''}`}
                                >
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#4A3B40]">{lead.name}</div>
                                        <div className="text-xs text-gray-400">{lead.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {lead.company_name || '-'}
                                        {lead.social_handle && (
                                            <div className="flex items-center space-x-1 text-xs text-blue-500 mt-0.5">
                                                <Instagram size={10} />
                                                <span>{lead.social_handle}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={lead.status} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {lead.source || 'Website'}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-400">
                                        {lead.last_contact_date ? new Date(lead.last_contact_date).toLocaleDateString() : 'Never'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-[#4A3B40]">
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                        No leads found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail View Side Panel */}
            {selectedLead && (
                <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-white shadow-2xl border-l border-gray-200 z-50 overflow-y-auto transform transition-transform duration-300 ease-in-out">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold font-serif text-[#4A3B40]">{selectedLead.name}</h2>
                                <p className="text-gray-500 text-sm">{selectedLead.email}</p>
                            </div>
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Status Dropdown */}
                        <div className="mb-8">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Current Status</label>
                            <select
                                value={selectedLead.status}
                                onChange={(e) => updateStatus(selectedLead.id, e.target.value)}
                                className="w-full bg-[#FAF9F6] border border-gray-200 rounded-lg p-3 text-[#4A3B40] font-medium focus:ring-2 focus:ring-[#E89BA7] outline-none"
                            >
                                <option value="new">New Inquiry</option>
                                <option value="contacted">Contacted / In Discussion</option>
                                <option value="closed">Closed / Client</option>
                                <option value="lost">Lost</option>
                            </select>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <DetailItem label="Service" value={selectedLead.service} />
                            <DetailItem label="Phone" value={selectedLead.phone || '-'} />
                            <DetailItem label="Source" value={selectedLead.source || 'Website'} />
                            <DetailItem label="Industry" value={selectedLead.industry || '-'} />
                        </div>

                        {/* Message */}
                        <div className="bg-[#FAF9F6] p-4 rounded-xl mb-8">
                            <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Original Message</h3>
                            <p className="text-[#4A3B40] text-sm leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
                        </div>

                        {/* Outreach Log Section */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="font-bold text-[#4A3B40] mb-4 flex items-center justify-between">
                                <span>Outreach Log</span>
                                <button className="text-xs bg-[#4A3B40] text-white px-3 py-1 rounded-full hover:bg-[#644B52]">
                                    + Log
                                </button>
                            </h3>

                            <div className="space-y-4">
                                {/* Mock Log Entry */}
                                <div className="flex gap-3">
                                    <div className="mt-1">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                            <Send size={14} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-[#4A3B40]">Sent Intro Email</p>
                                        <p className="text-xs text-gray-500">Template: General Inquiry Response</p>
                                        <p className="text-[10px] text-gray-400 mt-1">Today at 10:42 AM</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 text-gray-400">
                                    <div className="mt-1">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                            <CheckCircle size={14} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Inquiry Received</p>
                                        <p className="text-[10px] mt-1">{new Date(selectedLead.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ status }: { status: string }) => {
    const styles = {
        new: 'bg-blue-100 text-blue-800',
        contacted: 'bg-yellow-100 text-yellow-800',
        closed: 'bg-green-100 text-green-800',
        lost: 'bg-gray-100 text-gray-600',
    };
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${styles[status as keyof typeof styles] || styles.new}`}>
            {status}
        </span>
    );
};

const DetailItem = ({ label, value }: { label: string, value: string }) => (
    <div>
        <p className="text-xs text-gray-400 mb-1">{label}</p>
        <p className="font-medium text-[#4A3B40] break-words">{value}</p>
    </div>
);

export default Leads;
