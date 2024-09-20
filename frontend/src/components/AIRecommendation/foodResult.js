import React, { useState } from 'react'
import FoodResultCard from './foodResultCard'

export default function FoodResult() {
    const sandwichRestaurants = [
        {
            name: 'Restaurant The Tribus',
            rating: 4.3,
            hours: '11:30 AM - 12:30 AM daily',
            description: 'A popular spot known for its delicious sandwiches and cozy atmosphere.',
            address: '28, Jalan Impian Emas 7, Taman Impian Emas, 81300 Skudai, Johor',
            reason: 'Highly rated and offers a variety of sandwich options.'
        },
        {
            name: 'Permai Sandwich',
            rating: 5,
            hours: '11:30 AM - 12:30 AM daily',
            description: 'A local favorite with a reputation for its fresh ingredients and affordable prices.',
            address: '37, jalan impian emas 14, Skudai Iskandar puteri, 81300 Johor Bahru, Johor',
            reason: 'Excellent reviews and great value for money.'
        },
        // Add more restaurants here
    ];

    const foodChoiceButton = [
        'Pancakes',
        'Waffles',
        'Omelets',
        'Sandwiches',
        'Dim sum',
        'Noodles Soup',
    ]

    const [visible, setVisible] = useState(false);

    const handleClick = (food) => {
        setFoodChoice(food);
        setVisible(true);
    };

    const [foodChoice, setFoodChoice] = useState('');
    return (
        <div className='foodResult'>
            <div className='foodResult_title'>
                Food Suggestion
            </div>
            <div className='foodResult_list'>
                {foodChoiceButton.map((button) => (
                    <button
                        key={button}
                        className={`button_outline ${foodChoice === button ? 'button_outline_active' : ''}`}
                        onClick={() => handleClick(button)}
                    >
                        {button}
                    </button>
                ))}
            </div>
            {visible && <div>
                <div className=''>Best restaurants serving sandwiches in Taman Impian Emas according to Google Maps from Google Gemin API</div>
                <div className='foodResult_body'>
                    {sandwichRestaurants.map((restaurant, index) => (
                        <FoodResultCard
                            name={restaurant.name}
                            hours={restaurant.hours}
                            rating={restaurant.rating}
                            description={restaurant.description}
                            reason={restaurant.reason}
                            address={restaurant.address}
                        />
                    ))}
                    {/* <FoodResultCard />
                <FoodResultCard />
                <FoodResultCard /> */}
                </div>
            </div>}
        </div>
    )
}
