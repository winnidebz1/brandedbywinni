import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Star, Save, X, CheckCircle, EyeOff, Copy } from 'lucide-react';

type Testimonial = {
    id: string;
    client_name: string;
    role: string;
    content: string;
    rating: number;
    profile_image?: string;
    screenshot?: string;
    status?: string;
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [filterStatus, setFilterStatus] = useState('all');

    // Form State
    const [formData, setFormData] = useState<Partial<Testimonial>>({ rating: 5, status: 'Approved' });

    const fetchTestimonials = async () => {
        const { data } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
        if (data) setTestimonials(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm('Delete this testimonial?')) {
            await supabase.from('testimonials').delete().eq('id', id);
            fetchTestimonials();
        }
    };

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase.from('testimonials').update({ status }).eq('id', id);
        if (!error) {
            setTestimonials(testimonials.map(t => t.id === id ? { ...t, status } : t));
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            await supabase.from('testimonials').update(formData).eq('id', editing.id);
        } else {
            await supabase.from('testimonials').insert([{ ...formData, status: formData.status || 'Approved' }]);
        }
        setEditing(null);
        setIsCreating(false);
        setFormData({ rating: 5, status: 'Approved' });
        fetchTestimonials();
    };

    const startEdit = (t: Testimonial) => {
        setEditing(t);
        setFormData(t);
        setIsCreating(true);
    };

    const filteredTestimonials = testimonials.filter(t => filterStatus === 'all' || (t.status || 'Pending') === filterStatus);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Testimonials</h1>
                    <p className="text-gray-500">Manage client reviews and website testimonials.</p>
                </div>
                <div className="flex items-center gap-3">
                    {!isCreating && (
                        <button
                            onClick={() => { setIsCreating(true); setEditing(null); setFormData({ rating: 5, status: 'Approved' }); }}
                            className="bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90"
                        >
                            <Plus size={20} />
                            <span>Add Manual</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Status Filters */}
            <div className="flex space-x-2 border-b border-gray-200 pb-1 overflow-x-auto">
                {['all', 'Pending', 'Approved', 'Hidden'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors border-b-2 ${filterStatus === status ? 'border-[#4A3B40] text-[#4A3B40] bg-gray-50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    >
                        {status}
                        <span className="ml-2 text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                            {status === 'all'
                                ? testimonials.length
                                : testimonials.filter(t => (t.status || 'Pending') === status).length}
                        </span>
                    </button>
                ))}
            </div>

            {isCreating ? (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-[#4A3B40]">{editing ? 'Edit Testimonial' : 'New Testimonial'}</h2>
                        <button onClick={() => setIsCreating(false)}><X className="text-gray-400" /></button>
                    </div>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                                <input
                                    required
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={formData.client_name || ''}
                                    onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Company</label>
                                <input
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={formData.role || ''}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Review Content</label>
                            <textarea
                                required
                                rows={3}
                                className="w-full px-4 py-2 border rounded-lg"
                                value={formData.content || ''}
                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={formData.rating || 5}
                                    onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                                >
                                    {[1, 2, 3, 4, 5].map(r => <option key={r} value={r}>{r} Stars</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Initial Status</label>
                                <select
                                    className="w-full px-4 py-2 border rounded-lg"
                                    value={formData.status || 'Approved'}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    <option value="Approved">Approved</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Hidden">Hidden</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture (Optional)</label>
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-gray-200">
                                    {formData.profile_image ? (
                                        <img src={formData.profile_image} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-gray-400 text-2xl">{formData.client_name?.charAt(0) || '?'}</span>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, profile_image: reader.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="w-full text-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Upload a small profile photo</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Review Screenshot (Optional)</label>
                            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 hover:border-[#E89BA7] transition-colors relative group">
                                {formData.screenshot ? (
                                    <div className="relative">
                                        <img src={formData.screenshot} alt="Screenshot" className="w-full h-48 object-contain rounded-md" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, screenshot: '' })}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            title="Remove screenshot"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-6 text-gray-400 relative w-full h-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData({ ...formData, screenshot: reader.result as string });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                                        />
                                        <Plus size={32} className="mb-2 opacity-50 pointer-events-none" />
                                        <p className="text-sm pointer-events-none">Click to upload screenshot</p>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button type="submit" className="bg-[#4A3B40] text-[#FAF9F6] px-6 py-2 rounded-lg font-medium hover:opacity-90 flex items-center">
                                <Save size={18} className="mr-2" /> Save
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredTestimonials.map((t) => (
                            <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow relative group">
                                <div>
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex space-x-1 text-yellow-400">
                                            {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                        </div>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${(t.status || 'Pending') === 'Approved' ? 'bg-green-100 text-green-700' :
                                                (t.status || 'Pending') === 'Hidden' ? 'bg-gray-100 text-gray-600' :
                                                    'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {t.status || 'Pending'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 italic mb-4 text-sm line-clamp-4">"{t.content}"</p>
                                </div>

                                <div>
                                    <div className="flex items-center space-x-3 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-[#E89BA7] flex items-center justify-center text-[#4A3B40] font-bold text-lg overflow-hidden">
                                            {t.profile_image ? <img src={t.profile_image} className="w-full h-full object-cover" /> : t.client_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#4A3B40] text-sm">{t.client_name}</p>
                                            <p className="text-xs text-gray-400">{t.role}</p>
                                            <p className="text-[10px] text-gray-300 mt-0.5">May 12, 2024</p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center justify-end border-t border-gray-50 pt-3 space-x-1">
                                        {(t.status || 'Pending') !== 'Approved' && (
                                            <button onClick={() => updateStatus(t.id, 'Approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Approve">
                                                <CheckCircle size={16} />
                                            </button>
                                        )}
                                        {(t.status || 'Pending') !== 'Hidden' && (
                                            <button onClick={() => updateStatus(t.id, 'Hidden')} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg" title="Hide">
                                                <EyeOff size={16} />
                                            </button>
                                        )}
                                        <button onClick={() => startEdit(t)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg" title="Edit">
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(t.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg" title="Delete">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {filteredTestimonials.length === 0 && (
                        <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            No testimonials found in this category.
                        </div>
                    )}

                    {/* Share Link Section */}
                    <div className="mt-8 p-6 bg-[#FAF9F6] rounded-xl border border-[#4A3B40]/10 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <h3 className="font-bold text-[#4A3B40] mb-1">Share Review Link</h3>
                            <p className="text-sm text-gray-500">Send this link to clients to collect reviews directly.</p>
                        </div>
                        <div className="flex items-center space-x-2 w-full md:w-auto">
                            <code className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm flex-1 md:flex-none text-gray-600">
                                {window.location.origin}/review-us
                            </code>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/review-us`);
                                    alert('Link copied!');
                                }}
                                className="bg-[#4A3B40] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90 flex items-center space-x-2"
                            >
                                <Copy size={16} />
                                <span>Copy</span>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Testimonials;
