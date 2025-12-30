import React from 'react';
import { Bell, User } from 'lucide-react';
import { Card, PageHeader, Badge } from '../../components/portal/UI';

const PortalAnnouncements = () => {
    const announcements = [
        { id: 1, title: 'Welcome to the New Portal!', content: 'We are excited to launch our new internal portal. Please read the SOPs.', date: 'Dec 30, 2025', author: 'Winni' },
        { id: 2, title: 'Team Meeting Moved', content: 'The weekly sync is now on Tuesdays at 10 AM.', date: 'Dec 28, 2025', author: 'Winni' },
    ];

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader title="Announcements" subtitle="Latest team updates." />

            <div className="space-y-4 max-w-3xl">
                {announcements.map((a) => (
                    <Card key={a.id} className="relative overflow-hidden border-l-4 border-l-brand-primaryPink">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-brand-deepPlum">{a.title}</h3>
                            <span className="text-xs text-brand-muted">{a.date}</span>
                        </div>
                        <p className="text-brand-text mb-4">{a.content}</p>

                        <div className="flex items-center space-x-2 text-sm text-brand-primaryPink font-medium">
                            <User size={16} />
                            <span>Post by {a.author}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PortalAnnouncements;
