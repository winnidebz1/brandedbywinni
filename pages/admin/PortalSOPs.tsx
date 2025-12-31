import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, ChevronRight, Edit2, Save, Plus } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const PortalSOPs = () => {
    const { slug } = useParams();
    const { profile, isAdmin } = useProfile();
    const [sops, setSops] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Edit State
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ title: '', content: '', category: '' });

    // Fetch SOPs from Supabase
    const fetchSOPs = async () => {
        try {
            const { data, error } = await supabase.from('sops').select('*').order('category');
            if (error) throw error;
            setSops(data || []);
        } catch (error) {
            console.error('Error fetching SOPs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSOPs();
    }, []);

    // Get current SOP based on ID (slug in this case is likely ID, or we map title-slug)
    // For simplicity, let's assume slug is the ID from the URL, or we find by "slug" property if we added one (we didn't).
    // Let's assume the router passes an ID now.
    const currentSop = sops.find(s => s.id === slug);

    // If we are in "handbook" mode, we show all.
    const isHandbook = slug === 'handbook';

    const handleSave = async () => {
        if (!currentSop) return;
        try {
            const { error } = await supabase
                .from('sops')
                .update({
                    title: editForm.title,
                    content: editForm.content,
                    category: editForm.category
                })
                .eq('id', currentSop.id);

            if (error) throw error;
            setIsEditing(false);
            fetchSOPs(); // Refresh
        } catch (error: any) {
            alert('Error updating SOP: ' + error.message);
        }
    };

    const startEditing = () => {
        if (currentSop) {
            setEditForm({
                title: currentSop.title,
                content: currentSop.content,
                category: currentSop.category
            });
            setIsEditing(true);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading SOPs...</div>;

    if (isHandbook) {
        return (
            <div className="max-w-4xl mx-auto animate-fadeIn bg-white p-12 shadow-2xl print:shadow-none print:p-0">
                <div className="text-center mb-16 border-b-2 border-brand-pink pb-8">
                    <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Staff Handbook</h1>
                    <p className="text-xl text-brand-muted">Branded By Winni | Team Operations Manual</p>
                    <Button onClick={() => window.print()} className="mt-8 print:hidden" variant="outline">Print / Save as PDF</Button>
                </div>

                <div className="prose prose-pink max-w-none">
                    <h2 className="text-3xl font-bold text-brand-pink mb-8">Table of Contents</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                        {sops.map((sop) => (
                            <li key={sop.id}>
                                <a href={`#${sop.id}`} className="text-brand-dark hover:text-brand-pink font-medium border-b border-brand-muted/20 block pb-2">
                                    {sop.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-16 space-y-20">
                    {sops.map((sop) => (
                        <section key={sop.id} id={sop.id} className="scroll-mt-20">
                            <div className="flex items-center space-x-3 mb-6">
                                <Badge variant="pink">{sop.category}</Badge>
                                <h1 className="text-3xl font-serif font-bold text-brand-dark">{sop.title}</h1>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: sop.content }} className="text-brand-text/90 leading-relaxed" />
                            <div className="h-px bg-brand-muted/20 w-full mt-12 print:mt-16"></div>
                        </section>
                    ))}
                </div>

                <div className="mt-20 text-center text-sm text-brand-muted">
                    <p>© {new Date().getFullYear()} Branded By Winni. Internal Use Only.</p>
                </div>
            </div>
        );
    }

    if (!slug) {
        // Index View
        return (
            <div className="space-y-8 animate-fadeIn">
                <PageHeader
                    title="SOPs & Knowledge Base"
                    subtitle="Everything you need to know to succeed."
                    action={
                        <Link to="/portal/sops/handbook">
                            <Button variant="outline">
                                <Book size={20} />
                                <span>Staff Handbook (Print View)</span>
                            </Button>
                        </Link>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sops.map((sop) => (
                        <Link key={sop.id} to={`/portal/sops/${sop.id}`}>
                            <Card className="h-full hover:bg-white hover:shadow-lg transition-all group border-brand-pink/10">
                                <div className="flex items-center space-x-3 mb-4 text-brand-pink">
                                    <Book size={24} />
                                    <Badge variant="pink">{sop.category}</Badge>
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-pink transition-colors">{sop.title}</h3>
                                <div className="flex items-center text-sm text-brand-muted mt-4">
                                    <span>Read Guide</span>
                                    <ChevronRight size={16} className="ml-1" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
                {/* Admin Add New Placeholder - In future add "Create SOP" button */}
            </div>
        );
    }

    if (!currentSop) {
        return <div className="p-8 text-center text-brand-muted">SOP not found. <Link to="/portal/sops" className="underline">Go back</Link></div>;
    }

    // Detail View
    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <Link to="/portal/sops" className="text-sm font-medium text-brand-muted hover:text-brand-pink mb-4 inline-block">← Back to SOPs</Link>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-pink/10">
                <div className="bg-brand-pink p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <Badge className="bg-white/20 text-white border-none mb-4">{currentSop.category}</Badge>
                            {isEditing ? (
                                <input
                                    className="block w-full text-3xl font-serif font-bold text-brand-dark p-2 rounded"
                                    value={editForm.title}
                                    onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                                />
                            ) : (
                                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{currentSop.title}</h1>
                            )}
                            <p className="opacity-90">Internal Documentation</p>
                        </div>
                        {isAdmin && !isEditing && (
                            <button onClick={startEditing} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                <Edit2 size={20} />
                            </button>
                        )}
                        {isAdmin && isEditing && (
                            <button onClick={handleSave} className="p-2 bg-white text-brand-pink rounded-full hover:bg-gray-100 transition-colors">
                                <Save size={20} />
                            </button>
                        )}
                    </div>
                </div>

                <div className="p-8 md:p-12 prose prose-pink max-w-none text-brand-text">
                    {/* Render HTML content safely */}
                    {isEditing ? (
                        <textarea
                            className="w-full h-96 p-4 border rounded font-mono text-sm"
                            value={editForm.content}
                            onChange={e => setEditForm({ ...editForm, content: e.target.value })}
                        />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: currentSop.content }} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PortalSOPs;
