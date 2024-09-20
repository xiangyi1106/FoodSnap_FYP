import React from 'react'
import FoodEventCard from '../../components/FoodEvent/FoodEventCard'
import PromotionFilter from '../../components/foodPromotion/Filter';

export default function FoodPromotion() {
    const events = [
        {
            image: 'https://3.bp.blogspot.com/-5vaTojemKfw/WS00mzcmBRI/AAAAAAAAGOc/MjrTjAHV5D4lPmy7vFxfNYjWIm56-__lwCLcB/s1600/Coffee%2BBean%2B%2526%2BTea%2BLeaf%2BDouble%2BChoc%2BPeppermint%2BBuy%2B1%2BFree%2B1%2BPromo.jpg',
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
