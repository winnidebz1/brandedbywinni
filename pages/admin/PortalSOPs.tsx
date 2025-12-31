import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, ChevronRight, FileText, CheckCircle } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';

const sopContent: Record<string, any> = {
    'company-overview': {
        title: 'Company Overview & Values',
        category: 'General',
        content: `
            <h3>Welcome to Branded By Winni</h3>
            <p>We are a premier digital branding studio dedicated to creating girly, bold, and elegant brands. Our mission is to empower female-led businesses with high-end visuals that convert.</p>
            
            <h3>Our Core Values</h3>
            <ul>
                <li><strong>Excellence:</strong> We do not ship "good enough". We ship perfection.</li>
                <li><strong>Elegance:</strong> Every pixel should feel premium and intentional.</li>
                <li><strong>Empowerment:</strong> We build up our clients and each other.</li>
                <li><strong>Reliability:</strong> We hit deadlines. Always.</li>
            </ul>
        `
    },
    'team-expectations': {
        title: 'Team Expectations',
        category: 'General',
        content: `
            <h3>Professionalism</h3>
            <p>Even though our brand is fun and girly, our operations are serious. Punctuality and clear communication are non-negotiable.</p>
            
            <h3>Work Hours</h3>
            <p>Our core hours are <strong>Monday - Friday, 9:00 AM - 5:00 PM GMT</strong>. Please ensure you are responsive on Slack during these times.</p>
            
            <h3>Tools We Use</h3>
            <ul>
                <li><strong>Slack:</strong> Daily communication.</li>
                <li><strong>Notion/Portal:</strong> Task management and SOPs.</li>
                <li><strong>Figma/Adobe Suite:</strong> Design work.</li>
            </ul>
        `
    },
    'client-onboarding': {
        title: 'Client Onboarding Protocol',
        category: 'Task Management',
        content: `
            <h3>1. The "Welcome" Phase</h3>
            <p>Once a client pays their deposit, the automation sends the <strong>Welcome Packet</strong>. Monitor the inbox to ensure they received it.</p>
            
            <h3>2. Information Gathering</h3>
            <p>Check if the client has filled out the <strong>Brand Discovery Questionnaire</strong>. If not submitted within 48 hours, send the "Gentle Reminder" email template.</p>
            
            <h3>3. Project Setup</h3>
            <p>Create a new project folder in Google Drive using the naming convention: <code>ClientName_ProjectType_MonthYear</code>. Duplicate the standard project board in the Portal.</p>
        `
    },
    'payments': {
        title: 'Payments & Billing Policy',
        category: 'Administrative',
        content: `
            <h3>Deposit Requirement</h3>
            <p>Work <strong>never</strong> begins without a 50% deposit. This verifies the client's commitment. There are NO exceptions unless approved by Winni directly.</p>
            
            <h3>Final Balance</h3>
            <p>The remaining 50% is due <strong>before</strong> final file delivery. You may send low-res watermarked previews for approval, but never release source files until the invoice is marked PAID.</p>
            
            <h3>Payment Methods</h3>
            <p>We accept Bank Transfer, Mobile Money, and Stripe for international clients. Ensure the client uses the invoice reference number.</p>
        `
    },
    'revisions': {
        title: 'Revision & Feedback Policy',
        category: 'Design SOPs',
        content: `
            <h3>Standard Revisions</h3>
            <p>Our standard packages include <strong>2 Rounds of Revisions</strong>. This encourages clients to be specific with their feedback.</p>
            
            <h3>Processing Feedback</h3>
            <p>When feedback arrives, summarize it into a checklist before starting work. If a request falls outside the original scope (e.g., "Actually, can we change the name?"), flag it for a Change Order.</p>
            
            <h3>Revision Timeline</h3>
            <p>Revisions should be turned around within <strong>48 hours</strong> to keep momentum.</p>
        `
    },
    'turnaround-time': {
        title: 'Standard Turnaround Times',
        category: 'Team Rules',
        content: `
            <h3>Service Level Agreements (SLAs)</h3>
            <ul>
                <li><strong>Logo Concepts:</strong> 7-10 Business Days</li>
                <li><strong>Full Branding Suite:</strong> 3-4 Weeks</li>
                <li><strong>Website Design:</strong> 4-6 Weeks</li>
                <li><strong>Social Media Content:</strong> 3 Business Days</li>
            </ul>
            
            <h3>Rush Requests</h3>
            <p>If a client requests a timeline shorter than standard, a <strong>30-50% Rush Fee</strong> applies. Always check capacity with the team before agreeing.</p>
        `
    },
    'design-sops': {
        title: 'Design Guidelines & File Management',
        category: 'Design',
        content: `
            <h3>File Structure</h3>
            <p>Keep working files organized. Use layers properly. Name your artboards.</p>
            
            <h3>Export Settings</h3>
            <ul>
                <li><strong>Print:</strong> PDF (CMYK, 300dpi, +Bleeds)</li>
                <li><strong>Web:</strong> JPG/PNG (RGB, 72dpi, Compressed)</li>
                <li><strong>Vector:</strong> SVG/EPS (Outlined Text)</li>
            </ul>
            
            <h3>Brand Consistency</h3>
            <p>Always double-check usage of the client's hex codes. Do not "eyeball" colors.</p>
        `
    },
    'content-sops': {
        title: 'Copywriting & Content Tone',
        category: 'Content',
        content: `
            <h3>Brand Voice</h3>
            <p>Our voice is <strong>Confident, Feminine, and polished</strong>. Avoid slang, but don't sound corporate and stiff.</p>
            
            <h3>Proofreading</h3>
            <p>Typos destroy credibility. Always run copy through Grammarly and read it aloud before sending to a client.</p>
        `
    },
};

