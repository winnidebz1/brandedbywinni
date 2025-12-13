import React from 'react';
import { User, Bell, Palette, Lock, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <div className="space-y-8 max-w-4xl">
            <div>
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Settings</h1>
                <p className="text-gray-500">Customize your admin dashboard and preferences.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
                {/* Profile Section */}
                <div className="p-8">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-[#4A3B40] rounded-full flex items-center justify-center text-[#FAF9F6] text-2xl font-serif">
                                W
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-[#4A3B40]">Admin Profile</h3>
                                <p className="text-gray-500 text-sm">Manage your account details</p>
                            </div>
                        </div>
                        <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 font-medium text-[#4A3B40]">Edit Profile</button>
                    </div>
                </div>

                {/* Preferences */}
                <div className="p-8 space-y-6">
                    <h3 className="font-bold text-[#4A3B40]">App Preferences</h3>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Bell size={20} /></div>
                            <div>
                                <p className="font-medium text-[#4A3B40]">Email Notifications</p>
                                <p className="text-xs text-gray-400">Receive emails for new leads</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
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
                        <select className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                            <option>Winni Default</option>
                            <option>Dark Mode</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
