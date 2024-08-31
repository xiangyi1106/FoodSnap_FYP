import React from 'react';

export default function JourneyBookPageContent({ title, textBlocks, reference }) {
    return (
        <div className="page__content">
            {title && <h1 className="page__content-title">{title}</h1>}
            {textBlocks.map((text, index) => (
                <p key={index} className="page__content-blockquote-text">{text}</p>
            ))}
            {reference && <span className="page__content-blockquote-reference">{reference}</span>}
        </div>
    );
}
