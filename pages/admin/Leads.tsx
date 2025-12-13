import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Download, Mail, Phone, Calendar, Search, Filter,
    Instagram, Linkedin, Twitter, MoreHorizontal, X,
    Send, MessageCircle, CheckCircle, Clock, Trash2, Plus
} from 'lucide-react';
import Papa from 'papaparse';

const Leads = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Outreach Logging State
    const [isLogging, setIsLogging] = useState(false);
    const [outreachNote, setOutreachNote] = useState('');
    const [outreachType, setOutreachType] = useState('Email');
    const [leadLogs, setLeadLogs] = useState<any[]>([]);

    // New Lead Modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newLead, setNewLead] = useState({ name: '', email: '', service: 'Branding', source: 'Outbound' });

    useEffect(() => {
        fetchLeads();
    }, []);

    useEffect(() => {
        if (selectedLead) {
            fetchLogs(selectedLead.id);
        }
    }, [selectedLead]);

    const fetchLeads = async () => {
        const { data } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setLeads(data);
        setLoading(false);
    };

    const fetchLogs = async (leadId: string) => {
        const { data } = await supabase
            .from('outreach_logs')
            .select('*')
            .eq('lead_id', leadId)
            .order('sent_at', { ascending: false });
        if (data) setLeadLogs(data);
    };

    const handleCreateLead = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('leads').insert([{
            ...newLead,
            status: 'new',
            created_at: new Date().toISOString()
        }]);
        if (!error) {
            setIsAddModalOpen(false);
            setNewLead({ name: '', email: '', service: 'Branding', source: 'Manual' });
            fetchLeads();
        } else {
            alert('Error creating lead');
        }
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

    const handleDelete = async (id: string) => {
        if (confirm('Delete this lead and all history?')) {
            await supabase.from('leads').delete().eq('id', id);
            if (selectedLead?.id === id) setSelectedLead(null);
            fetchLeads();
        }
    };

    const handleLogOutreach = async () => {
        if (!outreachNote) return;

        const { error } = await supabase.from('outreach_logs').insert([{
            lead_id: selectedLead.id,
            type: outreachType,
            content: outreachNote,
            sent_at: new Date().toISOString()
        }]);

        // Also update last_contact_date on lead
        await supabase.from('leads').update({
            last_contact_date: new Date().toISOString()
        }).eq('id', selectedLead.id);

        if (!error) {
            setOutreachNote('');
            setIsLogging(false);
            fetchLogs(selectedLead.id);
            fetchLeads(); // Update list for last contact date
        }
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
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg font-medium hover:bg-[#644B52] transition-colors"
                    >
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
                <div className="overflow-auto flex-1 h-[500px]">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#FAF9F6] text-[#4A3B40] sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 font-bold text-sm">Lead Name</th>
                                <th className="px-6 py-4 font-bold text-sm">Brand / Company</th>
                                <th className="px-6 py-4 font-bold text-sm">Status</th>
                                <th className="px-6 py-4 font-bold text-sm">Source</th>
                                <th className="px-6 py-4 font-bold text-sm">Last Contact</th>
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
                                </tr>
                            ))}
                            {filteredLeads.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
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
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDelete(selectedLead.id)}
                                    className="p-2 hover:bg-red-50 text-red-400 rounded-full"
                                    title="Delete Lead"
                                >
                                    <Trash2 size={20} />
                                </button>
                                <button
                                    onClick={() => setSelectedLead(null)}
                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
                                >
                                    <X size={24} />
                                </button>
                            </div>
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
                        {selectedLead.message && (
                            <div className="bg-[#FAF9F6] p-4 rounded-xl mb-8">
                                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Original Message</h3>
                                <p className="text-[#4A3B40] text-sm leading-relaxed whitespace-pre-wrap">{selectedLead.message}</p>
                            </div>
                        )}

                        {/* Outreach Log Section */}
                        <div className="border-t border-gray-100 pt-6">
                            <h3 className="font-bold text-[#4A3B40] mb-4 flex items-center justify-between">
                                <span>Outreach Log</span>
                                <button
                                    onClick={() => setIsLogging(!isLogging)}
                                    className="text-xs bg-[#4A3B40] text-white px-3 py-1 rounded-full hover:bg-[#644B52]"
                                >
                                    + Log Interaction
                                </button>
                            </h3>

                            {isLogging && (
                                <div className="bg-gray-50 p-4 rounded-lg mb-4 animate-fadeIn">
                                    <select
                                        className="w-full mb-3 text-sm border-gray-200 rounded-md py-1"
                                        value={outreachType}
                                        onChange={(e) => setOutreachType(e.target.value)}
                                    >
                                        <option>Email</option>
                                        <option>DM</option>
                                        <option>Call</option>
                                        <option>Meeting</option>
                                    </select>
                                    <textarea
                                        className="w-full border border-gray-200 rounded-lg p-2 text-sm mb-2"
                                        rows={3}
                                        placeholder="Notes about this interaction..."
                                        value={outreachNote}
                                        onChange={e => setOutreachNote(e.target.value)}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button onClick={() => setIsLogging(false)} className="text-xs px-3 py-1 text-gray-500">Cancel</button>
                                        <button onClick={handleLogOutreach} className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md">Save Log</button>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4">
                                {leadLogs.map((log) => (
                                    <div key={log.id} className="flex gap-3 relative">
                                        <div className="mt-1">
                                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                                                {log.type === 'Email' ? <Mail size={14} /> :
                                                    log.type === 'DM' ? <MessageCircle size={14} /> :
                                                        <Phone size={14} />}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[#4A3B40]">{log.type} Sent/Logged</p>
                                            <p className="text-xs text-gray-500">{log.content}</p>
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {new Date(log.sent_at).toLocaleDateString()} at {new Date(log.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                <div className="flex gap-3 text-gray-400 opacity-70">
                                    <div className="mt-1">
                                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                                            <Clock size={14} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">Inquiry Started</p>
                                        <p className="text-[10px] mt-1">{new Date(selectedLead.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Lead Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#4A3B40]">Add New Lead</h3>
                            <button onClick={() => setIsAddModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCreateLead} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input className="w-full border rounded-lg p-2" required value={newLead.name} onChange={e => setNewLead({ ...newLead, name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Info</label>
                                <input className="w-full border rounded-lg p-2" type="text" placeholder="Email, Phone, or Handle" required value={newLead.email} onChange={e => setNewLead({ ...newLead, email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                                <select className="w-full border rounded-lg p-2" value={newLead.service} onChange={e => setNewLead({ ...newLead, service: e.target.value })}>
                                    <option>Branding</option>
                                    <option>Web Design</option>
                                    <option>SEO</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                                <input className="w-full border rounded-lg p-2" value={newLead.source} onChange={e => setNewLead({ ...newLead, source: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full bg-[#4A3B40] text-white py-3 rounded-xl font-bold">Add Lead</button>
                        </form>
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
