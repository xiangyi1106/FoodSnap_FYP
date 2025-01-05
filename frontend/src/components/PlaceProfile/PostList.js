import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Masonry } from '@mui/lab';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import CIcon from '@coreui/icons-react';
import { Avatar } from '@mui/material';
import { getPostsByFoodVenue } from '../../functions/foodVenue';
import { toast } from 'react-toastify';

import {
    cilLocationPin, cilThumbUp
} from '@coreui/icons';

const Post = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    //   textAlign: 'center',
    color: theme.palette.text.secondary,
    borderRadius: '8px',
}));

export default function PostList({ user, foodVenue }) {

    const [foodVenuePost, setFoodVenuePost] = useState([]);

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

    // const [page, setPage] = React.useState(1);
    // const itemsPerPage = 12;

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // // Calculate the items to display for the current page
    // const startIndex = (page - 1) * itemsPerPage;
    // const endIndex = startIndex + itemsPerPage;
    // const currentItems = itemData.slice(startIndex, endIndex);

    return (
        <Box sx={{ width: '100%'}}>
            {foodVenuePost && foodVenuePost?.length > 0 ?
                <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                    {foodVenuePost?.map((post, index) => (
                        <Post key={index}>
                            {post.media && (
                                <Box
                                    component="img"
                                    srcSet={`${post.media[0].url}?w=162&auto=format&dpr=2 2x`}
                                    src={`${post.media[0].url}?w=162&auto=format`}
                                    // alt={post.title}
                                    loading="lazy"
                                    sx={{
                                        borderBottomLeftRadius: 4,
                                        borderBottomRightRadius: 4,
                                        display: 'block',
                                        width: '100%',
                                    }}
                                />
                            )}
                            {(
                                <div>
                                    <div className='discover_post_user'>
                                        <div className='discover_post_user_name'>
                                            <Avatar alt={post?.user?.name} src={post?.user?.picture} sx={{ width: 18, height: 18 }} />{post?.user?.name}
                                        </div>
                                        {/* <div>{post?.likes.length !== 0} <CIcon icon={cilThumbUp} className="icon_size_16 icon_button" style={{ position: 'relative', bottom: '1px', marginLeft: '0' }} /></div> */}
                                    </div>
                                    <div className='discover_post_content'>
                                        <Typography variant="body2" component="p" gutterBottom>
                                            {post?.text}
                                        </Typography>
                                    </div>
                                </div>
                            )}
                        </Post>
                    ))}
                </Masonry>
                : <div className='center'>
                    No Related Post Found
                </div>
            }
            {/* <Pagination
                count={Math.ceil(itemData.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            /> */}
        </Box>
    );
}

const users = [
    { name: 'Amy', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { name: 'John', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { name: 'Lisa', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'David', avatar: 'https://randomuser.me/api/portraits/men/30.jpg' },
    { name: 'Emma', avatar: 'https://randomuser.me/api/portraits/women/24.jpg' },
    { name: 'Michael', avatar: 'https://randomuser.me/api/portraits/men/75.jpg' },
    { name: 'Sarah', avatar: 'https://randomuser.me/api/portraits/women/58.jpg' },
    { name: 'James', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { name: 'Sophia', avatar: 'https://randomuser.me/api/portraits/women/34.jpg' },
    { name: 'Daniel', avatar: 'https://randomuser.me/api/portraits/men/50.jpg' },
];

const itemData = [
    {
        title: 'Post 1',
        content: "Just had an amazing dinner at The Tribus in Impian Emas! The ambiance is so cozy, and the food is absolutely delicious. Their grilled chicken with rosemary sauce is a must-try! 🍗 The service was top-notch, too. Will definitely be coming back soon!",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWZ5IYfEczUFQvL-cPAOjwYKHiFkkda5muw&s',
        user: users[0]
    },
    {
        title: 'Post 2',
        content: "Went to The Tribus for brunch today, and it was a fantastic experience! The eggs benedict was perfectly cooked, and their homemade pastries are to die for. 🥐 If you're in Impian Emas, you have to check this place out! ",
        img: 'https://fastly.4sqi.net/img/general/600x600/564566936_k16QklEvjCiTUQnPGcNW9EcYgz3EG0sVGzCqAT8rEvg.jpg',
        user: users[1]
    },
    {
        title: 'Post 3',
        content: 'Had a delightful evening at The Tribus! The steak was cooked to perfection, and the sides were just as good. 🍷 The cozy atmosphere makes it the perfect spot for a date night. Highly recommend for anyone in the Impian Emas area! ',
        user: users[2]
    },
    {
        title: 'Post 4',
        content: "Lunch at The Tribus was an absolute treat! Their seafood platter is fresh and flavorful, and the portions are generous. 🦐 Great spot to catch up with friends over good food. Can't wait to try more from their menu!",
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6nHHJ3B_UUU7tw-38BCe-h52RHkJn9rjvKw&s',
        user: users[3]
    },
    {
        title: 'Post 5',
        content: 'This is the content of post 5.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykOSL5EmnZ6pAG7R_2HdQrnk_NFtFhXqejw&s',
        user: users[4]
    },
];


