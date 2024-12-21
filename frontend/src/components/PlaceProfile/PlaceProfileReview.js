import React, { useEffect, useState } from 'react'
import PlaceProfileWriteReview from './PlaceProfileWriteReview'
import PlaceCommentSection from '../PlaceComment/PlaceCommentSection'
import { useOutletContext } from 'react-router-dom';
import { addFoodVenueComment, getFoodVenueComments } from '../../functions/foodVenue';

export default function PlaceProfileReview({ user }) {
    const { foodVenue } = useOutletContext(); // Fetch the user profile data from context

    const initialComments = [
        {
            id: 1,
            author: 'Alice',
            date: '2024-03-21 11:21',
            text: 'This is a great place! Loved the ambiance.',
            avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
            replies: [
                {
                    id: 2,
                    author: 'Bob',
                    date: '2024-03-21 12:21',
                    text: 'I agree! The food was amazing.',
                    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
                    replies: [
                        {
                            id: 3,
                            author: 'Charlie',
                            date: '2024-03-21 13:21',
                            text: 'Absolutely! The desserts were the best part.',
                            avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
                            replies: []
                        }
                    ]
                }
            ]
        },
        {
            id: 4,
            author: 'Dave',
            date: '2024-08-11T09:00:00Z',
            text: 'Does anyone know if they have vegan options?',
            avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
            replies: [
                {
                    id: 5,
                    author: 'Eve',
                    date: '2024-08-11T09:30:00Z',
                    text: 'Yes, they have a few vegan dishes!',
                    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
                    replies: [
                        {
                            id: 6,
                            author: 'Frank',
                            date: '2024-08-11T10:00:00Z',
                            text: 'I tried the vegan burger, and it was really good.',
                            avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
                            replies: []
                        }
                    ]
                }
            ]
        }
    ];

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchFoodVenueComments = async () => {
            if (foodVenue && foodVenue._id) {  // Check if foodVenue and _id are defined
                const response = await getFoodVenueComments(foodVenue._id, user.token);
                setComments(response);
            }
        };

        fetchFoodVenueComments();
    }, [foodVenue, user.token]);

    const handleAddComment = async (text, parentCommentId) => {
        try {
            const response = await addFoodVenueComment(foodVenue._id, user, text, parentCommentId)
            if (parentCommentId) {
                const updatedComments = comments.map(comment => {
                    if (comment._id === parentCommentId) {
                        return response;
                    }
                    return comment;
                });
                setComments(updatedComments);
            } else {
                setComments([...comments, response]);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className='profile_review'>
            <div className='profile_review_wrapper'>
                <PlaceProfileWriteReview user={user} foodVenue={foodVenue} setComments={setComments}/>
                <div className='profile_review_section'>
                    <p style={{margin: '10px 25px'}}>All Review ({comments && comments.length})</p>
                    <PlaceCommentSection initialComments={initialComments} comments={comments} user={user} onAddComment={handleAddComment} setComments={setComments} />

                </div>
            </div>
        </div>
    )
}
