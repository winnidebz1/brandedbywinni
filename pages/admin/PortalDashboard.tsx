import React from 'react';
import { LayoutDashboard, Clock, CheckSquare, AlertCircle } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useProfile } from '../../hooks/useProfile';
import { Link } from 'react-router-dom';

const PortalDashboard = () => {
    const { profile, isAdmin } = useProfile();

    const stats = [
        { label: 'Pending Tasks', value: '12', icon: <Clock size={24} />, color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Completed', value: '45', icon: <CheckSquare size={24} />, color: 'bg-green-100 text-green-600' },
        { label: 'Overdue', value: '3', icon: <AlertCircle size={24} />, color: 'bg-red-100 text-red-600' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-brand-deepPlum">
                        Hello, {profile?.full_name?.split(' ')[0] || 'Team Member'}! 👋
                    </h1>
                    <p className="text-brand-muted mt-2">
                        {isAdmin ? "Here's what's happening at Branded By Winni today." : "Ready to create some magic?"}
                    </p>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-brand-softPink/20 text-sm font-medium text-brand-deepPlum">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <Card key={stat.label} className="flex items-center space-x-4 hover:scale-105 transition-transform">
                        <div className={`p-4 rounded-xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-brand-muted font-medium uppercase tracking-wide">{stat.label}</p>
                            <p className="text-3xl font-bold text-brand-deepPlum">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity / Tasks */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-brand-deepPlum">Priority Tasks</h2>
                        <Link to="/portal/tasks" className="text-sm font-medium text-brand-primaryPink hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="flex items-center justify-between p-4 cursor-pointer hover:bg-brand-softBlush/10">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-2 h-12 rounded-full ${i === 1 ? 'bg-red-500' : 'bg-brand-primaryPink'}`}></div>
                                    <div>
                                        <h4 className="font-bold text-brand-deepPlum">Website Mockup for Client X</h4>
                                        <p className="text-xs text-brand-muted">Due: Feb {10 + i}, 2024</p>
                                    </div>
                                </div>
                                <Badge variant={i === 1 ? 'warning' : 'default'}>{i === 1 ? 'Urgent' : 'In Progress'}</Badge>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Announcements / SOP Spotlight */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-brand-deepPlum">Announcements & Tips</h2>
                    </div>

                    <Card className="bg-brand-deepPlum text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <Badge className="bg-white/20 text-white mb-4">New SOP</Badge>
                            <h3 className="text-2xl font-bold mb-2">Updated Design Guidelines</h3>
                            <p className="opacity-90 mb-6 text-sm">We've updated the file naming conventions and color usage rules. Please review them before your next submission.</p>
                            <Button className="bg-white text-brand-deepPlum hover:bg-brand-softBlush">Read Now</Button>
                        </div>
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-brand-primaryPink rounded-full blur-2xl opacity-50 transform translate-x-10 translate-y-10"></div>
                    </Card>

                    <Card>
                        <h3 className="font-bold text-brand-deepPlum mb-2">Quote of the Day</h3>
                        <p className="italic text-brand-muted">"Design is the silent ambassador of your brand." - Paul Rand</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PortalDashboard;
