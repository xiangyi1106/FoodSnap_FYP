import React, { useState } from 'react'
import FoodResultCard from './foodResultCard'
import { getRestaurantRecommendations } from '../../functions/AIRecommendation';

export default function FoodResult({ foodSuggestion, user, isFoodLoading, restaurantSuggestion, setRestaurantSuggestion }) {
 
    const [visible, setVisible] = useState(false);
    const location = localStorage.getItem('currentLocation') || 'Johor Bahru';
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (food) => {
        setFoodChoice(food);
        setIsLoading(true);
        const response = await getRestaurantRecommendations(
            food,
            location,
            user.token
        );

        const suggestions = response.restaurant_suggestions;
        setRestaurantSuggestion(suggestions);
        console.log('Suggestions:', suggestions);
        setIsLoading(false);
        setVisible(true);
    };

    const [foodChoice, setFoodChoice] = useState('');
    return (
        <div className='foodResult'>
            <div className='foodResult_title'>
                Food Suggestion
            </div>
            <div className='foodResult_list'>
                {foodSuggestion && foodSuggestion.length > 0 && foodSuggestion.map((button) => (
                    <button
                        key={button}
                        className={`button_outline ${foodChoice === button ? 'button_outline_active' : ''}`}
                        onClick={() => handleClick(button)}
                    >
                        {button}
                    </button>
                ))}
            </div>
            {/* {visible && restaurantSuggestion.length > 0 && !isLoading && !isFoodLoading && (
                <div>
                    <div className='' style={{display: 'flex', justifyContent: 'center'}}>
                        Best restaurants serving <span className='' style={{fontWeight: 'bold', margin: '0 4px'}}>{foodChoice}</span> in <span style={{fontWeight: 'bold',  margin: '0 4px'}}>{location}</span>:
                    </div>
                    <div className='foodResult_body'>
                        {restaurantSuggestion.map((restaurant, index) => (
                            <FoodResultCard
                                key={index}
                                name={restaurant.name}
                                hours={restaurant.openHour}  // Use correct field from JSON
                                rating={restaurant.rating}
                                description={restaurant.description}
                                reason={restaurant.reason}
                                address={restaurant.address}
                            />
                        ))}
                    </div>
                </div>
            )}
            {isLoading && <div className='preference_group'>
                <div className='loader'></div>
                <p>Loading ...</p>
            </div>} */}
        </div>
    )
}
