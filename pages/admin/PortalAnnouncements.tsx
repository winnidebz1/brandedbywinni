import React, { useEffect, useState } from 'react';
import { Bell, User, Plus, X, Trash2, Edit2 } from 'lucide-react';
import { Card, PageHeader, Badge, Button } from '../../components/portal/UI';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const PortalAnnouncements = () => {
    const { profile, isAdmin } = useProfile();
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form State
    const [editingId, setEditingId] = useState<string | null>(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchAnnouncements = async () => {
        try {
            const { data, error } = await supabase
                .from('announcements')
                .select('*, profiles(full_name)')
                .eq('is_active', true)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setAnnouncements(data || []);
        } catch (error) {
            console.error('Error fetching announcements:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    const handlePostAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingId) {
                const { error } = await supabase.from('announcements')
                    .update({ title, content })
                    .eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('announcements').insert({
                    title,
                    content,
                    author_id: profile?.id,
                    is_active: true
                });
                if (error) throw error;
            }

            setIsModalOpen(false);
            setEditingId(null);
            setTitle('');
            setContent('');
            fetchAnnouncements();
        } catch (error: any) {
            alert('Error saving announcement: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this announcement?')) return;
        try {
            const { error } = await supabase.from('announcements').delete().eq('id', id);
            if (error) throw error;
            fetchAnnouncements();
        } catch (error: any) {
            alert('Error deleting: ' + error.message);
        }
    };

    const openEditModal = (a: any) => {
        setEditingId(a.id);
        setTitle(a.title);
        setContent(a.content);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader
                title="Announcements"
                subtitle="Latest team updates."
                action={isAdmin && (
                    <Button onClick={() => {
                        setEditingId(null);
                        setTitle('');
                        setContent('');
                        setIsModalOpen(true);
                    }}>
                        <Plus size={20} />
                        <span>Post Update</span>
                    </Button>
                )}
            />

            {loading ? (
                <div>Loading updates...</div>
            ) : announcements.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-brand-muted/20">
                    <Bell size={48} className="mx-auto text-brand-muted mb-4" />
                    <h3 className="text-xl font-medium text-brand-dark">No Announcements Yet</h3>
                </div>
            ) : (
                <div className="space-y-6 max-w-4xl mx-auto">
                    {announcements.map((a) => (
                        <Card key={a.id} className="relative overflow-hidden border-l-4 border-l-brand-pink hover:bg-brand-ivory transition-colors">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-brand-dark">{a.title}</h3>
                                <div className="flex items-center space-x-3">
                                    <span className="text-xs text-brand-muted">{new Date(a.created_at).toLocaleDateString()}</span>
                                    {isAdmin && (
                                        <div className="flex space-x-1">
                                            <button onClick={() => openEditModal(a)} className="p-1 text-brand-muted hover:text-brand-pink transition-colors">
                                                <Edit2 size={16} />
                                            </button>
                                            <button onClick={() => handleDelete(a.id)} className="p-1 text-brand-muted hover:text-red-500 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <p className="text-brand-text mb-6 whitespace-pre-wrap leading-relaxed">{a.content}</p>

                            <div className="flex items-center space-x-2 text-sm text-brand-pink font-bold uppercase tracking-wide">
                                <User size={16} />
                                <span>Posted by {a.profiles?.full_name || 'Admin'}</span>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Post Announcement Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-dark/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif font-bold text-brand-dark">
                                {editingId ? 'Edit Announcement' : 'Post Announcement'}
                            </h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-brand-muted hover:text-brand-dark"><X size={24} /></button>
                        </div>

                        <form onSubmit={handlePostAnnouncement} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Title</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Weekly Meeting Update"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Content</label>
                                <textarea
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none h-32"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Write your update here..."
                                />
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 rounded-xl border border-brand-muted/20 text-brand-muted hover:bg-brand-ivory font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2 rounded-xl bg-brand-pink text-white font-bold hover:shadow-lg hover:shadow-brand-pink/30 hover:-translate-y-0.5 transition-all"
                                >
                                    {isSubmitting ? 'Saving...' : (editingId ? 'Save Changes' : 'Post Update')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortalAnnouncements;
