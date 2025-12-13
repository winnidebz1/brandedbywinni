import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart, TrendingUp, Users, Globe, MousePointer } from 'lucide-react';

const Analytics = () => {
    const [stats, setStats] = useState({
        totalVisits: 0,
        uniqueVisitors: 0,
        conversionRate: 0,
        topSources: [] as any[],
        topPages: [] as any[]
    });

    useEffect(() => {
        const loadAnalytics = async () => {
            // 1. Fetch Visits
            const { data: visits } = await supabase.from('site_visits').select('*');

            // 2. Fetch Leads Count for Conversion Rate
            const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });

            if (visits) {
                const total = visits.length;
                const unique = new Set(visits.map((v: any) => v.referrer)).size; // Simple unique check proxy
                const rate = total > 0 ? ((leadsCount || 0) / total) * 100 : 0;

                // Process Sources
                const sources: any = {};
                visits.forEach((v: any) => {
                    const src = v.referrer || 'Direct';
                    sources[src] = (sources[src] || 0) + 1;
                });
                const topSources = Object.entries(sources)
                    .sort(([, a]: any, [, b]: any) => b - a)
                    .slice(0, 4)
                    .map(([name, count]: any) => ({ name, count, percent: Math.round((count / total) * 100) }));

                // Process Pages
                const pages: any = {};
                visits.forEach((v: any) => {
                    const p = v.page_path || '/';
                    pages[p] = (pages[p] || 0) + 1;
                });
                const topPages = Object.entries(pages)
                    .sort(([, a]: any, [, b]: any) => b - a)
                    .slice(0, 5)
                    .map(([path, views]) => ({ path, views }));

                setStats({
                    totalVisits: total,
                    uniqueVisitors: unique,
                    conversionRate: rate,
                    topSources,
                    topPages
                });
            }
        };

        // Mock data loading if table is empty (for demo purposes) or load real
        loadAnalytics();
    }, []);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Analytics & Traffic</h1>
                <p className="text-gray-500">Track website performance and outreach conversion metrics.</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MetricCard
                    title="Page Views (All Time)"
                    value={stats.totalVisits}
                    icon={<TrendingUp size={20} />}
                    color="blue"
                    trend="+--"
                />
                <MetricCard
                    title="Unique Sources"
                    value={stats.uniqueVisitors}
                    icon={<Users size={20} />}
                    color="purple"
                    trend="--"
                />
                <MetricCard
                    title="Conversion Rate"
                    value={stats.conversionRate.toFixed(2) + '%'}
                    icon={<MousePointer size={20} />}
                    color="pink"
                    trend="Based on leads/visits"
                />
            </div>

            {/* Visuals */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#4A3B40] mb-6">Traffic Sources</h3>
                    <div className="space-y-4">
                        {stats.topSources.map((source, i) => (
                            <div key={source.name} className="flex items-center">
                                <span className="w-24 text-sm text-gray-500 truncate" title={source.name}>{source.name}</span>
                                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden mx-2">
                                    <div className="h-full bg-[#E89BA7]" style={{ width: `${source.percent}%` }}></div>
                                </div>
                                <span className="w-12 text-right text-sm font-medium text-[#4A3B40]">{source.percent}%</span>
                            </div>
                        ))}
                        {stats.topSources.length === 0 && <p className="text-gray-400">No data collected yet.</p>}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#4A3B40] mb-6">Top Performing Pages</h3>
                    <div className="space-y-4">
                        {stats.topPages.map((page) => (
                            <div key={page.path} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-sm font-medium text-[#4A3B40] font-mono">{page.path}</span>
                                <span className="text-sm text-gray-500">{page.views} views</span>
                            </div>
                        ))}
                        {stats.topPages.length === 0 && <p className="text-gray-400">No data collected yet.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, icon, color, trend }: any) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 font-medium">{title}</h3>
            <div className={`p-2 bg-${color}-50 text-${color}-600 rounded-lg`}>
                {icon}
            </div>
        </div>
        <p className="text-3xl font-bold text-[#4A3B40]">{value}</p>
        <p className="text-sm text-gray-400 mt-2">{trend}</p>
    </div>
);

export default Analytics;
