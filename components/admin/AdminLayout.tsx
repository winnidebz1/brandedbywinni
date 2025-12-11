import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderOpen, Users, LogOut, Menu, X, MessageSquare, BarChart } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    // Notification Logic
    React.useEffect(() => {
        // Request permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        // Real-time subscription
        const channel = supabase
            .channel('public:leads')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'leads' },
                (payload) => {
                    // Show notification
                    if (Notification.permission === 'granted') {
                        new Notification('New Lead Received! 🚀', {
                            body: `${payload.new.name} sent a message regarding ${payload.new.service || 'inquiry'}.`,
                            icon: '/logo-icon.png'
                        });
                    }
                    // Optional: Play sound or toast
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const navItems = [
        { name: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={20} /> },
        { name: 'Projects', path: '/admin/projects', icon: <FolderOpen size={20} /> },
        { name: 'Testimonials', path: '/admin/testimonials', icon: <MessageSquare size={20} /> },
        { name: 'Leads', path: '/admin/leads', icon: <Users size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-[#FAF9F6]">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 bg-[#4A3B40] text-[#FAF9F6] transform transition-transform duration-200 ease-in-out z-30 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-[#FAF9F6]/20 flex justify-between items-center">
                    <h1 className="text-2xl font-bold font-serif">Winni Admin</h1>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden">
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path))
                                ? 'bg-[#E89BA7] text-[#4A3B40] font-semibold'
                                : 'hover:bg-[#E89BA7]/20'
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-0 w-full p-4 border-t border-[#FAF9F6]/20">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/20 text-red-300 transition-all font-medium"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden bg-white p-4 shadow-sm flex items-center justify-between">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-[#4A3B40]">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-[#4A3B40] font-serif">Branded By Winni</span>
                    <div className="w-6" /> {/* Spacer */}
                </header>

                <main className="flex-1 overflow-auto p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
