import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Mail, Phone, Calendar, Clock, DollarSign, CheckCircle } from 'lucide-react';

const Clients = () => {
    // Placeholder for Clients logic - in a real app this would query a 'clients' table
    // For now, we can fetch 'closed' leads as clients
    const [clients, setClients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            const { data } = await supabase
                .from('leads')
                .select('*')
                .eq('status', 'closed')
                .order('created_at', { ascending: false });

            if (data) setClients(data);
            setLoading(false);
        };
        fetchClients();
    }, []);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Clients</h1>
            <p className="text-gray-500">Manage your active clients and project history.</p>

            <div className="bg-white rounded-2xl shadow-sm border border-brand-beige/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-brand-beige/30 text-[#4A3B40] font-serif">
                            <tr>
                                <th className="px-6 py-4 font-bold">Client Name</th>
                                <th className="px-6 py-4 font-bold">Service</th>
                                <th className="px-6 py-4 font-bold">First Contact</th>
                                <th className="px-6 py-4 font-bold">Status</th>
                                <th className="px-6 py-4 font-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {clients.map((client) => (
                                <tr key={client.id} className="hover:bg-brand-beige/5 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-[#4A3B40]">{client.name}</div>
                                        <div className="text-sm text-gray-400">{client.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{client.service}</td>
                                    <td className="px-6 py-4 text-gray-500 text-sm">
                                        {new Date(client.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                            <CheckCircle size={12} />
                                            <span>Active</span>
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-brand-pink hover:text-[#4A3B40] font-medium text-sm transition-colors">View Details</button>
                                    </td>
                                </tr>
                            ))}
                            {clients.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        No active clients found. Marks leads as "Closed" to see them here.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Clients;
