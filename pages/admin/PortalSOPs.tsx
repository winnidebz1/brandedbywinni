import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, ChevronRight, FileText, CheckCircle } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';

const sopContent: Record<string, any> = {
    'client-onboarding': {
        title: 'Client Onboarding',
        category: 'Task Management',
        content: `
            <h3>1. Deposit Policy</h3>
            <p>Work <strong>never</strong> begins without a deposit. Typically 50% upfront is required unless a different payment plan is approved by the Founder.</p>
            
            <h3>2. Communication Channels</h3>
            <p>All client communication happens via the official email or the client portal. Do not use personal WhatsApp unless explicitly authorized.</p>
            
            <h3>3. Asset Submission</h3>
            <p>Clients must submit ALL required content (logos, copy, images) before the design timeline officially starts. Use the "Missing Assets" email template if they are delayed.</p>
        `
    },
    'payments': {
        title: 'Payments & Billing',
        category: 'Administrative',
        content: `
            <h3>Accepted Payment Methods</h3>
            <p>We accept bank transfers and Mobile Money. International clients use Paystack/Stripe links.</p>
            
            <h3>No Pay, No Work</h3>
            <p>Do not start pending tasks until payment confirmation is received from the Finance channel.</p>
            
            <h3>Late Payments</h3>
            <p>A gentle reminder is sent 24 hours after the due date. A formal pause notice is sent after 3 days.</p>
        `
    },
    'revisions': {
        title: 'Revision Policy',
        category: 'Design SOPs',
        content: `
            <h3>Standard Revisions</h3>
            <p>Most packages include <strong>2 Rounds of Revisions</strong>. Additional revisions are billed at an hourly rate.</p>
            
            <h3>What Counts as a Revision?</h3>
            <p>Minor tweaks (color, font size, swapping an image). A complete redesign concept counts as a <em>new deliverable</em>, not a revision.</p>
            
            <h3>Timeline</h3>
            <p>Revisions are typically turned around within 48 hours. Rush revisions incur a fee.</p>
        `
    },
    'turnaround-time': {
        title: 'Turnaround Times',
        category: 'Team Rules',
        content: `
            <h3>Standard Delivery</h3>
            <ul>
                <li>Social Media Posts: 2-3 Days</li>
                <li>Branding Packages: 2-3 Weeks</li>
                <li>Web Design: 4-6 Weeks</li>
            </ul>
            
            <h3>Rush Fees</h3>
            <p>Any request requiring delivery under 24 hours incurs a <strong>50% Rush Fee</strong>. Always clear this with the Founder first.</p>
        `
    },
    // Placeholders for others
    'company-overview': { title: 'Company Overview', category: 'General', content: '<p>Welcome to Branded By Winni! We build girly, bold, and elegant brands.</p>' },
    'team-expectations': { title: 'Team Expectations', category: 'General', content: '<p>Be professional, be girly, be bold.</p>' },
    'design-sops': { title: 'Design SOPs', category: 'Design', content: '<p>Guidelines for visuals.</p>' },
    'content-sops': { title: 'Content SOPs', category: 'Content', content: '<p>Guidelines for writing.</p>' },
};

const PortalSOPs = () => {
    const { slug } = useParams();
    const sop = slug ? sopContent[slug] : null;

    if (slug === 'handbook') {
        return (
            <div className="max-w-4xl mx-auto animate-fadeIn bg-white p-12 shadow-2xl print:shadow-none print:p-0">
                <div className="text-center mb-16 border-b-2 border-brand-primaryPink pb-8">
                    <h1 className="text-5xl font-serif font-bold text-brand-deepPlum mb-4">Intern Handbook</h1>
                    <p className="text-xl text-brand-muted">Branded By Winni | Team Operations Manual</p>
                    <Button onClick={() => window.print()} className="mt-8 print:hidden" variant="outline">Print / Save as PDF</Button>
                </div>

                <div className="prose prose-pink max-w-none">
                    <h2 className="text-3xl font-bold text-brand-primaryPink mb-8">Table of Contents</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                        {Object.entries(sopContent).map(([key, data]) => (
                            <li key={key}>
                                <a href={`#${key}`} className="text-brand-deepPlum hover:text-brand-primaryPink font-medium border-b border-brand-softGray block pb-2">
                                    {data.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-16 space-y-20">
                    {Object.entries(sopContent).map(([key, data]) => (
                        <section key={key} id={key} className="scroll-mt-20">
                            <div className="flex items-center space-x-3 mb-6">
                                <Badge variant="pink">{data.category}</Badge>
                                <h1 className="text-3xl font-serif font-bold text-brand-deepPlum">{data.title}</h1>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: data.content }} />
                            <div className="h-px bg-brand-softGray w-full mt-12 print:mt-16"></div>
                        </section>
                    ))}
                </div>

                <div className="mt-20 text-center text-sm text-brand-muted">
                    <p>© {new Date().getFullYear()} Branded By Winni. Internal Use Only.</p>
                </div>
            </div>
        );
    }

    if (!slug) {
        // Index View
        return (
            <div className="space-y-8 animate-fadeIn">
                <PageHeader
                    title="SOPs & Knowledge Base"
                    subtitle="Everything you need to know to succeed."
                    action={
                        <Link to="/admin/sops/handbook">
                            <Button variant="outline">
                                <Book size={20} />
                                <span>Intern Handbook (Print View)</span>
                            </Button>
                        </Link>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(sopContent).map(([key, data]) => (
                        <Link key={key} to={`/admin/sops/${key}`}>
                            <Card className="h-full hover:bg-brand-softBlush/20 group">
                                <div className="flex items-center space-x-3 mb-4 text-brand-primaryPink">
                                    <Book size={24} />
                                    <Badge variant="pink">{data.category}</Badge>
                                </div>
                                <h3 className="text-xl font-bold text-brand-deepPlum mb-2 group-hover:underline">{data.title}</h3>
                                <div className="flex items-center text-sm text-brand-muted mt-4">
                                    <span>Read Guide</span>
                                    <ChevronRight size={16} className="ml-1" />
                                </div>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        );
    }

    if (!sop) {
        return <div className="p-8 text-center">SOP not found.</div>;
    }

    // Detail View
    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <Link to="/admin/sops" className="text-sm font-medium text-brand-muted hover:text-brand-primaryPink mb-4 inline-block">← Back to SOPs</Link>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="bg-brand-primaryPink p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <Badge className="bg-white/20 text-white border-none mb-4">{sop.category}</Badge>
                    <h1 className="text-4xl font-serif font-bold mb-2">{sop.title}</h1>
                    <p className="opacity-90">Last updated: Today</p>
                </div>

                <div className="p-8 md:p-12 prose prose-pink max-w-none text-brand-text">
                    {/* Render HTML content safely */}
                    <div dangerouslySetInnerHTML={{ __html: sop.content }} />

                    <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="read-ack" className="w-5 h-5 text-brand-primaryPink rounded focus:ring-brand-primaryPink" />
                            <label htmlFor="read-ack" className="text-sm font-medium text-brand-deepPlum">I have read and understood this SOP.</label>
                        </div>
                        <Button>Mark as Read</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortalSOPs;
