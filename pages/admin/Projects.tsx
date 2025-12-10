import React, { useEffect, useState } from 'react';
import { supabase, uploadFile, getPublicUrl, isImageFile } from '../../lib/supabase';
import { Plus, Trash2, Edit2, Image as ImageIcon, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

type Project = {
    id: string;
    title: string;
    slug: string;
    category: string;
    problem: string;
    solution: string;
    cover_image: string;
    images: string[];
    client_industry: string;
    seo_keywords: string[];
    created_at: string;
};

const Projects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
    const [editingId, setEditingId] = useState<string | null>(null);

    const fetchProjects = async () => {
        const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (data) setProjects(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleEdit = (project: Project) => {
        setEditingId(project.id);
        setView('edit');
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await supabase.from('projects').delete().eq('id', id);
            fetchProjects();
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Projects</h1>
                {view === 'list' && (
                    <button
                        onClick={() => setView('create')}
                        className="bg-[#4A3B40] text-[#FAF9F6] px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-opacity-90 transition-all"
                    >
                        <Plus size={20} />
                        <span>Add Project</span>
                    </button>
                )}
            </div>

            {view === 'list' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white group rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all">
                            <div className="h-48 bg-gray-100 relative overflow-hidden">
                                {project.cover_image ? (
                                    <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        <ImageIcon size={32} />
                                    </div>
                                )}
                                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => handleEdit(project)} className="p-2 bg-white rounded-full shadow-sm hover:text-blue-600">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => handleDelete(project.id)} className="p-2 bg-white rounded-full shadow-sm hover:text-red-600">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <span className="text-xs font-semibold text-[#E89BA7] uppercase tracking-wider">{project.category}</span>
                                <h3 className="font-bold text-[#4A3B40] mt-1">{project.title}</h3>
                            </div>
                        </div>
                    ))}
                    {projects.length === 0 && !loading && (
                        <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                            No projects found. Add one to get started.
                        </div>
                    )}
                </div>
            ) : (
                <ProjectForm
                    mode={view}
                    initialData={view === 'edit' ? projects.find(p => p.id === editingId) : undefined}
                    onCancel={() => {
                        setView('list');
                        setEditingId(null);
                    }}
                    onSuccess={() => {
                        setView('list');
                        setEditingId(null);
                        fetchProjects();
                    }}
                />
            )}
        </div>
    );
};

const ProjectForm = ({ mode, initialData, onCancel, onSuccess }: { mode: 'create' | 'edit'; initialData?: Project; onCancel: () => void; onSuccess: () => void }) => {
    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Partial<Project>>({
        defaultValues: initialData || {
            category: 'Brand Identity',
            images: [],
            seo_keywords: []
        }
    });

    const [uploading, setUploading] = useState(false);
    const [coverPreview, setCoverPreview] = useState<string | undefined>(initialData?.cover_image);

    const onSubmit = async (data: Partial<Project>) => {
        try {
            setUploading(true);

            // Slug generation
            const slug = data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-') || '';

            const payload = { ...data, slug };

            if (mode === 'create') {
                const { error } = await supabase.from('projects').insert([payload]);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('projects').update(payload).eq('id', initialData!.id);
                if (error) throw error;
            }

            onSuccess();
        } catch (err: any) {
            alert('Error saving project: ' + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'cover_image' | 'images') => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        try {
            const file = e.target.files[0];
            if (!file.type.startsWith('image/')) throw new Error('Not an image file');

            // Convert to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;

                if (field === 'cover_image') {
                    setValue('cover_image', base64String);
                    setCoverPreview(base64String);
                } else {
                    const currentImages = watch('images') || [];
                    setValue('images', [...currentImages, base64String]);
                }
                setUploading(false);
            };

            reader.onerror = () => {
                alert('Failed to read image file');
                setUploading(false);
            };

            reader.readAsDataURL(file);
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
            setUploading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h2 className="text-xl font-bold text-[#4A3B40]">{mode === 'create' ? 'Add New Project' : 'Edit Project'}</h2>
                <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
                            <input {...register('title', { required: true })} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#E89BA7]" placeholder="e.g. Lumina Skin" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select {...register('category')} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#E89BA7]">
                                <option value="Brand Identity">Brand Identity</option>
                                <option value="Packaging Design">Packaging Design</option>
                                <option value="Web Design">Web Design</option>
                                <option value="Social Media">Social Media</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Client Industry</label>
                            <input {...register('client_industry')} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#E89BA7]" placeholder="e.g. Skincare, Tech" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Cover Image</label>
                        <div className="h-48 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-4 relative bg-gray-50 hover:bg-gray-100 transition-colors">
                            {coverPreview ? (
                                <img src={coverPreview} alt="Preview" className="h-full object-contain" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <ImageIcon className="mx-auto mb-2" />
                                    <span className="text-sm">Click to upload cover</span>
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'cover_image')}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Problem</label>
                        <textarea {...register('problem')} rows={4} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#E89BA7]" placeholder="Describe the client's challenge..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Solution</label>
                        <textarea {...register('solution')} rows={4} className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-[#E89BA7]" placeholder="How we solved it..." />
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 text-gray-500 font-medium hover:bg-gray-100 rounded-lg mr-4 transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={uploading}
                        className="px-6 py-2 bg-[#4A3B40] text-[#FAF9F6] font-medium rounded-lg hover:bg-opacity-90 transition-all flex items-center shadow-lg shadow-[#4A3B40]/20"
                    >
                        {uploading ? 'Processing...' : <><Save size={18} className="mr-2" /> Save Project</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Projects;
