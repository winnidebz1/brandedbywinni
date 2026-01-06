import React, { useEffect, useState } from 'react';
import { PageHeader, Card, Button, Badge } from '../../components/portal/UI';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import { MessageSquare, ThumbsUp, AlertTriangle } from 'lucide-react';

const PortalFeedback = () => {
    const { isAdmin, profile } = useProfile();
    const [feedbacks, setFeedbacks] = useState<any[]>([]);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('suggestion');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState('submit');

    const fetchFeedbacks = async () => {
        if (!isAdmin) return;
        const { data } = await supabase
            .from('internal_feedback')
            .select('*, profiles(full_name)')
            .order('created_at', { ascending: false });
        setFeedbacks(data || []);
    };

    useEffect(() => {
        fetchFeedbacks();
    }, [isAdmin]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await supabase.from('internal_feedback').insert({
                message,
                type,
                is_anonymous: isAnonymous,
                user_id: isAnonymous ? null : profile?.id
            });
            setSubmitted(true);
            setMessage('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader title="Feedback & Reviews" subtitle="Constructive feedback to help us grow." />

            {isAdmin && (
                <div className="flex space-x-2 border-b border-brand-muted/20 mb-6">
                    <button
                        onClick={() => setActiveTab('submit')}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'submit'
                            ? 'border-brand-pink text-brand-pink'
                            : 'border-transparent text-brand-muted hover:text-brand-dark'
                            }`}
                    >
                        Submit Feedback
                    </button>
                    <button
                        onClick={() => setActiveTab('review')}
                        className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'review'
                            ? 'border-brand-pink text-brand-pink'
                            : 'border-transparent text-brand-muted hover:text-brand-dark'
                            }`}
                    >
                        Review Feedback
                    </button>
                </div>
            )}

            {isAdmin && activeTab === 'review' ? (
                <div className="grid grid-cols-1 gap-6">
                    {feedbacks.length === 0 ? (
                        <div className="text-center p-12 text-brand-muted">No feedback received yet.</div>
                    ) : (
                        feedbacks.map((f) => (
                            <Card key={f.id} className="border-l-4 border-l-brand-pink">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center space-x-2">
                                        <Badge variant="default" className="uppercase border border-brand-muted/20 bg-transparent text-brand-dark">{f.type}</Badge>
                                        <span className="text-xs text-brand-muted">{new Date(f.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <span className="text-sm font-bold text-brand-dark">
                                        {f.is_anonymous ? 'Anonymous' : f.profiles?.full_name || 'Unknown'}
                                    </span>
                                </div>
                                <p className="text-brand-text mt-2">{f.message}</p>
                            </Card>
                        ))
                    )}
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    {submitted ? (
                        <Card className="text-center py-12 bg-green-50 border-green-200">
                            <ThumbsUp size={48} className="mx-auto text-green-500 mb-4" />
                            <h3 className="text-xl font-bold text-green-800">Feedback Sent!</h3>
                            <p className="text-green-700">Thank you for helping us improve.</p>
                            <button onClick={() => setSubmitted(false)} className="mt-4 text-sm underline text-green-600">Send another</button>
                        </Card>
                    ) : (
                        <Card>
                            <h3 className="text-xl font-serif font-bold text-brand-dark mb-6">Submit Feedback</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-2">Feedback Type</label>
                                    <div className="flex space-x-4">
                                        {['suggestion', 'concern', 'kudos'].map((t) => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setType(t)}
                                                className={`px-4 py-2 rounded-xl capitalize border ${type === t
                                                    ? 'bg-brand-pink text-white border-brand-pink'
                                                    : 'bg-white text-brand-muted border-brand-muted/20 hover:border-brand-pink'
                                                    }`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-brand-muted mb-2">Your Message</label>
                                    <textarea
                                        required
                                        className="w-full h-32 px-4 py-2 rounded-xl border border-brand-muted/20 focus:ring-2 focus:ring-brand-pink focus:outline-none"
                                        placeholder="Share your thoughts..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="anon"
                                        checked={isAnonymous}
                                        onChange={(e) => setIsAnonymous(e.target.checked)}
                                        className="rounded text-brand-pink focus:ring-brand-pink"
                                    />
                                    <label htmlFor="anon" className="text-sm text-brand-text">Submit Anonymously</label>
                                </div>

                                <Button type="submit" disabled={isSubmitting} className="w-full">
                                    {isSubmitting ? 'Sending...' : 'Submit Feedback'}
                                </Button>
                            </form>
                        </Card>
                    )}
                </div>
            )}
        </div>
    );
};

export default PortalFeedback;
