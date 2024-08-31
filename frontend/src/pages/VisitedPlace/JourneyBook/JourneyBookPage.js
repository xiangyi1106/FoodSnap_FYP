import React from 'react';

export default function JourneyBookPage({ pageId, children, frontContent, backContent }) {
    return (
        <>
            <input type="radio" name="page" id={`page-${pageId}`} />
            <label htmlFor={`page-${pageId}`} className={`book__page book__page--${pageId}`}>
                <div className="book__page-front">
                    {frontContent}
                    <div className="page__number">{pageId}</div>
                </div>
                {backContent && (
                    <div className="book__page-back">
                        {backContent}
                        <div className="page__number">{pageId}</div>
                    </div>
                )}
            </label>
        </>
    );
}
