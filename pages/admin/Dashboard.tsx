import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, Users, FileText, MessageSquare } from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        leads: 0,
        projects: 0,
        testimonials: 0,
        newLeads: 0
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            // Get today's date at midnight (start of day)
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const todayISO = today.toISOString();

            // Fetch counts
            const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
            const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
            const { count: testimonialsCount } = await supabase.from('testimonials').select('*', { count: 'exact', head: true });

            // Fetch TODAY's visitor count only
            const { count: visitsCount } = await supabase
                .from('site_visits')
                .select('*', { count: 'exact', head: true })
                .gte('created_at', todayISO);

            // Fetch recent leads
            const { data: leads } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            // Get country stats for TODAY only
            const { data: visits } = await supabase
                .from('site_visits')
                .select('country')
                .gte('created_at', todayISO)
                .limit(1000);

            type CountryCount = { [key: string]: number };
            const countryStats: CountryCount = {};
            visits?.forEach((v: any) => {
                const c = v.country || 'Unknown';
                countryStats[c] = (countryStats[c] || 0) + 1;
            });

            // Sort countries
            const topCountries = Object.entries(countryStats)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 5);

            setStats({
                leads: leadsCount || 0,
                projects: projectsCount || 0,
                testimonials: testimonialsCount || 0,
                newLeads: leads?.filter(l => l.status === 'new').length || 0,
                visits: visitsCount || 0,
                topCountries: topCountries
            } as any);

            if (leads) setRecentLeads(leads);
            setLoading(false);
        };

        loadData();

        // Subscribe to changes on KEY tables
        const subscription = supabase
            .channel('dashboard-db-changes')
            .on('postgres_changes', { event: '*', schema: 'public' }, () => {
                loadData();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    if (loading) return <div className="p-8">Loading stats...</div>;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Dashboard</h1>
                <p className="text-gray-500">Welcome back, here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Inquiries" value={stats.leads} icon={<Users />} color="blue" />
                <StatCard title="Projects Added" value={stats.projects} icon={<FileText />} color="purple" />
                <StatCard title="Testimonials" value={stats.testimonials} icon={<MessageSquare />} color="green" />
                <StatCard title="Today's Visitors" value={(stats as any).visits} icon={<BarChart />} color="indigo" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Leads */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-[#4A3B40]">Recent Inquiries</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 text-sm">
                                <tr>
                                    <th className="px-6 py-4 font-medium">Name</th>
                                    <th className="px-6 py-4 font-medium">Service</th>
                                    <th className="px-6 py-4 font-medium">Date</th>
                                    <th className="px-6 py-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {recentLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-[#4A3B40]">{lead.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{lead.service}</td>
                                        <td className="px-6 py-4 text-gray-400 text-sm">
                                            {new Date(lead.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${lead.status === 'new' ? 'bg-blue-100 text-blue-800' :
                                                lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {lead.status.toUpperCase()}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {recentLeads.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-400">
                                            No inquiries yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Country Stats */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-[#4A3B40]">Visitor Traffic</h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {((stats as any).topCountries || []).map(([country, count]: any, index: number) => (
                                <div key={country} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-sm font-medium text-gray-400">#{index + 1}</span>
                                        <span className="text-[#4A3B40] font-medium">{country}</span>
                                    </div>
                                    <span className="bg-brand-pink/10 text-brand-pink px-2 py-1 rounded-md text-sm font-bold">
                                        {count}
                                    </span>
                                </div>
                            ))}
                            {(!stats as any).visits === 0 && (
                                <div className="text-center text-gray-400 py-4">No data yet</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className={`p-4 rounded-lg bg-${color}-50 text-${color}-600`}>
            {icon}
        </div>
        <div>
            <p className="text-gray-500 text-sm">{title}</p>
            <p className="text-2xl font-bold text-[#4A3B40]">{value}</p>
        </div>
    </div>
);

export default Dashboard;
