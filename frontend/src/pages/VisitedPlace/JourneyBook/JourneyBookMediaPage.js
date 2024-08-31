import React from 'react';

export default function JourneyBookMediaPage({ mediaItems }) {
    return (
        <div className="page__content">
            {mediaItems.map((item, index) => (
                item.type === 'image' ? 
                <img key={index} src={item.src} alt={item.alt} /> : 
                <video key={index} controls src={item.src}></video>
            ))}
        </div>
    );
}
