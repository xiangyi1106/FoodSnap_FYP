
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
  const { foodVenue, user, setFoodVenue } = useOutletContext(); // Fetch the user profile data from context
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

  const [validityToEditFoodVenue, setValidityToEditFoodVenue] = useState(false);

  useEffect(() => {
    if (foodVenue) {
      // Check if foodVenue has a valid menu and set it
      setFoodVenueMenu(foodVenue.menu || []);
      if (foodVenue._id && user.role === 'business' && user.foodVenueOwned === foodVenue._id) {
        setValidityToEditFoodVenue(true);
      }
      // console.log(validityToEditFoodVenue);
    }
  }, [foodVenue]);  // Only runs when `foodVenue` changes


  const handleClick = (e) => {
    mediainputref.current.click();
  }

  const menuSubmit = async () => {
    try {
      // console.log(medias);
      // Store the previous state before the optimistic update
      // const previousMenuState = [...foodVenueMenu];

      if (medias && medias.length > 0) {
        setIsLoading(true);
        // Optimistically update the menu state by adding new media to the local state
        // const updatedMenu = [...foodVenueMenu, ...medias];
        // setFoodVenueMenu(updatedMenu);

        const menuMedias = medias.map((media) => {
          return dataURItoBlob(media);
        });
        const path = `${foodVenue._id}/menu`;
        let formData = new FormData();
        formData.append("path", path);
        menuMedias.forEach((media) => {
          formData.append("file", media);
        });
        // console.log(formData);

        const response = await uploadMedias(formData, path, user.token);
        // Check if media upload was successful
        if (!response || response.length === 0) {
          // throw new Error("Failed to upload media");
          toast.error('Failed to upload menu, please try again');
          return;
        }

        // // If the upload is successful, associate media URLs with the venue
        if (response) {
          const res = await updateFoodVenueMenu(foodVenue._id, response, user);
          if (res.success) {
            setFoodVenueMenu(res.menu);
          }
          toast.success('Menu updated successfully!');
          setIsLoading(false);
        }
      }
      setIsMenuPreviewOpen(false);
    } catch (error) {
      console.error('Error submitting menu:', error);
      toast.error('Error submitting menu:', error);
      // If upload fails, rollback to the previous state (before optimistic update)
      // setFoodVenueMenu(previousMenuState);
      setIsLoading(false);
      setIsMenuPreviewOpen(false);
    }
  };

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
      {/* {isMenuPreviewOpen && <FoodMenuPreview setIsMenuPreviewOpen={setIsMenuPreviewOpen} medias={medias} setMedias={setMedias} mediainputref={mediainputref} menuSubmit={menuSubmit} isLoading={isLoading} />} */}
      {validityToEditFoodVenue && <button className='green_btn' onClick={handleClick} style={{ marginBottom: '30px' }}>Upload Menu</button>}
      {/* {<button className='green_btn' onClick={handleClick} style={{ marginBottom: '30px' }}>Upload Menu</button>} */}
      {foodVenueMenu && foodVenueMenu.length > 0 ?
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
                      style={{
                        cursor: 'pointer',
                        width: '100%',
                        height: 'auto', // Maintain aspect ratio
                        maxWidth: '400px', // Max size for large screens
                      }}
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
