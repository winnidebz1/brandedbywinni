import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
    Users, FileText, MessageSquare, BarChart2,
    ArrowUpRight, Plus, Send, RefreshCw, Calendar, Globe
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalLeads: 0,
        newLeadsThisWeek: 0,
        activeClients: 0,
        visitsMonth: 0,
        visitsToday: 0
    });
    const [recentLeads, setRecentLeads] = useState<any[]>([]);
    const [topCountries, setTopCountries] = useState<any[]>([]);
    const [topSources, setTopSources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        const now = new Date();
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        const startOfMonth = new Date(new Date().setDate(new Date().getDate() - 30));
        const startOfToday = new Date(new Date().setHours(0, 0, 0, 0));

        // 1. Leads Stats
        const { count: totalLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true });

        const { count: newLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfWeek.toISOString());

        const { count: activeClients } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'closed');

        // 2. Traffic Stats
        const { count: visitsMonth } = await supabase
            .from('site_visits')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', startOfMonth.toISOString());

        // We need the data for today to calculate countries/sources
        const { data: visitsTodayData } = await supabase
            .from('site_visits')
            .select('country, referrer')
            .gte('created_at', startOfToday.toISOString());

        const visitsTodayParams = visitsTodayData ? visitsTodayData.length : 0;

        // 3. Process Daily Analytics (Countries & Sources)
        if (visitsTodayData) {
            // Countries
            const countryCount: any = {};
            // Sources
            const sourceCount: any = {};

            visitsTodayData.forEach((v: any) => {
                const c = v.country || 'Unknown';
                countryCount[c] = (countryCount[c] || 0) + 1;

                const s = v.referrer || 'Direct';
                sourceCount[s] = (sourceCount[s] || 0) + 1;
            });

            // Sort & Map Countries
            const sortedCountries = Object.entries(countryCount)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 4)
                .map(([name, count]: any) => ({ name, count, percent: Math.round((count / visitsTodayParams) * 100) }));
            setTopCountries(sortedCountries);

            // Sort & Map Sources
            const sortedSources = Object.entries(sourceCount)
                .sort(([, a]: any, [, b]: any) => b - a)
                .slice(0, 4)
                .map(([name, count]: any) => ({ name, count, percent: Math.round((count / visitsTodayParams) * 100) }));
            setTopSources(sortedSources);
        }

        // 4. Recent Leads
        const { data: leads } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);

        setStats({
            totalLeads: totalLeads || 0,
            newLeadsThisWeek: newLeads || 0,
            activeClients: activeClients || 0,
            visitsMonth: visitsMonth || 0,
            visitsToday: visitsTodayParams
        });

        if (leads) setRecentLeads(leads);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const QuickActionFunc = (action: string) => {
        switch (action) {
            case 'Add Lead':
                // Instead of a complex modal here, we can redirect or show a simple prompt
                // For a robust app, a global modal context is better. Here we use a simple redirect.
                // Or better: Use a simple javascript prompt for quick entry if just name/email
                // But user wants FUNCTIONAL. Best is redirect to the specialized page.
                navigate('/admin/leads');
                break;
            case 'Log Outreach':
                navigate('/admin/leads');
                break;
            case 'Add Client':
                navigate('/admin/clients');
                break;
            case 'Add Project':
                navigate('/admin/projects');
                break;
            case 'Generate Report':
                window.print(); // Simple functional report for now
                break;
            case 'New Entry':
                navigate('/admin/leads');
                break;
        }
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
                    <button
                        onClick={loadData}
                        className="flex items-center space-x-2 bg-white border border-gray-200 text-[#4A3B40] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium"
                    >
                        <RefreshCw size={16} />
                        <span>Sync Data</span>
                    </button>
                    <button
                        onClick={() => QuickActionFunc('New Entry')}
                        className="flex items-center space-x-2 bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg hover:bg-[#644B52] transition-colors shadow-lg shadow-[#4A3B40]/20 text-sm font-medium"
                    >
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
                    trend="Lifetime"
                    icon={<Users className="text-blue-500" />}
                    color="blue"
                />
                <StatCard
                    title="New Leads (Week)"
                    value={stats.newLeadsThisWeek}
                    trend="Since Monday"
                    icon={<MessageSquare className="text-purple-500" />}
                    color="purple"
                />
                <StatCard
                    title="Active Clients"
                    value={stats.activeClients}
                    trend="Currently"
                    icon={<Users className="text-pink-500" />}
                    color="pink"
                />
                <StatCard
                    title="Daily Views"
                    value={stats.visitsToday}
                    trend="Today (Resets Midnight)"
                    icon={<BarChart2 className="text-green-500" />}
                    color="green"
                />
            </div>

            {/* Two Column Layout: Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Charts/Traffic */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-[#4A3B40]">Traffic Overview</h2>
                            <span className="text-sm text-gray-500">Monthly Visits: {stats.visitsMonth}</span>
                        </div>
                        {/* Simple Bar Visual */}
                        <div className="h-64 flex items-end justify-between space-x-2 px-4 border-b border-gray-100 pb-2">
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
                            <span>Start of Month</span>
                            <span>Mid Month</span>
                            <span>Today</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Countries */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-[#4A3B40] mb-4 flex items-center">
                                <Globe size={16} className="mr-2" /> Daily Visitor Countries
                            </h3>
                            <div className="space-y-3">
                                {topCountries.map(s => (
                                    <div key={s.name} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{s.name}</span>
                                        <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full">
                                            <div className="h-full bg-[#4A3B40] rounded-full" style={{ width: `${s.percent}%` }}></div>
                                        </div>
                                        <span className="text-sm font-bold text-[#4A3B40]">{s.count}</span>
                                    </div>
                                ))}
                                {topCountries.length === 0 && <p className="text-sm text-gray-400">No visits today yet.</p>}
                            </div>
                        </div>

                        {/* Top Sources */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="font-bold text-[#4A3B40] mb-4">Daily Top Sources</h3>
                            <div className="space-y-3">
                                {topSources.map(s => (
                                    <div key={s.name} className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">{s.name}</span>
                                        <div className="flex-1 mx-3 h-2 bg-gray-100 rounded-full">
                                            <div className="h-full bg-[#E89BA7] rounded-full" style={{ width: `${s.percent}%` }}></div>
                                        </div>
                                        <span className="text-sm font-bold text-[#4A3B40]">{s.percent}%</span>
                                    </div>
                                ))}
                                {topSources.length === 0 && <p className="text-sm text-gray-400">No referral data today.</p>}
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
                        {recentLeads.length === 0 && <p className="text-gray-400">No activity yet.</p>}
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
            <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
                {icon}
            </div>
            {trend && (
                <div className="flex items-center space-x-1 text-[10px] font-semibold bg-gray-50 text-gray-500 px-2 py-1 rounded-full">
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
