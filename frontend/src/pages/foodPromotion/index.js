import React from 'react'
import FoodEventCard from '../../components/FoodEvent/FoodEventCard'
import PromotionFilter from '../../components/foodPromotion/Filter';

export default function FoodPromotion() {
    const events = [
        {
            image: 'https://scontent.fkul15-1.fna.fbcdn.net/v/t39.30808-6/456030504_904008118437681_1768087270355138725_n.jpg?stp=dst-jpg_p526x296&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=AnmSQ8jfuwUQ7kNvgHpBemY&_nc_ht=scontent.fkul15-1.fna&oh=00_AYAqwm7dUHesDlyudsPVsK8PdJu6XnENWnOmkvvMCeArBA&oe=66C7AC4A',
            title: 'Start Your Day with Pure Bliss at Coffee Bean & Tea Leaf',
            link: '#',
            date: 'MON, 19 August, 2024',
            location: 'Coffee Bean & Tea Leaf',
        },
        {
            image: 'https://static.phdvasia.com/sg1/menu/combo/desktop_thumbnail_dc649532-98b2-49b7-b381-29292bdf17e1.jpg',
            title: '50% Off Pizza Hut Deluxe Cheese Pizza',
            link: '#',
            date: 'SAT, 7 September, 2024',
            location: 'Pizza Hut',
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIFTKiYdxAPE8yPiRrPxrlvJJlFQ_JPljNvg&s',
            title: 'New Tealive and Santan Combo',
            link: '#',
            date: 'SAT, 15 September, 2024',
            location: 'Tealive',
        }
    ];

    return (
        <div className='food_event_container'>
            <div>
                <div className='food_event_container_title'>Food Promotion</div>
            </div>
            <div className='filter_container'><PromotionFilter /></div>
            <div className="food_event_card_container">
                {events.map((event, index) => (
                    <FoodEventCard key={index} event={event} />
                ))}
            </div>
        </div>

    )
}
