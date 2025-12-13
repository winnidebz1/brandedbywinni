import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import {
    Users, FileText, MessageSquare, BarChart2,
    ArrowUpRight, Plus, Send, RefreshCw, Calendar
} from 'lucide-react';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalLeads: 0,
        newLeadsThisWeek: 0,
        activeClients: 0, // Placeholder
        visits: 0
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const today = new Date();
            // Start of week calculation could go here

            const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
            const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });

            // Get recent leads for activity feed
            const { data: leads } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5);

            // Mocking some data for the design since tables might not exist yet
            setStats({
                totalLeads: leadsCount || 0,
                newLeadsThisWeek: 5, // Mocked
                activeClients: 12, // Mocked
                visits: 1240 // Mocked or fetch from analytics table if exists
            });

            if (leads) setRecentLeads(leads);
            setLoading(false);
        };
        loadData();
    }, []);

    const QuickActionFunc = (action: string) => {
        alert(`${action} functionality coming soon!`);
    };

    if (loading) return <div className="p-8 text-gray-400 animate-pulse">Loading command center...</div>;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Overview</h1>
                    <p className="text-gray-500">Welcome back, Winni. Here's your creative business snapshot.</p>
                </div>
                <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 bg-white border border-gray-200 text-[#4A3B40] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium">
                        <RefreshCw size={16} />
                        <span>Sync Data</span>
                    </button>
                    <button className="flex items-center space-x-2 bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg hover:bg-[#644B52] transition-colors shadow-lg shadow-[#4A3B40]/20 text-sm font-medium">
                        <Plus size={16} />
                        <span>New Entry</span>
                    </button>
                </div>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                <ActionBtn icon={<Plus size={18} />} label="Add Lead" onClick={() => QuickActionFunc('Add Lead')} />
                <ActionBtn icon={<Send size={18} />} label="Log Outreach" onClick={() => QuickActionFunc('Log Outreach')} />
                <ActionBtn icon={<Users size={18} />} label="Add Client" onClick={() => QuickActionFunc('Add Client')} />
                <ActionBtn icon={<FileText size={18} />} label="Add Project" onClick={() => QuickActionFunc('Add Project')} />
                <ActionBtn icon={<BarChart2 size={18} />} label="Report" onClick={() => QuickActionFunc('Generate Report')} />
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Leads"
                    value={stats.totalLeads}
                    trend="+12%"
                    icon={<Users className="text-blue-500" />}
                    color="blue"
                />
                <StatCard
                    title="New Leads (Week)"
                    value={stats.newLeadsThisWeek}
                    trend="+5"
                    icon={<MessageSquare className="text-purple-500" />}
                    color="purple"
                />
                <StatCard
                    title="Active Clients"
                    value={stats.activeClients}
                    trend="Stable"
                    icon={<Users className="text-pink-500" />}
                    color="pink"
                />
                <StatCard
                    title="Web Traffic (30d)"
                    value={stats.visits}
                    trend="+24%"
                    icon={<BarChart2 className="text-green-500" />}
                    color="green"
                />
            </div>

            {/* Two Column Layout: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Charts/Traffic (Placeholder for Visuals) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-[#4A3B40]">Traffic Overview</h2>
                            <select className="text-sm border-none bg-gray-50 rounded-lg p-2 text-gray-500 focus:ring-0">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        {/* Mock Graph Visual */}
                        <div className="h-64 flex items-end justify-between space-x-2 px-4">
                            {[40, 60, 45, 80, 55, 70, 90, 65, 85, 95, 75, 80].map((h, i) => (
                                <div key={i} className="w-full bg-[#FAF9F6] rounded-t-lg relative group">
                                    <div
                                        className="absolute bottom-0 w-full bg-[#E89BA7] rounded-t-lg transition-all duration-500 hover:bg-[#D68A96]"
                                        style={{ height: `${h}%` }}
                                    ></div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between mt-4 text-xs text-gray-400 px-2">
                            <span>1 Dec</span>
                            <span>15 Dec</span>
                            <span>30 Dec</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-[#4A3B40] mb-4">Outreach Performance</h3>
                            <div className="flex items-center justify-center h-40">
                                <div className="relative w-32 h-32 rounded-full border-8 border-gray-100 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-[#4A3B40]">62%</div>
                                        <div className="text-[10px] text-gray-400">Response</div>
                                    </div>
                                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                        <circle cx="64" cy="64" r="60" fill="none" stroke="#4A3B40" strokeWidth="8" strokeDasharray="377" strokeDashoffset="140" strokeLinecap="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-[#4A3B40] mb-4">Top Sources</h3>
                            <div className="space-y-3">
                                {[
                                    { name: 'Instagram', val: '45%' },
                                    { name: 'Referral', val: '30%' },
                                    { name: 'Website', val: '15%' },
                                ].map(s => (
                                    <div key={s.name} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{s.name}</span>
                                        <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full">
                                            <div className="h-full bg-[#4A3B40] rounded-full" style={{ width: s.val }}></div>
                                        </div>
                                        <span className="text-sm font-bold text-[#4A3B40]">{s.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Activity Feed */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                    <h2 className="text-lg font-bold text-[#4A3B40] mb-6">Latest Activity</h2>
                    <div className="space-y-6">
                        {recentLeads.map((lead) => (
                            <div key={lead.id} className="flex gap-4">
                                <div className="mt-1 min-w-[32px] h-8 rounded-full bg-[#FAF9F6] flex items-center justify-center text-[#4A3B40] border border-gray-200">
                                    <MessageSquare size={14} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#4A3B40]">
                                        <span className="font-bold">{lead.name}</span> submitted an inquiry.
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                        {/* Mock Activities */}
                        <div className="flex gap-4 opacity-70">
                            <div className="mt-1 min-w-[32px] h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                                <Send size={14} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#4A3B40]">
                                    You sent a proposal to <span className="font-bold">Lumina Skin</span>.
                                </p>
                                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                            </div>
                        </div>
                        <div className="flex gap-4 opacity-70">
                            <div className="mt-1 min-w-[32px] h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 border border-green-100">
                                <Users size={14} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-[#4A3B40]">
                                    New client added: <span className="font-bold">Studio 88</span>.
                                </p>
                                <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-8 py-3 text-sm text-[#4A3B40] bg-[#FAF9F6] rounded-xl hover:bg-gray-100 transition-colors font-medium">
                        View Full History
                    </button>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, trend, icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl bg-${color}-50`}>
                {icon}
            </div>
            {trend && (
                <div className="flex items-center space-x-1 text-xs font-semibold bg-green-50 text-green-700 px-2 py-1 rounded-full">
                    <ArrowUpRight size={12} />
                    <span>{trend}</span>
                </div>
            )}
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-[#4A3B40] mt-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
    </div>
);

const ActionBtn = ({ icon, label, onClick }: any) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-xl hover:border-[#E89BA7] hover:shadow-md transition-all group">
        <div className="text-gray-400 group-hover:text-[#E89BA7] mb-2 transition-colors">{icon}</div>
        <span className="text-xs font-semibold text-gray-600 group-hover:text-[#4A3B40]">{label}</span>
    </button>
);

export default Dashboard;
