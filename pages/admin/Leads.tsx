import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Download, Mail, Phone, Calendar } from 'lucide-react';
import Papa from 'papaparse';

const Leads = () => {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
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
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const updateStatus = async (id: string, status: string) => {
        await supabase.from('leads').update({ status }).eq('id', id);
        fetchLeads(); // Refresh
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Inquiries & Leads</h1>
                <button
                    onClick={handleExport}
                    className="flex items-center space-x-2 px-4 py-2 border border-[#4A3B40] text-[#4A3B40] rounded-lg hover:bg-[#4A3B40] hover:text-[#FAF9F6] transition-all"
                >
                    <Download size={18} />
                    <span>Export CSV</span>
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-600 text-sm">
                            <tr>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Client</th>
                                <th className="px-6 py-4 font-medium">Service</th>
                                <th className="px-6 py-4 font-medium">Message</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50 group">
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        <div className="flex items-center space-x-2">
                                            <Calendar size={14} />
                                            <span>{new Date(lead.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-[#4A3B40]">{lead.name}</div>
                                        <div className="text-xs text-gray-500 flex items-center space-x-1 mt-1">
                                            <Mail size={12} /> <span>{lead.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">
                                        <span className="bg-[#FAF9F6] px-2 py-1 rounded text-xs font-semibold text-[#4A3B40]">
                                            {lead.service || 'General'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate" title={lead.message}>
                                        {lead.message}
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={lead.status}
                                            onChange={(e) => updateStatus(lead.id, e.target.value)}
                                            className={`text-xs font-semibold rounded-full px-2 py-1 border-none cursor-pointer focus:ring-0 ${lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                                    lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-green-100 text-green-800'
                                                }`}
                                        >
                                            <option value="new">NEW</option>
                                            <option value="contacted">CONTACTED</option>
                                            <option value="closed">CLOSED</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={`mailto:${lead.email}`} className="text-[#4A3B40] hover:underline text-sm font-medium">Reply</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {leads.length === 0 && !loading && (
                        <div className="p-8 text-center text-gray-400">No leads found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Leads;
