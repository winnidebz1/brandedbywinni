```javascript
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';
import {
    Users, MessageSquare, BarChart2,
    Plus, Send
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        totalLeads: 0,
        newLeadsThisWeek: 0,
        activeClients: 0, // closed
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
        const startOfToday = new Date(new Date().setHours(0,0,0,0));

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

        // 2. Traffic Stats Today
        const { data: visitsTodayData } = await supabase
            .from('site_visits')
            .select('country, referrer')
            .gte('created_at', startOfToday.toISOString());

        const visitsTodayParams = visitsTodayData ? visitsTodayData.length : 0;

        // 3. Process Daily Analytics
        if (visitsTodayData) {
            const countryCount: any = {};
            const sourceCount: any = {};

            visitsTodayData.forEach((v: any) => {
                const c = v.country || 'Unknown';
                countryCount[c] = (countryCount[c] || 0) + 1;
                const s = v.referrer || 'Direct';
                sourceCount[s] = (sourceCount[s] || 0) + 1;
            });

            // Helper to sort and map
            const process = (obj: any) => Object.entries(obj)
                .sort(([,a]:any, [,b]:any) => b - a)
                .slice(0, 4)
                .map(([name, count]: any) => ({ name, count, percent: Math.round((count/visitsTodayParams)*100) }));

            setTopCountries(process(countryCount));
            setTopSources(process(sourceCount));
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
            visitsToday: visitsTodayParams
        });

        if (leads) setRecentLeads(leads);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const QuickActionFunc = (action: string) => {
        switch(action) {
            case 'Add Lead':
                navigate('/admin/leads'); 
                break;
            case 'Log Outreach':
                navigate('/admin/leads'); // In Leads page, user uses the side panel
                break;
            case 'Generate Report':
                window.print(); 
                break;
        }
    };

    if (loading) return <div className="p-8 text-gray-400 animate-pulse">Loading dashboard...</div>;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Overview</h1>
            </div>

            {/* Quick Actions Row - Minimal */}
            <div className="flex gap-3">
                <ActionBtn icon={<Plus size={18} />} label="Add Lead" onClick={() => QuickActionFunc('Add Lead')} />
                <ActionBtn icon={<Send size={18} />} label="Log Outreach" onClick={() => QuickActionFunc('Log Outreach')} />
                <ActionBtn icon={<BarChart2 size={18} />} label="Report" onClick={() => QuickActionFunc('Generate Report')} />
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Leads"
                    value={stats.totalLeads}
                    icon={<Users className="text-blue-500" />}
                    color="blue"
                />
                <StatCard
                    title="New Leads (Week)"
                    value={stats.newLeadsThisWeek}
                    icon={<MessageSquare className="text-purple-500" />}
                    color="purple"
                />
                <StatCard
                    title="Active Clients"
                    value={stats.activeClients}
                    icon={<Users className="text-pink-500" />}
                    color="pink"
                />
                <StatCard
                    title="Daily Views"
                    value={stats.visitsToday}
                    icon={<BarChart2 className="text-green-500" />}
                    color="green"
                />
            </div>

            {/* Analytics Lists & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Countries */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#4A3B40] mb-4 text-sm uppercase tracking-wider">Daily Visitor Countries</h3>
                        <div className="space-y-3">
                            {topCountries.map(s => (
                                <div key={s.name} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 font-medium">{s.name}</span>
                                    <span className="text-sm font-bold text-[#4A3B40]">{s.count}</span>
                                </div>
                            ))}
                            {topCountries.length === 0 && <p className="text-sm text-gray-400 italic">No data available yet</p>}
                        </div>
                    </div>
                    
                    {/* Top Sources */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-[#4A3B40] mb-4 text-sm uppercase tracking-wider">Daily Top Sources</h3>
                        <div className="space-y-3">
                            {topSources.map(s => (
                                <div key={s.name} className="flex justify-between items-center">
                                    <span className="text-sm text-gray-600 font-medium">{s.name}</span>
                                    <span className="text-sm font-bold text-[#4A3B40]">{s.percent}%</span>
                                </div>
                            ))}
                            {topSources.length === 0 && <p className="text-sm text-gray-400 italic">No data available yet</p>}
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

const StatCard = ({ title, value, icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
            <div className={`p - 3 rounded - xl bg - ${ color } -50 text - ${ color } -600`}>
                {icon}
            </div>
        </div>
        <div>
            <p className="text-gray-500 text-sm font-medium">{title}</p>
            <p className="text-3xl font-bold text-[#4A3B40] mt-1">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        </div>
    </div>
);

const ActionBtn = ({ icon, label, onClick }: any) => (
    <button onClick={onClick} className="flex items-center space-x-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 hover:border-[#E89BA7] transition-all group shadow-sm">
        <div className="text-gray-400 group-hover:text-[#E89BA7] transition-colors">{icon}</div>
        <span className="text-sm font-bold text-gray-600 group-hover:text-[#4A3B40]">{label}</span>
    </button>
);

export default Dashboard;
```
