import React from 'react';
import { Folder, MoreVertical, Plus } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useProfile } from '../../hooks/useProfile';

const PortalProjects = () => {
    const { isAdmin } = useProfile();

    const projects = [
        { id: 1, name: 'Google Campaign Q1', client: 'Google', status: 'active', tasks: 12, deadline: 'Mar 15' },
        { id: 2, name: 'Brand Refresh', client: 'Sarah J. Boutique', status: 'completed', tasks: 0, deadline: 'Jan 20' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader
                title="Active Projects"
                subtitle="Campaigns and Client Work"
                action={isAdmin && (
                    <Button>
                        <Plus size={20} />
                        <span>New Project</span>
                    </Button>
                )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p) => (
                    <Card key={p.id} className="relative group hover:border-brand-primaryPink transition-colors">
                        <div className="absolute top-4 right-4 text-brand-muted hover:text-brand-deepPlum cursor-pointer">
                            <MoreVertical size={20} />
                        </div>

                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-3 bg-brand-softBlush rounded-lg text-brand-primaryPink">
                                <Folder size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-brand-deepPlum">{p.name}</h3>
                                <p className="text-xs text-brand-muted">{p.client}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm text-brand-text mb-4">
                            <span>{p.tasks} Tasks</span>
                            <span className="text-brand-muted">Due {p.deadline}</span>
                        </div>

                        <div className="w-full bg-brand-softGray rounded-full h-2 overflow-hidden">
                            <div
                                className="bg-brand-primaryPink h-full rounded-full"
                                style={{ width: p.status === 'completed' ? '100%' : '60%' }}
                            ></div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PortalProjects;
