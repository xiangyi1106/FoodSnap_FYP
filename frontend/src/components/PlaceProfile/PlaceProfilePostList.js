import * as React from 'react';
import Box from '@mui/material/Box';
import { Masonry } from '@mui/lab';
import Pagination from '@mui/material/Pagination';
import Post from '../post';

export default function PlaceProfilePostList({user}) {
    const [page, setPage] = React.useState(1);
    const itemsPerPage = 12;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Calculate the items to display for the current page
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = itemData.slice(startIndex, endIndex);

    return (
        <Box sx={{ width: '100%', minHeight: 829 }}>
            <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={2}>
                {currentItems.map((item, index) => (
                    <Post
                        key={index}
                        post={{
                            text: item.content,
                            media: item.media,
                            user: {
                                username: item.user.username,
                                name: item.user.name,
                                picture: item.user.picture,
                                gender: item.user.gender,
                            },
                            createdAt: item.createdAt,
                            privacy: item.privacy,
                        }}
                        user={user}
                    />
                ))}
            </Masonry>
            <Pagination
                count={Math.ceil(itemData.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}
            />
        </Box>
    );
}

const itemData = [
    {
        user: {
            username: 'foodie_jane',
            name: 'Jane Doe',
            picture: 'https://randomuser.me/api/portraits/women/50.jpg',
            gender: 'female',
        },
        content: "Had an incredible dinner at The Tribus last night. The grilled salmon was perfectly cooked, and the ambiance made the evening unforgettable! 🥂",
        media: [
            { type: 'image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWZ5IYfEczUFQvL-cPAOjwYKHiFkkda5muw&s' }
        ],
        createdAt: '2024-08-20T18:30:00Z',
        privacy: 'public',
    },
    {
        user: {
            username: 'johnny_chef',
            name: 'John Smith',
            picture: 'https://randomuser.me/api/portraits/men/45.jpg',
            gender: 'male',
        },
        content: "Brunch at The Tribus was simply amazing! The eggs benedict were spot on, and the service was top-notch. 🍳 Highly recommend this place!",
        media: [
            { type: 'image', url: 'https://fastly.4sqi.net/img/general/600x600/564566936_k16QklEvjCiTUQnPGcNW9EcYgz3EG0sVGzCqAT8rEvg.jpg' }
        ],
        createdAt: '2024-08-21T10:15:00Z',
        privacy: 'public',
    },
    // {
    //     user: {
    //         username: 'sarah_travels',
    //         name: 'Sarah Lee',
    //         picture: 'https://randomuser.me/api/portraits/women/25.jpg',
    //         gender: 'female',
    //     },
    //     content: "Visited The Tribus for the first time today. The interior design is so chic, and their desserts are to die for! 🍰 Can't wait to come back.",
    //     media: [
    //         { type: 'image', url: 'https://www.tribus.com.my/img/bg01.jpg' }
    //     ],
    //     createdAt: '2024-08-19T14:00:00Z',
    //     privacy: 'public',
    // },
    {
        user: {
            username: 'travel_johnson',
            name: 'Michael Johnson',
            picture: 'https://randomuser.me/api/portraits/men/30.jpg',
            gender: 'male',
        },
        content: "If you're in Impian Emas, you have to check out The Tribus. The food is top-notch, and the atmosphere is perfect for a relaxed evening out. 🍽️",
        media: [
            { type: 'image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRykOSL5EmnZ6pAG7R_2HdQrnk_NFtFhXqejw&s' }
        ],
        createdAt: '2024-08-18T19:45:00Z',
        privacy: 'public',
    },
    // {
    //     user: {
    //         username: 'gourmet_sam',
    //         name: 'Samantha Williams',
    //         picture: 'https://randomuser.me/api/portraits/women/30.jpg',
    //         gender: 'female',
    //     },
    //     content: "Dinner at The Tribus was absolutely delightful! The ambiance is cozy, and the service is excellent. I'll be coming back soon! 🌟",
    //     media: [
    //         { type: 'image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtC60V68EdE_W-l_2xTnKZoXgUKxtEyOeSGg&s' }
    //     ],
    //     createdAt: '2024-08-17T20:00:00Z',
    //     privacy: 'public',
    // },
    // {
    //     user: {
    //         username: 'adventure_alex',
    //         name: 'Alex Brown',
    //         picture: 'https://randomuser.me/api/portraits/men/20.jpg',
    //         gender: 'male',
    //     },
    //     content: "The Tribus is my new favorite spot in town. The food is amazing, and the vibe is just perfect. Great place to chill and enjoy a good meal! 🍝",
    //     media: [
    //         { type: 'image', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnCkwRU03lFlAWw32_yFVCS8-DiI9g28gKw&s' }
    //     ],
    //     createdAt: '2024-08-16T17:30:00Z',
    //     privacy: 'public',
    // },
    // Add more items as needed for the demo
];
