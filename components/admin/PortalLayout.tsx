import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    CheckSquare,
    FolderOpen,
    FileText,
    Image as ImageIcon,
    MessageSquare,
    Bell,
    Users,
    LogOut,
    Menu,
    X,
    Settings,
    ChevronDown,
    ChevronRight,
    PieChart // Added icon
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const PortalLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { profile, isAdmin } = useProfile(); // Re-using existing destructuring, calculating access manually for safety
    const [isSopsOpen, setIsSopsOpen] = useState(false);

    // Announcement State (Lifted to Layout for Mobile Header access)
    const [announcements, setAnnouncements] = useState<any[]>([]);

    const isFinanceUser = profile?.role === 'founder' || profile?.role === 'accountant';

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const { data } = await supabase
                    .from('announcements')
                    .select('*, profiles(full_name)')
                    .eq('is_active', true)
                    .order('created_at', { ascending: false });

                if (data) setAnnouncements(data);
            } catch (error) {
                console.error('Error fetching announcements:', error);
            }
        };

        fetchAnnouncements();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/portal/login');
    };

    const navItems = [
        { name: 'Dashboard', path: '/portal', icon: <LayoutDashboard size={20} /> },
        { name: 'My Tasks', path: '/portal/tasks', icon: <CheckSquare size={20} /> },
        { name: 'Projects', path: '/portal/projects', icon: <FolderOpen size={20} /> },
        // SOPs handled separately for dropdown
        { name: 'Brand Assets', path: '/portal/assets', icon: <ImageIcon size={20} /> },
        { name: 'Feedback', path: '/portal/feedback', icon: <MessageSquare size={20} /> },
        { name: 'Team Rules', path: '/portal/rules', icon: <Users size={20} /> },
        { name: 'Announcements', path: '/portal/announcements', icon: <Bell size={20} /> },
    ];

    if (isFinanceUser) {
        navItems.splice(1, 0, { name: 'Finance', path: '/portal/finance', icon: <PieChart size={20} /> });
    }

    if (isAdmin) {
        navItems.push({ name: 'Settings', path: '/portal/settings', icon: <Settings size={20} /> });
    }

    return (
        <div className="flex h-screen bg-brand-ivory font-sans text-brand-dark">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-brand-dark/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-md border-r border-brand-pink/20 transform transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl flex flex-col`}>
                <div className="p-6 flex flex-col items-center justify-center border-b border-brand-muted/20 shrink-0">
                    <img
                        src="/Mainlogo.png"
                        alt="Branded By Winni"
                        className="h-16 w-auto object-contain mb-2"
                    />
                    <span className="text-[10px] uppercase tracking-widest text-brand-muted font-medium">{profile?.role === 'founder' ? 'Founder Portal' : 'Team Portal'}</span>

                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden absolute top-6 right-6 text-brand-dark">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-1 flex-1 overflow-y-auto custom-scrollbar">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path || (item.path !== '/portal' && location.pathname.startsWith(item.path))
                                ? 'bg-brand-pink text-white shadow-lg shadow-brand-pink/30'
                                : 'hover:bg-brand-ivory text-brand-dark hover:text-brand-pink'
                                }`}
                        >
                            <span className={`group-hover:scale-110 transition-transform ${location.pathname === item.path ? 'text-white' : 'text-brand-pink'
                                }`}>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}

                    {/* SOP Dropdown */}
                    <div className="pt-2">
                        <button
                            onClick={() => setIsSopsOpen(!isSopsOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 hover:bg-brand-ivory text-brand-dark hover:text-brand-pink ${isSopsOpen ? 'bg-brand-ivory' : ''}`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-brand-pink"><FileText size={20} /></span>
                                <span className="font-medium">SOPs & Guides</span>
                            </div>
                            {isSopsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>

                        {isSopsOpen && (
                            <div className="pl-12 pr-2 py-2 space-y-1 animate-fadeIn">
                                {['Company Overview', 'Team Expectations', 'Design SOPs', 'Content SOPs'].map((sop) => (
                                    <Link
                                        key={sop}
                                        to={`/portal/sops/${sop.toLowerCase().replace(/ /g, '-')}`}
                                        className="block py-2 px-3 text-sm text-brand-dark/80 hover:text-brand-pink hover:bg-white rounded-lg transition-colors"
                                    >
                                        {sop}
                                    </Link>
                                ))}
                                <Link to="/portal/sops" className="block py-2 px-3 text-xs font-bold uppercase tracking-wider text-brand-pink mt-2">View All SOPs →</Link>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="w-full p-4 border-t border-brand-muted/20 bg-white/50 backdrop-blur-sm shrink-0">
                    <div className="flex items-center mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-brand-pink text-white flex items-center justify-center font-bold text-lg shadow-md">
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-bold text-brand-dark truncate">{profile?.full_name || 'User'}</p>
                            <p className="text-xs text-brand-muted truncate capitalize">{profile?.role?.replace('_', ' ') || 'Team Member'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center space-x-2 w-full py-2 rounded-lg border border-brand-dark/10 hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors text-sm font-medium"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-brand-ivory relative">
                {/* Decorative Background Elements - UPDATED to match site aesthetic */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-pink/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-pink/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

                {/* Mobile Header */}
                <header className="md:hidden bg-white/80 backdrop-blur-md p-4 shadow-sm flex items-center justify-between z-30 sticky top-0">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-brand-dark">
                        <Menu size={24} />
                    </button>

                    {/* Mobile Notification Bell */}
                    <button
                        onClick={() => navigate('/portal/announcements')}
                        className="p-2 text-brand-dark relative"
                    >
                        <Bell size={24} />
                        {announcements.length > 0 && (
                            <span className="absolute top-0 right-0 bg-brand-pink text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border border-white">
                                {announcements.length}
                            </span>
                        )}
                    </button>
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8 z-10 scrollbar-thin scrollbar-thumb-brand-pink/20 scrollbar-track-transparent">
                    <div className="max-w-7xl mx-auto pb-20">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PortalLayout;
