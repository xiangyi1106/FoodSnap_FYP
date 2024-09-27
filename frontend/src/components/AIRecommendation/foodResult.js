import React, { useState } from 'react'
import FoodResultCard from './foodResultCard'
import { getRestaurantRecommendations } from '../../functions/AIRecommendation';

export default function FoodResult({ foodSuggestion, user }) {
    // const sandwichRestaurants = [
    //     {
    //         name: 'Restaurant The Tribus',
    //         rating: 4.3,
    //         hours: '11:30 AM - 12:30 AM daily',
    //         description: 'A popular spot known for its delicious sandwiches and cozy atmosphere.',
    //         address: '28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor',
    //         reason: 'Highly rated and offers a variety of sandwich options.'
    //     },
    //     {
    //         name: 'Permai Sandwich',
    //         rating: 5,
    //         hours: '11:30 AM - 12:30 AM daily',
    //         description: 'A local favorite with a reputation for its fresh ingredients and affordable prices.',
    //         address: '37, jalan impian emas 14, Skudai Iskandar puteri, 81300 Johor Bahru, Johor',
    //         reason: 'Excellent reviews and great value for money.'
    //     },
    //     // Add more restaurants here
    // ];

    // const foodChoiceButton = [
    //     'Pancakes',
    //     'Waffles',
    //     'Omelets',
    //     'Sandwiches',
    //     'Dim sum',
    //     'Noodles Soup',
    // ]

    const [visible, setVisible] = useState(false);
    const [restaurantSuggestion, setRestaurantSuggestion] = useState(null);
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
                {foodSuggestion && foodSuggestion.map((button) => (
                    <button
                        key={button}
                        className={`button_outline ${foodChoice === button ? 'button_outline_active' : ''}`}
                        onClick={() => handleClick(button)}
                    >
                        {button}
                    </button>
                ))}
            </div>
            {/* {visible && <div>
                <div className=''>Best restaurants serving sandwiches in {location} according to Google Maps from Google Gemin API</div>
                <div className='foodResult_body'>
                    {restaurantSuggestion && restaurantSuggestion.map((restaurant, index) => (
                        <FoodResultCard
                            name={restaurant.name}
                            hours={restaurant.hours}
                            rating={restaurant.rating}
                            description={restaurant.description}
                            reason={restaurant.reason}
                            address={restaurant.address}
                        />
                    ))}
                </div>
            </div>} */}
            {visible && restaurantSuggestion.length > 0 && (
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
            </div>}
            {/* {visible && restaurantSuggestion.length > 0 && (
                <div>
                    <div>
                        Best restaurants serving {foodChoice} in {location}:
                    </div>
                    <div className='foodResult_body'>
                        {Object.values(restaurantSuggestion).map((restaurant, index) => (
                            <FoodResultCard
                                key={index}
                                name={restaurant.name}
                                hours={restaurant.openHour}  // Use the correct field from JSON
                                rating={restaurant.rating}
                                description={restaurant.description}
                                reason={restaurant.reason}
                                address={restaurant.address}
                            />
                        ))}
                    </div>
                </div>
            )} */}
        </div>
    )
}
