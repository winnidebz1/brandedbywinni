import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Star, Save, X } from 'lucide-react';

type Testimonial = {
    id: string;
    client_name: string;
    role: string;
    content: string;
    rating: number;
    profile_image?: string;
    screenshot?: string;
};

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<Testimonial | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Testimonial>>({ rating: 5 });

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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editing) {
            await supabase.from('testimonials').update(formData).eq('id', editing.id);
        } else {
            await supabase.from('testimonials').insert([formData]);
        }
        setEditing(null);
        setIsCreating(false);
        setFormData({ rating: 5 });
        fetchTestimonials();
    };

    const startEdit = (t: Testimonial) => {
        setEditing(t);
        setFormData(t);
        setIsCreating(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Testimonials</h1>
                {!isCreating && (
                    <button
                        onClick={() => { setIsCreating(true); setEditing(null); setFormData({ rating: 5 }); }}
                        className="bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90"
                    >
                        <Plus size={20} />
                        <span>Add Review</span>
                    </button>
                )}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex space-x-1 text-yellow-400">
                                        {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <div className="flex space-x-2">
                                        <button onClick={() => startEdit(t)} className="text-gray-400 hover:text-blue-500"><Edit2 size={16} /></button>
                                        <button onClick={() => handleDelete(t.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic mb-4">"{t.content}"</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-[#E89BA7] flex items-center justify-center text-[#4A3B40] font-bold text-lg">
                                    {t.client_name.charAt(0)}
                                </div>
                                <div>
                                    <p className="font-bold text-[#4A3B40]">{t.client_name}</p>
                                    <p className="text-xs text-gray-400">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Testimonials;
