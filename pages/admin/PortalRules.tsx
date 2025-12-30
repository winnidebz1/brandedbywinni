import React from 'react';
import { Clock, MessageCircle, FileText, Heart } from 'lucide-react';
import { Card, PageHeader } from '../../components/portal/UI';

const PortalRules = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader title="Team Rules & Culture" subtitle="How we work together effectively." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <div className="flex items-center space-x-3 mb-4 text-brand-primaryPink">
                        <Clock size={24} />
                        <h3 className="text-xl font-bold text-brand-deepPlum">Working Hours</h3>
                    </div>
                    <ul className="space-y-2 text-brand-text">
                        <li><strong>Standard:</strong> 9:00 AM - 5:00 PM (GMT)</li>
                        <li><strong>Availability:</strong> Must be reachable on Slack during hours.</li>
                        <li><strong>Breaks:</strong> 1 hour lunch, flexible breaks.</li>
                    </ul>
                </Card>

                <Card>
                    <div className="flex items-center space-x-3 mb-4 text-brand-primaryPink">
                        <MessageCircle size={24} />
                        <h3 className="text-xl font-bold text-brand-deepPlum">Communication</h3>
                    </div>
                    <ul className="space-y-2 text-brand-text">
                        <li><strong>Response Time:</strong> Within 2 hours during work hours.</li>
                        <li><strong>Tone:</strong> Friendly, professional, and clear.</li>
                        <li><strong>No Ghosting:</strong> Communicate delays immediately.</li>
                    </ul>
                </Card>

                <Card>
                    <div className="flex items-center space-x-3 mb-4 text-brand-primaryPink">
                        <FileText size={24} />
                        <h3 className="text-xl font-bold text-brand-deepPlum">File Naming</h3>
                    </div>
                    <p className="text-brand-text mb-2">Always use the standard format:</p>
                    <code className="block bg-brand-softBlush p-2 rounded text-sm text-brand-deepPlum mb-2">
                        ClientName_ProjectType_V1_Date
                    </code>
                    <p className="text-sm text-brand-muted">Example: Winni_Logo_V2_30Dec.png</p>
                </Card>

                <Card>
                    <div className="flex items-center space-x-3 mb-4 text-brand-primaryPink">
                        <Heart size={24} />
                        <h3 className="text-xl font-bold text-brand-deepPlum">Values</h3>
                    </div>
                    <ul className="space-y-2 text-brand-text">
                        <li>✨ <strong>Quality over Quantity</strong></li>
                        <li>🌸 <strong>Feminity is Power</strong></li>
                        <li>🤝 <strong>Collaborate & Elevate</strong></li>
                    </ul>
                </Card>
            </div>
        </div>
    );
};

export default PortalRules;
