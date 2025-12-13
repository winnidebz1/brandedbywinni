import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, CheckCircle, EyeOff, Trash2, Search } from 'lucide-react';

const Reviews = () => {
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        const { data } = await supabase
            .from('reviews')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setReviews(data);
        setLoading(false);
    };

    const updateStatus = async (id: string, status: string) => {
        const { error } = await supabase.from('reviews').update({ status }).eq('id', id);
        if (!error) {
            setReviews(reviews.map(r => r.id === id ? { ...r, status } : r));
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this review?')) {
            await supabase.from('reviews').delete().eq('id', id);
            fetchReviews();
        }
    };

    const filteredReviews = reviews.filter(r => filterStatus === 'all' || r.status === filterStatus);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-serif text-[#4A3B40]">Customer Reviews</h1>
                    <p className="text-gray-500">Manage client testimonials and feedback.</p>
                </div>
                <div className="flex space-x-2">
                    {['all', 'Pending', 'Approved', 'Hidden'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filterStatus === status ? 'bg-[#4A3B40] text-white' : 'bg-white border text-gray-600'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-[#FAF9F6] border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-bold text-[#4A3B40] text-sm">Reviewer</th>
                            <th className="px-6 py-4 font-bold text-[#4A3B40] text-sm">Rating</th>
                            <th className="px-6 py-4 font-bold text-[#4A3B40] text-sm md:w-1/3">Message</th>
                            <th className="px-6 py-4 font-bold text-[#4A3B40] text-sm">Status</th>
                            <th className="px-6 py-4 font-bold text-[#4A3B40] text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredReviews.map((review) => (
                            <tr key={review.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-[#4A3B40]">{review.reviewer_name}</div>
                                    <div className="text-xs text-gray-500">{review.brand_name}</div>
                                    <div className="text-[10px] text-gray-400 mt-1">{new Date(review.created_at).toLocaleDateString()}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "" : "text-gray-300"} />
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600 leading-relaxed line-clamp-2">
                                    {review.review_text}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${review.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            review.status === 'Hidden' ? 'bg-gray-100 text-gray-600' :
                                                'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {review.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    {review.status !== 'Approved' && (
                                        <button onClick={() => updateStatus(review.id, 'Approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg" title="Approve">
                                            <CheckCircle size={18} />
                                        </button>
                                    )}
                                    {review.status !== 'Hidden' && (
                                        <button onClick={() => updateStatus(review.id, 'Hidden')} className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg" title="Hide">
                                            <EyeOff size={18} />
                                        </button>
                                    )}
                                    <button onClick={() => handleDelete(review.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-lg" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredReviews.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No reviews found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-8 p-6 bg-[#FAF9F6] rounded-xl border border-[#4A3B40]/10">
                <h3 className="font-bold text-[#4A3B40] mb-2">Share Review Link</h3>
                <p className="text-sm text-gray-500 mb-4">Send this link to clients to collect reviews directly.</p>
                <div className="flex items-center space-x-2">
                    <code className="bg-white px-4 py-2 rounded-lg border border-gray-200 text-sm flex-1 text-gray-600">
                        {window.location.origin}/review-us
                    </code>
                    <button
                        onClick={() => navigator.clipboard.writeText(`${window.location.origin}/review-us`)}
                        className="bg-[#4A3B40] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-opacity-90"
                    >
                        Copy Link
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Reviews;
