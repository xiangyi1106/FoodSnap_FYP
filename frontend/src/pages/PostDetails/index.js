import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PostDetailsCarousel from './PostDetailsCarousel';
import PostDetailsInformation from './PostInformation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import SharePostPopUp from '../../components/sharePostPopup';

const PostDetailsPage = ({ user, dispatch }) => {
    const { id, mediaIndex } = useParams();
    // const location = useLocation();  // Get the location to retrieve state
    // const [post, setPost] = useState(location.state?.post || null);
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
        // console.log(dispatch);
    }, [id, dispatch]);

    // useEffect(() => {
    //     if (!post) {
    //         const fetchPosts = async () => {
    //             try {
    //                 const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/post/${id}`);
    //                 setPost(response.data);
    //             } catch (error) {
    //                 toast.error("Error fetching posts: " + error.message);
    //             }
    //         };
    //         fetchPosts();
    //     }
    // }, [id]);

    useEffect(() => {
        if (mediaIndex) {
            setCurrentIndex(parseInt(mediaIndex, 10));
        }
    }, [mediaIndex]);

    // Use navigate hook from react-router-dom
    const navigate = useNavigate();

    const [isShareVisible, setIsShareVisible] = useState(false);
    const [sharesCount, setSharesCount] = useState(0);
    const [feedComment, setFeedComment] = useState(true);
    const [selectedSharePost, setSelectedSharePost] = useState(null)

    if (!post) return <div>Loading...</div>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden'}}>
            {isShareVisible && selectedSharePost && <SharePostPopUp setIsShareVisible={setIsShareVisible} post={selectedSharePost} user={user} dispatch={dispatch} sharesCount={sharesCount} setSharesCount={setSharesCount}/>}
            {/* Left part - Media */}
            <Box sx={{ flex: 2, marginRight: 2}}  className='media-background'>
                {!visible && <div className='close_button hover_style_2' style={{ left: '12px', right: '0' }}><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => navigate(-1)} /></div>}
                <PostDetailsCarousel media={post.media} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}  setVisible={setVisible} />
            </Box>
            <PostDetailsInformation post={post} user={user} dispatch={dispatch} setIsShareVisible={setIsShareVisible} postDetailsPage sharesCount={sharesCount} setSharesCount={setSharesCount} feedComment={feedComment} setSelectedSharePost={setSelectedSharePost} fromPage={'imagePost'} />
        </Box>
    );
};

export default PostDetailsPage;
