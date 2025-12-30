import React, { useState } from 'react';
import { Download, Search, Image, Type, File, Upload } from 'lucide-react';
import { Card, Button, Badge, PageHeader } from '../../components/portal/UI';
import { useProfile } from '../../hooks/useProfile';

const PortalAssets = () => {
    const { isAdmin } = useProfile();
    const [category, setCategory] = useState('all');

    const assets = [
        { id: 1, name: 'Brand Logo - Primary', type: 'image', category: 'logos', url: '#' },
        { id: 2, name: 'Brand Logo - White', type: 'image', category: 'logos', url: '#' },
        { id: 3, name: 'Inter Font Family', type: 'font', category: 'fonts', url: '#' },
        { id: 4, name: 'Instagram Story Template', type: 'file', category: 'templates', url: '#' },
    ];

    const filteredAssets = category === 'all' ? assets : assets.filter(a => a.category === category);

    return (
        <div className="space-y-8 animate-fadeIn">
            <PageHeader
                title="Brand Assets"
                subtitle="Official logos, fonts, and templates."
                action={isAdmin && (
                    <Button>
                        <Upload size={20} />
                        <span>Upload New Asset</span>
                    </Button>
                )}
            />

            {/* Filters */}
            <div className="flex items-center space-x-4 bg-white p-2 rounded-xl border border-brand-softGray w-full md:w-auto self-start">
                {['All', 'Logos', 'Fonts', 'Templates'].map((c) => (
                    <button
                        key={c}
                        onClick={() => setCategory(c.toLowerCase())}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === c.toLowerCase()
                                ? 'bg-brand-softBlush text-brand-deepPlum font-bold'
                                : 'text-brand-muted hover:text-brand-primaryPink'
                            }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {filteredAssets.map((asset) => (
                    <Card key={asset.id} className="group text-center">
                        <div className="h-32 bg-brand-softBlush/30 rounded-lg mb-4 flex items-center justify-center text-brand-primaryPink group-hover:scale-105 transition-transform duration-300">
                            {asset.type === 'image' && <Image size={48} />}
                            {asset.type === 'font' && <Type size={48} />}
                            {asset.type === 'file' && <File size={48} />}
                        </div>
                        <h3 className="font-bold text-brand-deepPlum truncate">{asset.name}</h3>
                        <p className="text-xs text-brand-muted mb-4 capitalize">{asset.category}</p>

                        <Button variant="secondary" className="w-full text-xs py-2">
                            <Download size={14} />
                            <span>Download</span>
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PortalAssets;
