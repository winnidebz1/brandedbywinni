import React from 'react';
import { LayoutDashboard, Clock, CheckSquare, Bell, X, User } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useProfile } from '../../hooks/useProfile';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const PortalDashboard = () => {
    const { profile, isAdmin } = useProfile();
    const [stats, setStats] = React.useState({ pending: 0, completed: 0, activeProjects: 0 });
    const [recentTasks, setRecentTasks] = React.useState<any[]>([]);
    const [announcements, setAnnouncements] = React.useState<any[]>([]);
    const [showAnnouncements, setShowAnnouncements] = React.useState(false);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // 1. Fetch Stats
                const { count: pendingCount } = await supabase
                    .from('tasks')
                    .select('*', { count: 'exact', head: true })
                    .neq('status', 'approved'); // Assuming 'approved' is completed

                const { count: completedCount } = await supabase
                    .from('tasks')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'approved');

                const { count: projectCount } = await supabase
                    .from('internal_projects')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'active');

                setStats({
                    pending: pendingCount || 0,
                    completed: completedCount || 0,
                    activeProjects: projectCount || 0
                });

                // 2. Fetch Priority Tasks (Urgent/High first, then by deadline)
                // Note: sorting by multiple columns in Supabase JS client can be tricky if not indexed, but basic order works.
                // We'll just order by deadline for "Coming Up"
                const { data: tasksData } = await supabase
                    .from('tasks')
                    .select('*')
                    .neq('status', 'approved')
                    .order('deadline', { ascending: true })
                    .limit(3);

                setRecentTasks(tasksData || []);

                // 3. Fetch Announcements (all active)
                const { data: announcementData } = await supabase
                    .from('announcements')
                    .select('*, profiles(full_name)')
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                setAnnouncements(announcementData || []);

            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        { label: 'Pending Tasks', value: stats.pending, icon: <Clock size={24} />, color: 'bg-brand-ivory text-brand-pink border border-brand-pink/20' },
        { label: 'Completed', value: stats.completed, icon: <CheckSquare size={24} />, color: 'bg-green-50 text-green-600 border border-green-200' },
        { label: 'Active Projects', value: stats.activeProjects, icon: <LayoutDashboard size={24} />, color: 'bg-blue-50 text-blue-600 border border-blue-200' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-brand-dark">
                        Hello, {profile?.full_name?.split(' ')[0] || 'Team Member'}! 👋
                    </h1>
                    <p className="text-brand-muted mt-2">
                        {isAdmin ? "Here's what's happening at Branded By Winni today." : "Ready to create some magic?"}
                    </p>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowAnnouncements(!showAnnouncements)}
                            className="p-3 bg-white rounded-full shadow-sm border border-brand-muted/20 hover:scale-105 transition-transform text-brand-dark relative"
                        >
                            <Bell size={24} />
                            {announcements.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-brand-ivory">
                                    {announcements.length}
                                </span>
                            )}
                        </button>

                        {/* Announcements Popup */}
                        {showAnnouncements && (
                            <div className="absolute left-0 md:right-0 mt-4 w-80 md:w-96 max-w-[85vw] bg-white rounded-2xl shadow-2xl border border-brand-muted/10 z-50 overflow-hidden animate-fadeIn origin-top-left md:origin-top-right">
                                <div className="p-4 border-b border-brand-muted/10 flex justify-between items-center bg-brand-ivory/50">
                                    <h3 className="font-bold text-brand-dark flex items-center gap-2">
                                        <Bell size={16} className="text-brand-pink" />
                                        Announcements
                                    </h3>
                                    <button onClick={() => setShowAnnouncements(false)} className="text-brand-muted hover:text-brand-dark">
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="max-h-[400px] overflow-y-auto p-2 space-y-2">
                                    {announcements.length === 0 ? (
                                        <div className="p-8 text-center text-sm text-brand-muted">
                                            No announcements yet.
                                        </div>
                                    ) : (
                                        announcements.map((a) => (
                                            <div key={a.id} className="p-4 hover:bg-brand-pink/5 rounded-xl transition-colors border border-transparent hover:border-brand-pink/10 group">
                                                <div className="flex justify-between items-start mb-2">
                                                    {a.profiles?.full_name && (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-brand-pink px-2 py-0.5 rounded-full">
                                                            {a.profiles.full_name.split(' ')[0]}
                                                        </span>
                                                    )}
                                                    <span className="text-[10px] text-brand-muted">{new Date(a.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <h4 className="font-bold text-sm text-brand-dark mb-1 group-hover:text-brand-pink transition-colors">{a.title}</h4>
                                                <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed">{a.content}</p>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="p-3 border-t border-brand-muted/10 text-center bg-brand-ivory/50">
                                    <Link to="/portal/announcements" className="text-xs font-bold text-brand-pink hover:underline uppercase tracking-wide">
                                        View All & Manage
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block px-4 py-2 bg-white rounded-xl shadow-sm border border-brand-muted/20 text-sm font-medium text-brand-dark">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {statCards.map((stat) => (
                    <Card key={stat.label} className="flex items-center space-x-4 hover:scale-105 transition-transform">
                        <div className={`p-4 rounded-xl ${stat.color}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-xs text-brand-muted font-bold uppercase tracking-widest">{stat.label}</p>
                            <p className="text-3xl font-bold text-brand-dark">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity / Tasks */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-brand-dark">Upcoming Tasks</h2>
                        <Link to="/portal/tasks" className="text-sm font-medium text-brand-pink hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        {recentTasks.length === 0 ? (
                            <Card className="p-6 text-center text-brand-muted border-dashed">
                                <p>No upcoming tasks!</p>
                            </Card>
                        ) : (
                            recentTasks.map((task) => (
                                <Card key={task.id} className="flex items-center justify-between p-4 cursor-pointer hover:bg-brand-ivory transition-colors group">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-1.5 h-12 rounded-full ${task.priority === 'urgent' ? 'bg-red-500' : 'bg-brand-pink'}`}></div>
                                        <div>
                                            <h4 className="font-bold text-brand-dark group-hover:text-brand-pink transition-colors">{task.title}</h4>
                                            <p className="text-xs text-brand-muted">Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Date'}</p>
                                        </div>
                                    </div>
                                    <Badge variant={task.priority === 'urgent' || task.priority === 'high' ? 'warning' : 'default'}>
                                        {task.status.replace('_', ' ')}
                                    </Badge>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                {/* Daily Inspiration & Quick Links */}
                <div className="space-y-6">
                    <Card className="border-l-4 border-l-brand-pink h-full flex flex-col justify-center p-8 bg-gradient-to-br from-white to-brand-ivory">
                        <h3 className="font-bold text-brand-dark mb-4 text-xl">Daily Inspiration</h3>
                        <blockquote className="italic text-brand-muted text-lg leading-relaxed font-serif">
                            "Design is the silent ambassador of your brand."
                        </blockquote>
                        <p className="text-sm font-bold text-brand-pink mt-4">- Paul Rand</p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PortalDashboard;
