import React, { useEffect, useState } from 'react'
import FoodEventCard from '../../components/FoodEvent/FoodEventCard'
import PromotionFilter from '../../components/foodPromotion/Filter';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function FoodPromotion() {
    const events = [
        {
            image: 'https://3.bp.blogspot.com/-5vaTojemKfw/WS00mzcmBRI/AAAAAAAAGOc/MjrTjAHV5D4lPmy7vFxfNYjWIm56-__lwCLcB/s1600/Coffee%2BBean%2B%2526%2BTea%2BLeaf%2BDouble%2BChoc%2BPeppermint%2BBuy%2B1%2BFree%2B1%2BPromo.jpg',
            name: 'Start Your Day with Pure Bliss at Coffee Bean & Tea Leaf',
            link: '#',
            date: 'MON, 19 August, 2024',
            location: 'Coffee Bean & Tea Leaf',
        },
        {
            image: 'https://static.phdvasia.com/sg1/menu/combo/desktop_thumbnail_dc649532-98b2-49b7-b381-29292bdf17e1.jpg',
            name: '50% Off Pizza Hut Deluxe Cheese Pizza',
            link: '#',
            date: 'SAT, 7 September, 2024',
            location: 'Pizza Hut',
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIFTKiYdxAPE8yPiRrPxrlvJJlFQ_JPljNvg&s',
            name: 'New Tealive and Santan Combo',
            link: '#',
            date: 'SAT, 15 September, 2024',
            location: 'Tealive',
        }
    ];

    const [promotions, setPromotions] = useState([]);
    const [filteredPromotions, setFilteredPromotions] = useState([]); // State to store filtered promotions
    const [isEvent, setIsEvent] = useState(false);


    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPublicPromotions`, 
                );
                setPromotions(response.data);
                setFilteredPromotions(response.data);
            } catch (error) {
                toast.error("Error fetching Promotions: " + error.message);
            }
        };

        fetchPromotions();
    }, []);

     // Function to handle filtered results
     const handleResults = (results) => {
        if (results.length > 0) {
            setFilteredPromotions(null);
            setFilteredPromotions(results); // Set the filtered promotions
        } else {
            setFilteredPromotions(null);
        }
    };

    return (
        <div className='food_event_container'>
            <div>
                <div className='food_event_container_title'>Food Promotion</div>
            </div>
            <div className='filter_container'><PromotionFilter onResults={handleResults} isEvent={isEvent}/></div>
            <div className="food_event_card_container">
                {filteredPromotions ? filteredPromotions.map((event, index) => (
                    <FoodEventCard key={index} event={event} isEvent={isEvent}/>
                )) : <div>
                    No Promotion Found
                    </div>}
            </div>
        </div>

    )
}
