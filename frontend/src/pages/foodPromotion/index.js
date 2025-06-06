import React, { useEffect, useState } from 'react'
import FoodEventCard from '../../components/FoodEvent/FoodEventCard'
import PromotionFilter from '../../components/foodPromotion/Filter';
import axios from 'axios';
import { toast } from 'react-toastify';
import AddPromotion from './AddPromotion/AddPromotion';
import CardSkeleton from '../../components/Skeleton/CardSkeleton';
import RollingBanner from '../../components/Banner/RollingBanner';
import { zeorHungerMessage } from '../../data/zeroHungryMessage';

export default function FoodPromotion({ user }) {

    const [promotions, setPromotions] = useState([]);
    const [filteredPromotions, setFilteredPromotions] = useState([]); // State to store filtered promotions
    const [isEvent, setIsEvent] = useState(false);
    const [isCreatePromotionVisible, setIsCreatePromotionVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPromotions = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getPublicPromotions`,
                );
                setPromotions(response.data);
                setFilteredPromotions(response.data);
            } catch (error) {
                toast.error("Error fetching Promotions: " + error.message);
            }
            setLoading(false);
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
            <RollingBanner messages={zeorHungerMessage} />
            {isCreatePromotionVisible && <AddPromotion setIsCreatePromotionVisible={setIsCreatePromotionVisible} user={user} setPromotions={setPromotions} setFilteredPromotions={setFilteredPromotions} />}
            <div>
                <div className='food_event_container_title'>Food Promotions</div>
            </div>
            <div className='filter_container'><PromotionFilter onResults={handleResults} isEvent={isEvent} /></div>
            {loading ?
                <>
                    <CardSkeleton />
                </> :
                <div className="food_event_card_container">
                    {filteredPromotions && filteredPromotions.length > 0 ? filteredPromotions.map((event, index) => (
                        <FoodEventCard key={index} event={event} isEvent={isEvent} />
                    )) : 
                    <div>
                        No Promotion Found
                    </div>}
                </div>
            }
        </div>

    )
}
