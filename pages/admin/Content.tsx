import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Link2, Plus, ExternalLink, Copy, MoreHorizontal, Trash2, X } from 'lucide-react';

const Content = () => {
    const [links, setLinks] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [newLink, setNewLink] = useState({ name: '', url: '', type: 'Portfolio' });

    useEffect(() => {
        fetchLinks();
    }, []);

    const fetchLinks = async () => {
        const { data } = await supabase.from('tracked_links').select('*').order('created_at', { ascending: false });
        if (data) setLinks(data);
        setLoading(false);
    };

    const handleCreateLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('tracked_links').insert([newLink]);
        if (!error) {
            setIsModalOpen(false);
            setNewLink({ name: '', url: '', type: 'Portfolio' });
            fetchLinks();
        } else {
            alert('Error creating link');
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure?')) {
            await supabase.from('tracked_links').delete().eq('id', id);
            fetchLinks();
        }
    };

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('Copied to clipboard!');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Content & Links</h1>
                    <p className="text-gray-500">Manage your tracking links and content resources.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center space-x-2 bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg hover:bg-[#644B52] transition-colors"
                >
                    <Plus size={18} />
                    <span>Create New Link</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link) => (
                    <div key={link.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-brand-pink/10 rounded-xl text-brand-pink">
                                <Link2 size={24} />
                            </div>
                            <button
                                onClick={() => handleDelete(link.id)}
                                className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        <h3 className="font-bold text-lg text-[#4A3B40] mb-1">{link.name}</h3>
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:underline flex items-center space-x-1 mb-6 truncate">
                            <span>{link.url}</span>
                            <ExternalLink size={12} />
                        </a>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div className="text-sm">
                                <span className="font-bold text-[#4A3B40]">{link.clicks || 0}</span>
                                <span className="text-gray-400 ml-1">Clicks</span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(link.url)}
                                className="text-xs font-medium text-gray-500 hover:text-[#4A3B40] flex items-center space-x-1"
                            >
                                <Copy size={12} />
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-md rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[#4A3B40]">Add New Link</h3>
                            <button onClick={() => setIsModalOpen(false)}><X size={24} /></button>
                        </div>
                        <form onSubmit={handleCreateLink} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                <input
                                    className="w-full border rounded-lg p-2"
                                    value={newLink.name}
                                    onChange={e => setNewLink({ ...newLink, name: e.target.value })}
                                    required
                                    placeholder="e.g. Summer Campaign"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destination URL</label>
                                <input
                                    className="w-full border rounded-lg p-2"
                                    value={newLink.url}
                                    onChange={e => setNewLink({ ...newLink, url: e.target.value })}
                                    required
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                <select
                                    className="w-full border rounded-lg p-2"
                                    value={newLink.type}
                                    onChange={e => setNewLink({ ...newLink, type: e.target.value })}
                                >
                                    <option>Portfolio</option>
                                    <option>Booking</option>
                                    <option>Social</option>
                                    <option>Resource</option>
                                </select>
                            </div>
                            <button type="submit" disabled={loading} className="w-full bg-[#4A3B40] text-white py-3 rounded-xl font-bold">
                                {loading ? 'Creating...' : 'Create Link'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Content;
