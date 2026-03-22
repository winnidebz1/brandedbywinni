import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, AlertCircle } from 'lucide-react';
import { defaultSiteContent } from '../../hooks/useWebsiteContent';

const PortalSiteEditor = () => {
    const [activeSection, setActiveSection] = useState('hero');
    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeSection]);

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('website_content')
            .select('content')
            .eq('section_id', activeSection)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error(error);
        }

        const defaultData = defaultSiteContent[activeSection] || {};
        const databaseData = data?.content || {};

        setFormData({ ...defaultData, ...databaseData });
        setMessage('');
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage('');

        try {
            const { error } = await supabase
                .from('website_content')
                .upsert(
                    { section_id: activeSection, content: formData, updated_at: new Date().toISOString() },
                    { onConflict: 'section_id' }
                );

            if (error) throw error;
            setMessage('Changes saved successfully! Refresh the public website to see them.');
        } catch (error: any) {
            console.error('Save error', error);
            setMessage('Error: Missing website_content table. Please run the provided SQL script in your Supabase SQL Editor.');
        }

        setIsSaving(false);
    };

    const handleChange = (key: string, value: string) => {
        setFormData({ ...formData, [key]: value });
    };

    const sections = Object.keys(defaultSiteContent);

    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Live Site Editor</h1>
                <p className="text-gray-500">Edit the text, layout copy, and images of your live website.</p>
            </div>

            {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${message.includes('Error') ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                    <AlertCircle size={20} />
                    <span className="text-sm font-medium">{message}</span>
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Sidebar Tabs */}
                <div className="md:w-64 bg-gray-50 p-4 border-r border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 ml-2">Website Sections</h3>
                    <div className="space-y-1">
                        {sections.map(sec => (
                            <button
                                key={sec}
                                onClick={() => setActiveSection(sec)}
                                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeSection === sec ? 'bg-[#4A3B40] text-white' : 'text-gray-600 hover:bg-white hover:text-[#E89BA7]'}`}
                            >
                                {sec.charAt(0).toUpperCase() + sec.slice(1)} Section
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 p-6 md:p-8 bg-white">
                    <form onSubmit={handleSave} className="max-w-3xl space-y-6">
                        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-[#4A3B40] capitalize">{activeSection} Editor</h2>
                            <button 
                                type="submit" 
                                disabled={isSaving}
                                className="flex items-center space-x-2 bg-[#E89BA7] text-white px-6 py-2.5 rounded-full font-medium tracking-wide hover:bg-[#D98A96] transition-all disabled:opacity-50"
                            >
                                <Save size={18} />
                                <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                            </button>
                        </div>

                        {Object.keys(formData).map(key => {
                            const isTextArea = key.includes('description') || key.includes('subheadline') || key.includes('desc');
                            return (
                                <div key={key}>
                                    <label className="block text-sm font-bold text-gray-700 mb-2 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    {isTextArea ? (
                                        <textarea
                                            rows={4}
                                            value={formData[key] || ''}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#E89BA7] outline-none transition-shadow text-gray-600"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={formData[key] || ''}
                                            onChange={(e) => handleChange(key, e.target.value)}
                                            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#E89BA7] outline-none transition-shadow text-gray-600"
                                        />
                                    )}
                                    {key.toLowerCase().includes('image') && (
                                        <p className="text-xs text-brand-pink mt-1 italic">
                                            Hint: Enter a full URL (https://...) or a valid filename matching an uploaded asset in the public folder.
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PortalSiteEditor;
