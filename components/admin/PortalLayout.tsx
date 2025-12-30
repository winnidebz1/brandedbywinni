import React, { useState } from 'react';
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
    ChevronRight
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const PortalLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { profile, isAdmin } = useProfile();
    const [isSopsOpen, setIsSopsOpen] = useState(false);

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

    if (isAdmin) {
        navItems.push({ name: 'Settings', path: '/portal/settings', icon: <Settings size={20} /> });
    }

    return (
        <div className="flex h-screen bg-brand-softBlush font-sans text-brand-deepPlum">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-brand-deepPlum/50 z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-white/90 backdrop-blur-md border-r border-brand-softPink/20 transform transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
                <div className="p-6 flex justify-between items-center border-b border-brand-softGray/50">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-bold font-serif text-brand-primaryPink tracking-wide">Winni Portal</h1>
                        <span className="text-xs uppercase tracking-widest text-brand-muted mt-1">{profile?.role === 'founder' ? 'Founder Edition' : 'Team Portal'}</span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-brand-deepPlum">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path || (item.path !== '/portal' && location.pathname.startsWith(item.path))
                                ? 'bg-brand-primaryPink text-white shadow-lg shadow-brand-primaryPink/30'
                                : 'hover:bg-brand-softBlush text-brand-deepPlum hover:text-brand-primaryPink'
                                }`}
                        >
                            <span className={`group-hover:scale-110 transition-transform ${location.pathname === item.path ? 'text-white' : 'text-brand-primaryPink'
                                }`}>{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}

                    {/* SOP Dropdown */}
                    <div className="pt-2">
                        <button
                            onClick={() => setIsSopsOpen(!isSopsOpen)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 hover:bg-brand-softBlush text-brand-deepPlum hover:text-brand-primaryPink ${isSopsOpen ? 'bg-brand-softBlush' : ''}`}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-brand-primaryPink"><FileText size={20} /></span>
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
                                        className="block py-2 px-3 text-sm text-brand-deepPlum/80 hover:text-brand-primaryPink hover:bg-white rounded-lg transition-colors"
                                    >
                                        {sop}
                                    </Link>
                                ))}
                                <Link to="/portal/sops" className="block py-2 px-3 text-xs font-bold uppercase tracking-wider text-brand-primaryPink mt-2">View All SOPs →</Link>
                            </div>
                        )}
                    </div>
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-brand-softGray/50 bg-white/50 backdrop-blur-sm">
                    <div className="flex items-center mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-brand-primaryPink text-white flex items-center justify-center font-bold text-lg shadow-md">
                            {profile?.full_name?.charAt(0) || 'U'}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-bold text-brand-deepPlum truncate">{profile?.full_name || 'User'}</p>
                            <p className="text-xs text-brand-muted truncate capitalize">{profile?.role?.replace('_', ' ') || 'Team Member'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center space-x-2 w-full py-2 rounded-lg border border-brand-deepPlum/10 hover:bg-red-50 text-red-400 hover:text-red-500 transition-colors text-sm font-medium"
                    >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-brand-softBlush relative">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primaryPink/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accentGold/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>

                {/* Mobile Header */}
                <header className="md:hidden bg-white/80 backdrop-blur-md p-4 shadow-sm flex items-center justify-between z-30 sticky top-0">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-brand-deepPlum">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-brand-deepPlum font-serif">Branded By Winni</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8 z-10 scrollbar-thin scrollbar-thumb-brand-primaryPink/20 scrollbar-track-transparent">
                    <div className="max-w-7xl mx-auto pb-20">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PortalLayout;
