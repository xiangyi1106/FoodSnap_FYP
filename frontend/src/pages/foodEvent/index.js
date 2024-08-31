import React from 'react'
import FoodEventCard from '../../components/FoodEvent/FoodEventCard'
import PromotionFilter from '../../components/foodPromotion/Filter';
import Header from '../../components/header';
import LeftMenu from '../../components/home/LeftMenu';

export default function FoodEvent() {
    const events = [
        {
            image: 'https://scontent.fkul15-1.fna.fbcdn.net/v/t39.30808-6/409801029_382531084173175_4398605466227259281_n.jpg?stp=dst-jpg_s960x960&_nc_cat=101&ccb=1-7&_nc_sid=75d36f&_nc_ohc=47ywZ9fYNbAQ7kNvgHggL-i&_nc_ht=scontent.fkul15-1.fna&oh=00_AYAbkp2CrXl5rO1uNrwd6V2_wzu1d6wB4IooQ5hbLmP62w&oe=66C78187',
            title: '2024 Maryland SeaFood Festival',
            link: '#',
            date: 'SUN, 15 Sep, 2024 AT 01:00',
            location: 'Sandy Point State Park East Beach',
        },
        {
            image: 'https://scontent.fkul15-1.fna.fbcdn.net/v/t39.30808-6/436799457_833538032147579_5135934561585612414_n.jpg?stp=dst-jpg_s960x960&_nc_cat=101&ccb=1-7&_nc_sid=75d36f&_nc_ohc=A2es_ObCcVoQ7kNvgEDZFBu&_nc_ht=scontent.fkul15-1.fna&oh=00_AYD2I4CgN6WFMGcRSlwlpU6esvCqb_-E6_nNKBDrqWXpug&oe=66C792EC',
            title: 'Texas Banana Pudding Festival',
            link: '#',
            date: 'SAT, 21 Sep, 2024 AT 09:00',
            location: 'Slaton Bakery',
        },
        {
            image: 'https://scontent.fkul15-1.fna.fbcdn.net/v/t39.30808-6/451441902_888546159970655_5593796313567837807_n.jpg?stp=dst-jpg_p640x640&_nc_cat=105&ccb=1-7&_nc_sid=75d36f&_nc_ohc=tzm7X9hZFkYQ7kNvgGxxPO6&_nc_ht=scontent.fkul15-1.fna&oh=00_AYCufuzxqULtn3i53tVLK3QDOyeU4U_oFKxSlv78DohVHQ&oe=66C77B8E',
            title: '2024 Columbus Mac and Cheese Festival',
            link: '#',
            date: 'SAT, 5 Oct, 2024 AT 04:00',
            location: 'Easton Town Center',
        },
        // {
        //     image: 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyNDcwMTUwOQ&ixlib=rb-1.2.1&q=85',
        //     title: 'Gourmet Dinner',
        //     link: '#',
        //     date: 'SAT, 17 August, 2024 AT 09:00',
        //     location: 'Los Angeles, CA',
        // }
    ];

    return (
        <div className='food_event_container'>
            <div className='food_event_container_title'>Food Events</div>
            <div className='filter_container'><PromotionFilter /></div>
            <div className="food_event_card_container">
                {events.map((event, index) => (
                    <FoodEventCard key={index} event={event} />
                ))}
            </div>
        </div>
    )
}
