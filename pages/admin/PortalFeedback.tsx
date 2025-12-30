import React from 'react';
import { PageHeader, Card } from '../../components/portal/UI';

const PortalFeedback = () => {
    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader title="Feedback & Reviews" subtitle="Constructive feedback to help us grow." />

            <Card className="text-center py-12">
                <h3 className="text-xl font-bold text-brand-deepPlum mb-2">No Passive Feedback Yet</h3>
                <p className="text-brand-muted">Feedback on specific tasks appears in the Task detail view.</p>
            </Card>
        </div>
    );
};

export default PortalFeedback;
