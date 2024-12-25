import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostDetailsCarousel from './PostDetailsCarousel';
import PostDetailsInformation from './PostInformation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';

const PostDetailsPage = ({ user, dispatch }) => {
    const { id, mediaIndex } = useParams();
    const [post, setPost] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(parseInt(mediaIndex, 10) || 0);
    const [visible, setVisible] = useState(false);

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

    // Use navigate hook from react-router-dom
    const navigate = useNavigate();

    if (!post) return <div>Loading...</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden'}}>
            {/* Left part - Media */}
            <Box sx={{ flex: 2, marginRight: 2}} >
                {!visible && <div className='close_button hover_style_2' style={{ left: '12px', right: '0' }}><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => navigate(-1)} /></div>}
                <PostDetailsCarousel media={post.media} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}  setVisible={setVisible} />
            </Box>
            <PostDetailsInformation post={post} user={user} dispatch={dispatch} />
        </Box>
    );
};

export default PostDetailsPage;
