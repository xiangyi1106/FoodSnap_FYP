import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const PostDetailsCarousel = ({ media, currentIndex, setCurrentIndex }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? media.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box 
    // sx={{ maxWidth: 600, margin: 'auto', position: 'relative' }}
    sx={{
      flex: 1, // Matches the parent's flex size
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      position: 'relative',
      width: '100%',
      height: '100%', // Matches parent height
      overflow: 'hidden',
    }}
    >
      {/* Display Current Media */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 400, // Adjust height
          backgroundColor: '#000',
          overflow: 'hidden',
          borderRadius: 2,
        }}
      >
        {media[currentIndex]?.type === 'image' ? (
          <img
            src={media[currentIndex]?.url}
            alt={`media-${currentIndex}`}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
            }}
            loading="lazy"
          />
        ) : (
          <video controls style={{ maxWidth: '100%', maxHeight: '100%' }}>
            <source src={media[currentIndex]?.url} type="video/mp4" />
          </video>
        )}
      </Box>

      {/* Navigation Buttons */}
      <Button
        size="large"
        onClick={handleBack}
        sx={{
          position: 'absolute',
          top: '50%',
          left: 16,
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      >
        <KeyboardArrowLeft />
      </Button>

      <Button
        size="large"
        onClick={handleNext}
        sx={{
          position: 'absolute',
          top: '50%',
          right: 16,
          transform: 'translateY(-50%)',
          zIndex: 1,
          color: '#fff',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
        }}
      >
        <KeyboardArrowRight />
      </Button>

      {/* Pagination Dots */}
      <Grid
        container
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        {media.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: 12,
              height: 12,
              backgroundColor: currentIndex === index ? '#30BFBF' : '#c4c4c4',
              borderRadius: '50%',
              margin: '0 4px',
              cursor: 'pointer',
            }}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default PostDetailsCarousel;
