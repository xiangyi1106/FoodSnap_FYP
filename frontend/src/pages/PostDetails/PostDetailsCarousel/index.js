import React, { useEffect, useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CIcon from '@coreui/icons-react';
import {
  cilZoomIn, cilZoomOut
} from '@coreui/icons';

const PostDetailsCarousel = ({ media, currentIndex, setCurrentIndex, setVisible }) => {


  const settings = {
    dots: true,
    infinite: media.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentIndex,
    arrows: true, // Enable default navigation,
    afterChange: (current) => setCurrentIndex(current),
  };

  return (
    <PhotoProvider
      toolbarRender={({ onScale, scale, onClose }) => {
        return (
          <div style={{ display: 'flex', gap: '10px', color: '#fff' }} onClose={() => {setVisible(false);}}>
            {/* Zoom In Button */}
            <button
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onClick={() => onScale(scale + 1)}
            >
              <CIcon icon={cilZoomIn} className="icon_size_20" />

            </button>
            {/* Zoom Out Button */}
            <button
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                border: 'none',
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: '4px',
              }}
              onClick={() => onScale(scale - 1)}
            >
              <CIcon icon={cilZoomOut} className="icon_size_20" />
            </button>
            
          </div>
        );
      }}
      onVisibleChange={(isVisible) => setVisible(isVisible)}
    >
      <Slider {...settings}>
        {media.map((item, index) => (
          <div key={index} >
            <PhotoView src={item.url} >
              {item.type === 'image' ? (
                <img
                  src={item.url}
                  alt={`media-${index}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    maxHeight: '93vh', // Prevent overflow
                    backgroundColor: '#000', // Extra space with a background
                  }}
                />
              ) : (
                <video controls style={{ width: '100%' }}>
                  <source src={item.url} type="video/mp4" />
                </video>
              )}
            </PhotoView>
          </div>
        ))}
      </Slider>
    </PhotoProvider>
  );
};

export default PostDetailsCarousel;
