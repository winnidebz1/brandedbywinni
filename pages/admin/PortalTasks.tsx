import React, { useEffect, useState } from 'react';
import { Plus, Filter, Paperclip, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const PortalTasks = () => {
    const { profile, isAdmin } = useProfile();
    const [tasks, setTasks] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]); // For dropdown
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('medium');
    const [status, setStatus] = useState('to_do');
    const [deadline, setDeadline] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingTask, setEditingTask] = useState<any>(null); // New state for editing

    const fetchTasks = async () => {
        try {
            let query = supabase.from('tasks').select('*, internal_projects(name)').order('created_at', { ascending: false });
            if (filter !== 'all') {
                query = query.eq('status', filter);
            }
            // If not admin, only show assigned? Or all? Let's show all for transparency for now.

            const { data, error } = await query;
            if (error) throw error;
            setTasks(data || []);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProjects = async () => {
        const { data } = await supabase.from('internal_projects').select('id, name');
        setProjects(data || []);
    };

    useEffect(() => {
        fetchTasks();
        fetchProjects();
    }, [filter]);

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setPriority('medium');
        setStatus('to_do');
        setDeadline('');
        setSelectedProject('');
        setEditingTask(null);
    };

    const handleSaveTask = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const taskData = {
                title,
                description,
                priority,
                status,
                deadline: deadline || null,
                project_id: selectedProject || null,
                assigned_to: editingTask ? editingTask.assigned_to : profile?.id
            };

            if (editingTask) {
                // Update existing task
                const { error } = await supabase
                    .from('tasks')
                    .update(taskData)
                    .eq('id', editingTask.id);
                if (error) throw error;
            } else {
                // Create new task
                const { error } = await supabase
                    .from('tasks')
                    .insert(taskData);
                if (error) throw error;
            }

            setIsModalOpen(false);
            resetForm();
            fetchTasks();
        } catch (error: any) {
            alert('Error saving task: ' + error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditTask = (task: any) => {
        setEditingTask(task);
        setTitle(task.title);
        setDescription(task.description || '');
        setPriority(task.priority);
        setStatus(task.status);
        setDeadline(task.deadline ? task.deadline.split('T')[0] : '');
        setSelectedProject(task.project_id || '');
        setIsModalOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved': return 'success';
            case 'review': return 'warning';
            case 'in_progress': return 'pink';
            default: return 'default';
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader
                title={isAdmin ? "Task Overview" : "My Assignments"}
                subtitle={isAdmin ? "Manage team tasks and approvals" : "Stay on top of your deadlines"}
                action={isAdmin && (
                    <Button onClick={() => { resetForm(); setIsModalOpen(true); }}>
                        <Plus size={20} />
                        <span>New Task</span>
                    </Button>
                )}
            />

            {/* Filters */}
            <div className="flex space-x-2 overflow-x-auto pb-2 custom-scrollbar">
                {['All', 'To_Do', 'In_Progress', 'Review', 'Approved'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f.toLowerCase())}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f.toLowerCase()
                            ? 'bg-brand-dark text-white'
                            : 'bg-white text-brand-dark hover:bg-brand-ivory border border-transparent hover:border-brand-pink/20'
                            }`}
                    >
                        {f.replace('_', ' ')}
                    </button>
                ))}
            </div>

            {/* Task List */}
            {loading ? (
                <div className="text-center py-20">Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-brand-muted/20">
                    <CheckCircle size={48} className="mx-auto text-brand-muted mb-4" />
                    <h3 className="text-xl font-medium text-brand-dark">No Tasks Found</h3>
                    <p className="text-brand-muted">Try changing filters or create a new task.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <Card key={task.id}
                            onClick={() => handleEditTask(task)} // Click to edit
                            className="cursor-pointer group hover:border-brand-pink/50 transition-all hover:shadow-lg hover:shadow-brand-pink/10">
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant={getStatusColor(task.status)}>{task.status.replace(/_/g, ' ')}</Badge>
                                <span className={`text-xs font-bold ${task.priority === 'high' ? 'text-red-500' : 'text-brand-muted'}`}>
                                    {task.priority.toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-pink transition-colors">
                                {task.title}
                            </h3>
                            {task.internal_projects && (
                                <p className="text-xs text-brand-pink font-medium mb-1 uppercase tracking-wide">{task.internal_projects.name}</p>
                            )}
                            <p className="text-sm text-brand-muted mb-4 line-clamp-2">
                                {task.description || "No description provided."}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-brand-muted/10">
                                <div className="flex items-center space-x-2 text-xs text-brand-muted">
                                    <Clock size={14} />
                                    <span>{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No Deadline'}</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-brand-ivory border border-brand-pink/20 flex items-center justify-center text-xs font-bold text-brand-dark">
                                    TM
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Create Task Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-brand-dark/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg animate-fadeIn max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-serif font-bold text-brand-dark mb-6">
                            {editingTask ? 'Edit Task' : 'Create New Task'}
                        </h2>
                        <form onSubmit={handleSaveTask} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Task Title</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Design Logo Concepts"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-1">Project (Optional)</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none bg-white"
                                        value={selectedProject}
                                        onChange={(e) => setSelectedProject(e.target.value)}
                                    >
                                        <option value="">-- No Project --</option>
                                        {projects.map(p => (
                                            <option key={p.id} value={p.id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-1">Deadline</label>
                                    <input
                                        type="date"
                                        className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                                        value={deadline}
                                        onChange={(e) => setDeadline(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-1">Priority</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none bg-white"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-1">Status</label>
                                    <select
                                        className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none bg-white"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="to_do">To Do</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="review">Review</option>
                                        <option value="approved">Approved</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-brand-muted mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none h-24"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Add details..."
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
                                    {isSubmitting ? 'Saving...' : (editingTask ? 'Update Task' : 'Create Task')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PortalTasks;
