
import React, { useEffect, useRef, useState } from 'react'
import MenuList from './MenuList'
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { useOutletContext } from 'react-router-dom';
import { uploadMedias } from '../../functions/uploadMedia';
import FoodMenuPreview from './FoodMenuPreview';
import { Box, ImageList, ImageListItem } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
import { toast } from 'react-toastify';
import { updateFoodVenueMenu } from '../../functions/foodVenue';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import CIcon from '@coreui/icons-react';
import { cilZoomIn, cilZoomOut } from '@coreui/icons';

export default function PlaceProfileFoodMenu() {
  const [medias, setMedias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { foodVenue, user } = useOutletContext(); // Fetch the user profile data from context
  const [isMenuPreviewOpen, setIsMenuPreviewOpen] = useState(false);
  const [foodVenueMenu, setFoodVenueMenu] = useState([]);
  const mediainputref = useRef(null);
  const handleMedias = (e) => {
    let files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (readerEvent) => {
        // Add each media item at the end of the array
        setMedias((prevMedias) => [...prevMedias, readerEvent.target.result]);
        setIsMenuPreviewOpen(true);
      }
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
    });
  };

  useEffect(() => {
    // Only update foodVenueMenu if foodVenue.menu is not null or empty
    if (foodVenue?.menu && foodVenue.menu.length > 0) {
      setFoodVenueMenu(foodVenue.menu);
    } else {
      setFoodVenueMenu([]);  // Set it to empty array if menu is null or empty
    }
  }, [foodVenue]);  // This effect runs whenever foodVenue changes

  const handleClick = (e) => {
    mediainputref.current.click();
  }

  const menuSubmit = async () => {
    try {
      console.log(medias);
      if (medias && medias.length > 0) {
        setIsLoading(true);
        const menuMedias = medias.map((media) => {
          return dataURItoBlob(media);
        });
        const path = `${foodVenue._id}/menu`;
        let formData = new FormData();
        formData.append("path", path);
        menuMedias.forEach((media) => {
          formData.append("file", media);
        });
        console.log(formData);
        const response = await uploadMedias(formData, path, user.token);
        // Check if media upload was successful
        if (!response || response.length === 0) {
          throw new Error("Failed to upload media");
        }
        // // If the upload is successful, associate media URLs with the venue
        if (response) {
          //   const updatedMenu = response.map((url) => ({
          //     url, // URL of uploaded media
          //   }));

          await updateFoodVenueMenu(foodVenue._id, response, user);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error('Error submitting menu:', error);
      toast.error('Error submitting menu:', error);
      setIsLoading(false);
    }
  };

  // Disable outer scroll when popup is open
  useEffect(() => {
    if (isMenuPreviewOpen) {
      // Add class to body to disable scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling when popup is closed
      document.body.style.overflow = '';
    }

    return () => {
      // Cleanup on unmount or when the popup closes
      document.body.style.overflow = '';
    };
  }, [isMenuPreviewOpen]); // This effect will run whenever isMenuPreviewOpen changes


  const query769px = useMediaQuery({
    query: "(max-width: 769px)",
  });

  const query564px = useMediaQuery({
    query: "(max-width: 564px)",
  });

  const cols = query564px ? 1 : query769px ? 2 : 3;

  return (
    <div className='place_profile_photos'>
      {/* <MenuList /> */}
      <input type='file' multiple hidden onChange={handleMedias} ref={mediainputref} accept="image/*"></input>
      {isMenuPreviewOpen && <FoodMenuPreview setIsMenuPreviewOpen={setIsMenuPreviewOpen} medias={medias} setMedias={setMedias} mediainputref={mediainputref} menuSubmit={menuSubmit} />}
      <button className='green_btn' onClick={handleClick} style={{ marginBottom: '30px' }}>Upload Menu</button>
      {foodVenue?.menu && foodVenue?.menu.length > 0 ?
        <Box sx={{ width: '100%' }}>
          <ImageList variant="masonry" cols={cols} gap={8}>
            <PhotoProvider
              toolbarRender={({ onScale, scale }) => {
                return (
                  <div style={{ display: 'flex', gap: '10px', color: '#fff' }}>
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
            >

              {foodVenueMenu.map((imgUrl, index) => (
                <ImageListItem key={index}>
                  <PhotoView src={imgUrl.url} >
                    <img
                      srcSet={`${imgUrl.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${imgUrl.url}?w=248&fit=crop&auto=format`}
                      alt="Food venue media"
                      loading="lazy"
                      style={{cursor: 'pointer'}}
                    />
                  </PhotoView>
                </ImageListItem>
              ))}
            </PhotoProvider>
          </ImageList>
        </Box>
        : <p className='middle'>No Menu Added</p>
      }
    </div>
  )
}
