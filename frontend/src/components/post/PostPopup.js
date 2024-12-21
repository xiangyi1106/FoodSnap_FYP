import { cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useEffect, useState } from 'react'
import PostDetailsInformation from '../../pages/PostDetails/PostInformation';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function PostPopup({user}) {
    const [feedComment, setFeedComment] = useState(true);
    const { id } = useParams();
    const [post, setPost] = useState(null);

    const navigate = useNavigate(); // Create a navigate instance

  // Function to go to the previous page
  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };


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

    return (
        <div className='blur place_detail_information'>
            <div className='container_wrapper' style={{ backgroundColor: 'white'}}>
                <div className='profile'>
                </div>
                <div className='close_button hover_style_2' ><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={handleGoBack} /></div>
                <div style={{marginTop:'30px', padding: '10px 20px'}}>
                {post ? (
                    <PostDetailsInformation post={post} user={user} feedComment={feedComment} setFeedComment={setFeedComment} />
                ) : (
                    <div>Loading...</div> // Display a loading state
                )}
                </div>
            </div>
        </div>
    )
}
