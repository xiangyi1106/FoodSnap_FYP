import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useMediaQuery } from 'react-responsive';
import Pagination from '@mui/material/Pagination';
import { getPostsByFoodVenue } from '../../functions/foodVenue';
import { toast } from 'react-toastify';

export default function MasonryImageList({user, foodVenue}) {
  const [foodVenuePost, setFoodVenuePost] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    if (foodVenue && foodVenue.name) {
      const fetchFoodVenuePost = async () => {
        try {
          const response = await getPostsByFoodVenue(foodVenue.name, user.token);
          setFoodVenuePost(response);
          console.log(response);
        } catch (error) {
          toast.error("Error fetching food venue, please try again: " + error.message);
        }
      };

      fetchFoodVenuePost();
    }
  }, [foodVenue?.name, user.token]);

  const query769px = useMediaQuery({
    query: "(max-width: 769px)",
  });

  const query564px = useMediaQuery({
    query: "(max-width: 564px)",
  });

  const cols = query564px ? 1 : query769px ? 2 : 3;

  // Extract all image URLs from the media array of each post
  const allImages = foodVenuePost
    .flatMap(post => post.media) // Get all media arrays from posts
    .filter(mediaItem => mediaItem.type === "image") // Filter to keep only image media
    .map(mediaItem => mediaItem.url); // Extract the URLs

  // Calculate the items to display for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allImages.slice(startIndex, endIndex);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {currentItems && currentItems.length > 0 ?
      <div>
      <ImageList variant="masonry" cols={cols} gap={8}>
        {currentItems.map((imgUrl, index) => (
          <ImageListItem key={index}>
            <img
              srcSet={`${imgUrl}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${imgUrl}?w=248&fit=crop&auto=format`}
              alt="Food venue media"
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Pagination
        count={Math.ceil(allImages.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
      />
      </div> : <div className='center'>
        No Photo Found
      </div>
}
    </Box>
  );
}
