import { useState } from 'react';
import './MediaCarousel.css';

export default function MediaCarousel({ media }) {
    // State to track the current media index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next media
    const nextMedia = () => {
        if (currentIndex < media.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(0); // loop back to the first item
        }
    };

    // Function to go to the previous media
    const prevMedia = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        } else {
            setCurrentIndex(media.length - 1); // loop back to the last item
        }
    };

    return (
        <div className="carousel-container">
            {media && media.length > 0 && (
                <div className="carousel">
                    {/* Media display */}
                    <div className="media-display">
                        {media[currentIndex].type === "image" ? (
                            <img
                                src={media[currentIndex].url}
                                alt={`Media ${currentIndex}`}
                                style={{ width: '100%', maxWidth: '500px' }}
                            />
                        ) : media[currentIndex].type === "video" ? (
                            <video controls style={{ width: '100%', maxWidth: '500px' }}>
                                <source src={media[currentIndex].url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div>Unsupported Media Type</div>
                        )}
                    </div>

                    {/* Carousel Navigation Buttons */}
                    <div className="carousel-nav">
                        <button onClick={prevMedia} className="prev-btn">Prev</button>
                        <button onClick={nextMedia} className="next-btn">Next</button>
                    </div>

                    {/* Optional: Indicator for current media */}
                    <div className="carousel-indicator">
                        {currentIndex + 1} / {media.length}
                    </div>
                </div>
            )}
        </div>
    );
}
