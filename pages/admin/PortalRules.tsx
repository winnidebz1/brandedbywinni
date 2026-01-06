import React, { useEffect, useState } from 'react';
import { Clock, MessageCircle, FileText, Heart, Plus, Edit2, Save, Trash2 } from 'lucide-react';
import { Card, PageHeader, Button } from '../../components/portal/UI';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const INITIAL_RULES = [
    {
        title: "1. Professionalism & Work Ethic",
        content: `Every team member is expected to act professionally at all times when representing the agency.

Deadlines are non-negotiable. If a delay is unavoidable, it must be communicated at least 12–24 hours before the deadline.

Excuses without solutions are not acceptable. Always propose a fix or alternative.`
    },
    {
        title: "2. Communication Rules",
        content: `Official communication channels: WhatsApp / Slack / Notion / Email (as defined by management).

Messages must be clear, respectful, and professional—no sarcasm, insults, or passive-aggressive tone.

All work-related messages must be acknowledged within:
- 1–2 hours during work hours
- 12 hours outside work hours

Voice notes should be under 60 seconds unless otherwise requested.`
    },
    {
        title: "3. Availability & Working Hours",
        content: `Team members must be available during agreed working hours.

If you will be unavailable (network issues, emergencies, personal reasons), notify the team beforehand.

Disappearing without notice is considered unprofessional and may lead to disciplinary action.`
    },
    {
        title: "4. Task Management & Workflow",
        content: `All tasks must be tracked in the agency’s task management system (e.g., Notion, ClickUp).

Never start client work that is not officially assigned.

Status updates are mandatory:
- Task started
- Task in progress
- Task completed

Submitting incomplete work without explanation is unacceptable.`
    },
    {
        title: "5. Quality & Standards",
        content: `All deliverables must meet the agency’s quality standards before submission.

Work must be:
- Properly named
- Organized into correct folders
- Exported in the correct formats

Sloppy, rushed, or copied work will be rejected.`
    },
    {
        title: "6. Revisions & Feedback",
        content: `Feedback is part of the process—do not take it personally.

All revisions must be done promptly and according to instructions.

If feedback is unclear, ask questions before revising, not after.`
    },
    {
        title: "7. Confidentiality & Client Protection",
        content: `Client information, files, and strategies are strictly confidential.

Do not share:
- Client files
- Pricing
- Internal documents
- Login credentials

Contacting agency clients privately without permission is strictly prohibited.`
    },
    {
        title: "8. Ownership & Intellectual Property",
        content: `All work done for the agency belongs to the agency unless stated otherwise.

Do not reuse client work for personal projects without written approval.

Portfolio use must be approved.`
    },
    {
        title: "9. Attendance, Meetings & Training",
        content: `Attendance at scheduled meetings, trainings, and check-ins is mandatory.

Joining meetings late without notice is unacceptable.

Missing meetings repeatedly may result in removal from the team.`
    },
    {
        title: "10. Tools & Resources Usage",
        content: `Agency tools (Canva, Adobe, Notion, AI tools, etc.) must be used responsibly.

Do not misuse, overshare, or abuse access to paid tools.

Any technical issues must be reported immediately.`
    },
    {
        title: "11. Accountability & Discipline",
        content: `The following actions may result in warnings, suspension, or termination:
- Repeated missed deadlines
- Poor communication
- Disrespectful behavior
- Plagiarism
- Client poaching
- Ghosting the team

Three strikes rule applies unless the offense is severe.`
    },
    {
        title: "12. Growth, Learning & Initiative",
        content: `Team members are encouraged to improve their skills continuously.

Suggestions and creative ideas are welcome—but must align with agency goals.

Everyone is expected to grow, not stagnate.`
    },
    {
        title: "13. Final Agreement",
        content: `By joining the agency, you agree to:
- Follow these rules
- Respect the team
- Protect the brand
- Deliver excellence consistently

Failure to comply may result in immediate removal from the team.`
    }
];

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

            if ((!data || data.length === 0) && isAdmin) {
                // Initialize default rules
                const { error: insertError } = await supabase.from('team_rules').insert(INITIAL_RULES);
                if (insertError) throw insertError;
                // Refetch
                const { data: newData } = await supabase.from('team_rules').select('*').order('created_at');
                setRules(newData || []);
            } else {
                setRules(data || []);
            }
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
                <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                    {rules.map((rule, index) => (
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
                                        className="w-full h-96 p-2 border rounded text-sm font-mono"
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
                                    <div className="flex items-center space-x-3 mb-4 text-brand-pink border-b border-brand-pink/10 pb-2">
                                        <span className="text-2xl font-serif font-bold text-brand-pink/20">{(index + 1).toString().padStart(2, '0')}</span>
                                        <h3 className="text-xl font-bold text-brand-dark">{rule.title}</h3>
                                    </div>
                                    <div className="whitespace-pre-wrap text-brand-text leading-relaxed prose prose-pink max-w-none">
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
