import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Masonry } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilLocationPin, cilThumbUp } from '@coreui/icons';
import './style.css';
import { useNavigate } from 'react-router-dom';

const Post = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    borderRadius: '8px',
}));

export default function DiscoverPostList({ posts }) {
    const navigate = useNavigate();

    const handleClick = (postId) => {
        navigate(`/post/${postId}/${0}`);
    };
    return (
        <Box sx={{ width: '100%' }}>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                {posts.map((post, index) => (
                    <Post key={index} className="discover_post" onClick={() => handleClick(post._id)}>
                        {post.media && post.media.length > 0 && (
                            <Box>
                                {post.media[0].type === 'image' ? (
                                    <img
                                        src={post.media[0].url}
                                        style={{
                                            borderRadius: '8px',
                                            width: '100%',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ) : post.media[0].type === 'video' ? (
                                    <video
                                        controls
                                        src={post.media[0].url}
                                        style={{
                                            borderRadius: '8px',
                                            width: '100%',
                                            cursor: 'pointer',
                                        }}
                                    />
                                ) : null}
                            </Box>
                        )}
                        {post.text && (
                            <div>
                                <div className="discover_post_user">
                                    <div className="discover_post_user_name">
                                        <Avatar
                                            alt={post.user.name}
                                            src={post.user.picture}
                                            sx={{ width: 18, height: 18 }}
                                        />
                                        {post.user.name}
                                    </div>
                                    <div>
                                        {post.likes.length} <CIcon icon={cilThumbUp} className="icon_size_16 icon_button" />
                                    </div>
                                </div>
                                <div className="discover_post_content">
                                    <Typography variant="body2" component="p" gutterBottom>
                                        {post.text}
                                    </Typography>
                                </div>
                            </div>
                        )}
                    </Post>
                ))}
            </Masonry>
        </Box>
    );
}
