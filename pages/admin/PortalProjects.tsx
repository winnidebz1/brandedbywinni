import React from 'react';
import { Folder, MoreVertical, Plus } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useProfile } from '../../hooks/useProfile';
import { supabase } from '../../lib/supabase';

const PortalProjects = () => {
    const { isAdmin, profile } = useProfile();
    const [projects, setProjects] = React.useState<any[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Form State
    const [name, setName] = React.useState('');
    const [client, setClient] = React.useState('');
    const [deadline, setDeadline] = React.useState('');
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('internal_projects')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProjects();
    }, []);

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('internal_projects').insert({
                name,
                client_name: client,
                deadline,
                status: 'active',
                created_by: profile?.id
            });

            if (error) throw error;

            setIsModalOpen(false);
            setName('');
            setClient('');
            setDeadline('');
            fetchProjects(); // Refresh list
        } catch (error: any) {
            alert('Error creating project: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader
                title="Active Projects"
                subtitle="Campaigns and Client Work"
                action={isAdmin && (
                    <Button onClick={() => setIsModalOpen(true)}>
                        <Plus size={20} />
                        <span>New Project</span>
                    </Button>
                )}
            />

            {/* Project List */}
            {loading ? (
                <div className="text-center py-20">Loading projects...</div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-brand-muted/20">
                    <Folder size={48} className="mx-auto text-brand-muted mb-4" />
                    <h3 className="text-xl font-medium text-brand-dark">No Projects Yet</h3>
                    {isAdmin && <p className="text-brand-muted cursor-pointer hover:text-brand-pink" onClick={() => setIsModalOpen(true)}>Create your first one above.</p>}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((p) => (
                        <Card key={p.id} className="relative group hover:border-brand-pink transition-colors">
                            <div className="absolute top-4 right-4 text-brand-muted hover:text-brand-dark cursor-pointer">
                                <MoreVertical size={20} />
                            </div>

                            <div className="flex items-center space-x-3 mb-4">
                                <div className="p-3 bg-brand-ivory rounded-lg text-brand-pink">
                                    <Folder size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-brand-dark">{p.name}</h3>
                                    <p className="text-xs text-brand-muted">{p.client_name}</p>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-sm text-brand-text mb-4">
                                <span>0 Tasks</span>
                                <span className="text-brand-muted">Due {new Date(p.deadline).toLocaleDateString()}</span>
                            </div>

                            <div className="w-full bg-brand-muted/20 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-brand-pink h-full rounded-full"
                                    style={{ width: p.status === 'completed' ? '100%' : '10%' }}
                                ></div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Create Project Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-dark/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fadeIn">
                        <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">Create New Project</h2>
                        <form onSubmit={handleCreateProject} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Project Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="e.g. Summer Campaign"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Client Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                                    value={client}
                                    onChange={(e) => setClient(e.target.value)}
                                    placeholder="e.g. Google"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Deadline</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
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
                                    {isSubmitting ? 'Creating...' : 'Create Project'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortalProjects;
