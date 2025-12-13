import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Bell, Palette, Lock, Save, LogOut } from 'lucide-react';

const Settings = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notifications, setNotifications] = useState(localStorage.getItem('admin_notifications') === 'true');
    const [theme, setTheme] = useState(localStorage.getItem('admin_theme') || 'Winni Default');

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const updates: any = {};
        if (email) updates.email = email;
        if (password) updates.password = password;

        if (Object.keys(updates).length > 0) {
            const { error } = await supabase.auth.updateUser(updates);
            if (error) alert('Error updating profile: ' + error.message);
            else alert('Profile updated successfully!');
        }
        setLoading(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem('admin_notifications', String(notifications));
        localStorage.setItem('admin_theme', theme);
        alert('Preferences saved!');
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    };

    return (
        <div className="space-y-8 max-w-3xl">
            <div>
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Settings</h1>
                <p className="text-gray-500">Customize your admin dashboard and preferences.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {/* Profile Section */}
                <div className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-[#4A3B40] rounded-full flex items-center justify-center text-[#FAF9F6] text-2xl font-serif">
                            W
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-[#4A3B40]">Admin Profile</h3>
                            <button onClick={handleLogout} className="text-sm text-red-500 hover:underline flex items-center">
                                <LogOut size={14} className="mr-1" /> Sign Out
                            </button>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-md">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Update Email</label>
                            <div className="flex items-center border rounded-lg px-3 bg-gray-50">
                                <User size={18} className="text-gray-400 mr-2" />
                                <input
                                    type="email"
                                    className="w-full bg-transparent p-2 outline-none text-sm"
                                    placeholder="new-email@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                            <div className="flex items-center border rounded-lg px-3 bg-gray-50">
                                <Lock size={18} className="text-gray-400 mr-2" />
                                <input
                                    type="password"
                                    className="w-full bg-transparent p-2 outline-none text-sm"
                                    placeholder="Leave blank to keep current"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={loading || (!email && !password)}
                            className="px-4 py-2 bg-[#4A3B40] text-white rounded-lg text-sm font-medium hover:bg-opacity-90 disabled:opacity-50"
                        >
                            {loading ? 'Updating...' : 'Save Profile Changes'}
                        </button>
                    </form>
                </div>

                {/* Preferences */}
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-[#4A3B40]">App Preferences</h3>
                        <button onClick={handleSavePreferences} className="text-[#4A3B40] hover:bg-gray-50 p-2 rounded-lg transition-colors" title="Save Preferences">
                            <Save size={20} />
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={20} /></div>
                            <div>
                                <p className="font-medium text-[#4A3B40]">Email Notifications</p>
                                <p className="text-xs text-gray-400">Receive emails for new leads</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={notifications}
                                onChange={e => setNotifications(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A3B40]"></div>
                        </label>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Palette size={20} /></div>
                            <div>
                                <p className="font-medium text-[#4A3B40]">Theme</p>
                                <p className="text-xs text-gray-400">Custom admin appearance</p>
                            </div>
                        </div>
                        <select
                            value={theme}
                            onChange={e => setTheme(e.target.value)}
                            className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 outline-none"
                        >
                            <option>Winni Default</option>
                            <option>Dark Mode</option>
                            <option>High Contrast</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
