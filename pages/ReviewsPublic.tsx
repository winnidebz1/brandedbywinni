import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ReviewsPublic = () => {
    const [formData, setFormData] = useState({
        client_name: '',
        role: '', // Using role for Brand/Business Name
        service: 'Website Design',
        content: '',
        rating: 5,
        is_public_permission: true
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const { error } = await supabase.from('testimonials').insert([{
            ...formData,
            status: 'Pending'
        }]);

        if (!error) {
            setSubmitted(true);
        } else {
            console.error(error);
            alert('Something went wrong. Please try again.');
        }
        setLoading(false);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
                <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-xl text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={32} />
                    </div>
                    <h1 className="text-2xl font-bold font-serif text-[#4A3B40] mb-2">Thank You!</h1>
                    <p className="text-gray-500 mb-8">Your review has been submitted successfully. We appreciate your feedback!</p>
                    <Link to="/" className="text-[#4A3B40] font-medium hover:underline">Return to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF9F6] py-12 px-4 flex items-center justify-center">
            <div className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-serif text-[#4A3B40] mb-2">Rate Your Experience</h1>
                    <p className="text-gray-500">We'd love to hear about your project with Branded By Winni.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#E89BA7]"
                                value={formData.client_name}
                                onChange={e => setFormData({ ...formData, client_name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand / Business</label>
                            <input
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#E89BA7]"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Service Received</label>
                        <select
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#E89BA7]"
                            value={formData.service}
                            onChange={e => setFormData({ ...formData, service: e.target.value })}
                        >
                            <option>Website Design</option>
                            <option>Branding</option>
                            <option>SEO Optimization</option>
                            <option>Consultation</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex space-x-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, rating: star })}
                                    className="focus:outline-none transition-transform hover:scale-110"
                                >
                                    <Star
                                        size={32}
                                        fill={formData.rating >= star ? "#E89BA7" : "none"}
                                        className={formData.rating >= star ? "text-[#E89BA7]" : "text-gray-300"}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
                        <textarea
                            required
                            rows={4}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#E89BA7]"
                            placeholder="Share your experience..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            id="permission"
                            checked={formData.is_public_permission}
                            onChange={e => setFormData({ ...formData, is_public_permission: e.target.checked })}
                            className="w-4 h-4 text-[#4A3B40] rounded border-gray-300 focus:ring-[#4A3B40]"
                        />
                        <label htmlFor="permission" className="text-sm text-gray-500">
                            I agree to have this review displayed publicly on the website.
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#4A3B40] text-white font-bold py-4 rounded-xl hover:bg-[#644B52] transition-all transform active:scale-95 disabled:opacity-70"
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReviewsPublic;
