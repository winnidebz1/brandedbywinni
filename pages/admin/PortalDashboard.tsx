import React from 'react';
import { LayoutDashboard, Clock, CheckSquare, Bell, User } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useProfile } from '../../hooks/useProfile';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

const PortalDashboard = () => {
    const navigate = useNavigate();
    const { profile, isAdmin } = useProfile();
    const [stats, setStats] = React.useState({ pending: 0, completed: 0, activeProjects: 0 });
    const [recentTasks, setRecentTasks] = React.useState<any[]>([]);
    const [announcements, setAnnouncements] = React.useState<any[]>([]);
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

                // 3. Fetch New Announcements (for Notification Count)
                // If founder, they don't see notifications
                if (profile.role === 'founder') {
                    setAnnouncements([]);
                } else {
                    const lastView = profile.last_announcement_view || '1970-01-01T00:00:00.000Z';
                    const { data: announcementData } = await supabase
                        .from('announcements')
                        .select('id, created_at')
                        .eq('is_active', true)
                        .gt('created_at', lastView)
                        .order('created_at', { ascending: false });

                    setAnnouncements(announcementData || []);
                }

            } catch (error) {
                console.error('Error loading dashboard:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        fetchDashboardData();
    }, [profile]);

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
                            onClick={() => navigate('/portal/announcements')}
                            className="p-3 bg-white rounded-full shadow-sm border border-brand-muted/20 hover:scale-105 transition-transform text-brand-dark relative"
                        >
                            <Bell size={24} />
                            {announcements.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-brand-pink text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-brand-ivory">
                                    {announcements.length}
                                </span>
                            )}
                        </button>
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