const PortalSOPs = () => {
    const { slug } = useParams();
    const sop = slug ? sopContent[slug] : null;

    if (slug === 'handbook') {
        return (
            <div className="max-w-4xl mx-auto animate-fadeIn bg-white p-12 shadow-2xl print:shadow-none print:p-0">
                <div className="text-center mb-16 border-b-2 border-brand-pink pb-8">
                    <h1 className="text-5xl font-serif font-bold text-brand-dark mb-4">Intern Handbook</h1>
                    <p className="text-xl text-brand-muted">Branded By Winni | Team Operations Manual</p>
                    <Button onClick={() => window.print()} className="mt-8 print:hidden" variant="outline">Print / Save as PDF</Button>
                </div>

                <div className="prose prose-pink max-w-none">
                    <h2 className="text-3xl font-bold text-brand-pink mb-8">Table of Contents</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0">
                        {Object.entries(sopContent).map(([key, data]) => (
                            <li key={key}>
                                <a href={`#${key}`} className="text-brand-dark hover:text-brand-pink font-medium border-b border-brand-muted/20 block pb-2">
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
                                <h1 className="text-3xl font-serif font-bold text-brand-dark">{data.title}</h1>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: data.content }} className="text-brand-text/90 leading-relaxed" />
                            <div className="h-px bg-brand-muted/20 w-full mt-12 print:mt-16"></div>
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
                        <Link to="/portal/sops/handbook">
                            <Button variant="outline">
                                <Book size={20} />
                                <span>Intern Handbook (Print View)</span>
                            </Button>
                        </Link>
                    }
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(sopContent).map(([key, data]) => (
                        <Link key={key} to={`/portal/sops/${key}`}>
                            <Card className="h-full hover:bg-white hover:shadow-lg transition-all group border-brand-pink/10">
                                <div className="flex items-center space-x-3 mb-4 text-brand-pink">
                                    <Book size={24} />
                                    <Badge variant="pink">{data.category}</Badge>
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-2 group-hover:text-brand-pink transition-colors">{data.title}</h3>
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
        return <div className="p-8 text-center text-brand-muted">SOP not found.</div>;
    }

    // Detail View
    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <Link to="/portal/sops" className="text-sm font-medium text-brand-muted hover:text-brand-pink mb-4 inline-block">← Back to SOPs</Link>

            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-brand-pink/10">
                <div className="bg-brand-pink p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <Badge className="bg-white/20 text-white border-none mb-4">{sop.category}</Badge>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{sop.title}</h1>
                    <p className="opacity-90">Internal Documentation</p>
                </div>

                <div className="p-8 md:p-12 prose prose-pink max-w-none text-brand-text">
                    {/* Render HTML content safely */}
                    <div dangerouslySetInnerHTML={{ __html: sop.content }} />
                </div>
            </div>
        </div>
    );
};

export default PortalSOPs;
