import React, { useState } from 'react';
import { Link2, Plus, ExternalLink, Copy, MoreHorizontal } from 'lucide-react';

const Content = () => {
    // Mock data for links
    const [links, setLinks] = useState([
        { id: 1, name: 'Portfolio 2024', url: 'https://brandedbywinni.com/portfolio', clicks: 124, type: 'Portfolio' },
        { id: 2, name: 'Booking Page', url: 'https://calendly.com/winni/consultation', clicks: 45, type: 'Booking' },
        { id: 3, name: 'Instagram Bio', url: 'https://brandedbywinni.com/links', clicks: 890, type: 'Social' },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Content & Links</h1>
                    <p className="text-gray-500">Manage your tracking links and content resources.</p>
                </div>
                <button className="flex items-center space-x-2 bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg hover:bg-[#644B52] transition-colors">
                    <Plus size={18} />
                    <span>Create New Link</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link) => (
                    <div key={link.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink">
                                <Link2 size={24} />
                            </div>
                            <button className="text-gray-400 hover:text-[#4A3B40]">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <h3 className="font-bold text-lg text-[#4A3B40] mb-1">{link.name}</h3>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:underline flex items-center space-x-1 mb-6 truncate">
                            <span>{link.url}</span>
                            <ExternalLink size={12} />
                        </a>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="text-sm">
                                <span className="font-bold text-[#4A3B40]">{link.clicks}</span>
                                <span className="text-gray-400 ml-1">Clicks</span>
                            </div>
                            <button className="text-xs font-medium text-gray-500 hover:text-[#4A3B40] flex items-center space-x-1">
                                <Copy size={12} />
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Content;
