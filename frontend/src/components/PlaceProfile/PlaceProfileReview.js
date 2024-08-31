import React from 'react'
import PlaceProfileWriteReview from './PlaceProfileWriteReview'
import PlaceCommentSection from '../PlaceComment/PlaceCommentSection'

export default function PlaceProfileReview({user}) {
    const comments = [
        {
            "id": 1,
            "author": "John Doe",
            "date": "2024-08-12",
            "text": "This is a comment.",
            "avatarUrl": "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
            "replies": [
                {
                    "id": 2,
                    "author": "Jane Smith",
                    "date": "2024-08-12",
                    "text": "This is a reply to the comment.",
                    "avatarUrl": "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
                    "replies": [
                        {
                            "id": 3,
                            "author": "Alice Brown",
                            "date": "2024-08-12",
                            "text": "This is a nested reply.",
                            "avatarUrl": "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
                            "replies": []
                        }
                    ]
                }
            ]
        }
    ]

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
    

    return (
        <div className='profile_review'>
            <div className='profile_review_wrapper'>
                <PlaceProfileWriteReview user={user}/>
                <PlaceCommentSection initialComments={initialComments}/>
            </div>
        </div>
    )
}
