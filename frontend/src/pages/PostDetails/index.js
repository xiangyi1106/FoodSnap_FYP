import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostDetailsCarousel from './PostDetailsCarousel';
import PostDetailsInformation from './PostInformation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';

const PostDetailsPage = ({user}) => {
    const { id, mediaIndex } = useParams();
    const [post, setPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(parseInt(mediaIndex, 10) || 0);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/post/${id}`); // Include ID in the request URL
                setPost(response.data);
            } catch (error) {
                toast.error("Error fetching posts: " + error.message);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        if (mediaIndex) {
          setCurrentIndex(parseInt(mediaIndex, 10));
        }
      }, [mediaIndex]);

      if (!post) return <div>Loading...</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh'}}>
            {/* Left part - Media */}
            <Box sx={{ flex: 2, marginRight: 2 }}>
                <PostDetailsCarousel media={post.media} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            </Box>
            <PostDetailsInformation post={post} user={user}/>
        </Box>
    );
};

export default PostDetailsPage;
