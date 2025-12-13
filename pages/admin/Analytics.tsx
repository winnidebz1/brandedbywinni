import React from 'react';
import { BarChart, TrendingUp, Users, Globe, MousePointer } from 'lucide-react';

const Analytics = () => {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Analytics & Traffic</h1>
                <p className="text-gray-500">Track website performance and outreach conversion metrics.</p>
            </div>

            {/* Placeholder Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-gray-500 font-medium">Page Views (30d)</h3>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-[#4A3B40]">1,248</p>
                    <p className="text-sm text-green-500 flex items-center mt-2">
                        <span>+12.5%</span>
                        <span className="text-gray-400 ml-1">vs last month</span>
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-gray-500 font-medium">Unique Visitors</h3>
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                            <Users size={20} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-[#4A3B40]">856</p>
                    <p className="text-sm text-green-500 flex items-center mt-2">
                        <span>+5.3%</span>
                        <span className="text-gray-400 ml-1">vs last month</span>
                    </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-gray-500 font-medium">Conversion Rate</h3>
                        <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
                            <MousePointer size={20} />
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-[#4A3B40]">3.2%</p>
                    <p className="text-sm text-red-400 flex items-center mt-2">
                        <span>-0.4%</span>
                        <span className="text-gray-400 ml-1">vs last month</span>
                    </p>
                </div>
            </div>

            {/* Placeholder Visuals (Usually would be Recharts or similar) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#4A3B40] mb-6">Traffic Sources</h3>
                    <div className="space-y-4">
                        {['Instagram', 'Direct', 'Google', 'LinkedIn'].map((source, i) => (
                            <div key={source} className="flex items-center">
                                <span className="w-24 text-sm text-gray-500">{source}</span>
                                <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#E89BA7]" style={{ width: `${80 - (i * 20)}%` }}></div>
                                </div>
                                <span className="w-12 text-right text-sm font-medium text-[#4A3B40]">{80 - (i * 20)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="font-bold text-[#4A3B40] mb-6">Top Performing Pages</h3>
                    <div className="space-y-4">
                        {[
                            { path: '/', views: '2.4k' },
                            { path: '/portfolio', views: '1.1k' },
                            { path: '/services', views: '850' },
                            { path: '/contact', views: '420' }
                        ].map((page, i) => (
                            <div key={page.path} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                <span className="text-sm font-medium text-[#4A3B40] font-mono">{page.path}</span>
                                <span className="text-sm text-gray-500">{page.views} views</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
