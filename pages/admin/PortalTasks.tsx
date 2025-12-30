import React, { useEffect, useState } from 'react';
import { Plus, Filter, Paperclip, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';

const PortalTasks = () => {
    const { profile, isAdmin } = useProfile();
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Mock data for now essentially, or fetch if table exists
        // In real implementations, this would fetch from 'tasks' table
        const mockTasks = [
            { id: 1, title: 'Client Onboarding - Sarah J.', status: 'to_do', priority: 'high', deadline: '2024-02-01', assigned_to: 'team_member' },
            { id: 2, title: 'Instagram Graphics (Feb)', status: 'in_progress', priority: 'medium', deadline: '2024-02-05', assigned_to: 'team_member' },
            { id: 3, title: 'Website Update', status: 'review', priority: 'low', deadline: '2024-02-10', assigned_to: 'team_member' },
        ];
        setTasks(mockTasks);
        setLoading(false);
    }, []);

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
                    <Button>
                        <Plus size={20} />
                        <span>New Task</span>
                    </Button>
                )}
            />

            {/* Filters */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
                {['All', 'To Do', 'In Progress', 'Review', 'Approved'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f.toLowerCase())}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === f.toLowerCase()
                                ? 'bg-brand-deepPlum text-white'
                                : 'bg-white text-brand-deepPlum hover:bg-brand-softBlush'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Kanban / List View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.map((task) => (
                    <Card key={task.id} className="cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                            <Badge variant={getStatusColor(task.status)}>{task.status.replace('_', ' ')}</Badge>
                            <span className={`text-xs font-bold ${task.priority === 'high' ? 'text-red-500' : 'text-brand-muted'}`}>
                                {task.priority.toUpperCase()}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-brand-deepPlum mb-2 group-hover:text-brand-primaryPink transition-colors">
                            {task.title}
                        </h3>
                        <p className="text-sm text-brand-muted mb-4 line-clamp-2">
                            {task.description || "No description provided."}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-brand-softPink/10">
                            <div className="flex items-center space-x-2 text-xs text-brand-muted">
                                <Clock size={14} />
                                <span>{task.deadline}</span>
                            </div>
                            {/* Avatar placeholder */}
                            <div className="w-8 h-8 rounded-full bg-brand-softBlush flex items-center justify-center text-xs font-bold text-brand-deepPlum">
                                TM
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="text-center py-20 bg-white/50 rounded-2xl border-2 border-dashed border-brand-softPink/30">
                    <CheckCircle size={48} className="mx-auto text-brand-softPink mb-4" />
                    <h3 className="text-xl font-medium text-brand-deepPlum">All Caught Up!</h3>
                    <p className="text-brand-muted">No tasks found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default PortalTasks;
