import React, { useEffect, useState } from 'react';
import { Clock, MessageCircle, FileText, Heart, Plus, Edit2, Save, Trash2 } from 'lucide-react';
import { Card, PageHeader, Button } from '../../components/portal/UI';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const PortalRules = () => {
    const { isAdmin } = useProfile();
    const [rules, setRules] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ title: '', content: '' });
    const [isCreating, setIsCreating] = useState(false);

    const fetchRules = async () => {
        try {
            const { data, error } = await supabase.from('team_rules').select('*').order('created_at');
            if (error) throw error;
            setRules(data || []);
        } catch (error) {
            console.error('Error fetching rules:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    const handleCreate = async () => {
        try {
            const { error } = await supabase.from('team_rules').insert({
                title: 'New Rule',
                content: 'Description here...'
            });
            if (error) throw error;
            fetchRules();
            setIsCreating(false);
        } catch (error: any) {
            alert('Error creating rule: ' + error.message);
        }
    };

    const handleSave = async (id: string) => {
        try {
            const { error } = await supabase.from('team_rules').update({
                title: editForm.title,
                content: editForm.content
            }).eq('id', id);

            if (error) throw error;
            setEditingId(null);
            fetchRules();
        } catch (error: any) {
            alert('Error saving rule: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this rule?')) return;
        try {
            const { error } = await supabase.from('team_rules').delete().eq('id', id);
            if (error) throw error;
            fetchRules();
        } catch (error: any) {
            alert('Error deleting rule: ' + error.message);
        }
    };

    const startEditing = (rule: any) => {
        setEditingId(rule.id);
        setEditForm({ title: rule.title, content: rule.content });
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader
                title="Team Rules & Culture"
                subtitle="How we work together effectively."
                action={isAdmin && (
                    <Button onClick={handleCreate}>
                        <Plus size={20} />
                        <span>Add Section</span>
                    </Button>
                )}
            />

            {loading ? (
                <div>Loading rules...</div>
            ) : rules.length === 0 ? (
                <div className="text-center p-12 bg-white rounded-2xl border border-dashed text-brand-muted">
                    No rules defined yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {rules.map((rule) => (
                        <Card key={rule.id} className="relative group">
                            {isAdmin && !editingId && (
                                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => startEditing(rule)} className="p-1 hover:text-brand-pink text-brand-muted">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(rule.id)} className="p-1 hover:text-red-500 text-brand-muted">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}

                            {editingId === rule.id ? (
                                <div className="space-y-4">
                                    <input
                                        className="w-full font-bold text-xl p-2 border rounded"
                                        value={editForm.title}
                                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                    />
                                    <textarea
                                        className="w-full h-32 p-2 border rounded text-sm"
                                        value={editForm.content}
                                        onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>Cancel</Button>
                                        <Button size="sm" onClick={() => handleSave(rule.id)}>Save</Button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center space-x-3 mb-4 text-brand-pink">
                                        <Heart size={24} />
                                        {/* Icon selection logic could go here, defaulting to Heart for now */}
                                        <h3 className="text-xl font-bold text-brand-dark">{rule.title}</h3>
                                    </div>
                                    <div className="whitespace-pre-wrap text-brand-text leading-relaxed">
                                        {rule.content}
                                    </div>
                                </>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PortalRules;
