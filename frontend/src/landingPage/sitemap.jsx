import React from 'react';
import Sitemap from '../assets/img/Sitemap.png';

const SitemapPage = () => {
    const handleZoom = (event) => {
        const img = event.target;
        let zoom = img.style.transform === 'scale(1.5)' ? 'scale(1)' : 'scale(1.5)';
        img.style.transform = zoom;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-20">
            <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-8">Sitemap</h1>
                <div className="overflow-hidden">
                    <img
                        src={Sitemap}
                        alt="Sitemap"
                        className="transform transition-transform duration-500 cursor-pointer"
                        onClick={handleZoom}
                    />
                </div>
            </div>
        </div>
    );
};

export default SitemapPage;
