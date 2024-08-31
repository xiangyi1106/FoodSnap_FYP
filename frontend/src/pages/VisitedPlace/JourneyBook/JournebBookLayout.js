import React from 'react';
import JourneyBook from './JourneyBook';
import JourneyBookPage from './JourneyBookPage';
import JourneyBookPageContent from './JourneyBookPageContent';
import JourneyBookMediaPage from './JourneyBookMediaPage';

export default function JourneyBookLayout({ posts }) {
    return (
        <JourneyBook>
            <JourneyBookPage 
                pageId={1} 
                frontContent={<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/193203/1111.jpg" alt="Post Photo" />} 
            />
            
            <JourneyBookPage 
                pageId={2} 
                frontContent={
                    <div className="page__content">
                        <h1 className="page__content-book-title">Name's Journey</h1>
                        <p className="page__content-author">Click on the marked date to see the details</p>
                    </div>
                }
                backContent={
                    <div className="page__content">
                        <h1 className="page__content-title">Contents</h1>
                        <table className="page__content-table">
                            <tbody>
                                <tr>
                                    <td align="left">Part I</td><td align="left">The Psycohistorians</td><td align="right">3</td>
                                </tr>
                                <tr>
                                    <td align="left">Part II</td><td align="left">The Encyclopedists</td><td align="right">43</td>
                                </tr>
                                <tr>
                                    <td align="left">Part III</td><td align="left">The Mayors</td><td align="right">87</td>
                                </tr>
                                <tr>
                                    <td align="left">Part IV</td><td align="left">The Traders</td><td align="right">147</td>
                                </tr>
                                <tr>
                                    <td align="left">Part V</td><td align="left">The Merchant Princes</td><td align="right">173</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                }
            />
            
            {posts.map((post, index) => (
                <>
                    <JourneyBookPage 
                        key={`content-${index}`}
                        pageId={index + 3} 
                        frontContent={
                            <JourneyBookPageContent 
                                title={post.title} 
                                textBlocks={post.textBlocks} 
                                reference={post.reference} 
                            />
                        } 
                    />
                    <JourneyBookPage 
                        key={`media-${index}`}
                        pageId={index + 4} 
                        frontContent={
                            <JourneyBookMediaPage 
                                mediaItems={post.mediaItems} 
                            />
                        } 
                    />
                </>
            ))}
        </JourneyBook>
    );
}
