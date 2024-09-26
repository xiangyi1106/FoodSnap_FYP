import React, { useCallback, useRef, useState } from 'react';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';
import './style.css';
import Slider from '@mui/material/Slider';
import FoodResult from './foodResult';
import axios from 'axios';
import { getFoodRecommendations } from '../../functions/AIRecommendation';

export default function FoodSuggestion({ setVisible, location }) {
    // const [weather, setWeather] = useState('');
    const [mealType, setMealType] = useState('breakfast');
    const [mood, setMood] = useState('normal');
    const [dietaryPreference, setDietaryPreference] = useState('no');
    const [spicyLevelValue, setSpicyLevelValue] = useState(0); // State for spicy level
    const [loveIngredients, setLoveIngredients] = useState(''); // State for ingredients they love
    const [avoidIngredients, setAvoidIngredients] = useState(''); // State for ingredients they want to avoid

    // const handleWeatherChange = (selectedWeather) => setWeather(selectedWeather);
    const handleMealTypeChange = (selectedMealType) => setMealType(selectedMealType);
    const handleMoodChange = (selectedMood) => setMood(selectedMood);
    const handleDietaryPreferenceChange = (selectedDietaryPreference) => setDietaryPreference(selectedDietaryPreference);
    const handleSpicyLevelChange = (event, value) => setSpicyLevelValue(value); // Handle spicy level change
    const handleLoveIngredientsChange = (event) => setLoveIngredients(event.target.value); // Handle love ingredients
    const handleAvoidIngredientsChange = (event) => setAvoidIngredients(event.target.value); // Handle avoid ingredients

    const spicyLevel = [
        {
            value: 0,
            label: 'Not spicy',
        },
        {
            value: 25,
            label: 'Mild',
        },
        {
            value: 50,
            label: 'Medium',
        },
        {
            value: 75,
            label: 'Spicy',
        },
        {
            value: 100,
            label: 'Very Spicy',
        },
    ];

    function valuetext(value) {
        return `${value}%`;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [isResultShown, setIsResultShown] = useState(false);

    const handleClickFood = async () => {
        setIsLoading(true);
        const response = await getFoodRecommendations(
            mealType,
            mood,
            dietaryPreference,
            spicyLevelValue,
            loveIngredients,
            avoidIngredients,
            location,
            // user.token
        );
        // Check if media upload was successful
        const suggestions = response.data;
        setIsResultShown(true);
        setIsLoading(false);
        console.log('Suggestions:', suggestions);
        
    };
    return (
        <div className="blur place_detail_information" style={{ backgroundColor: "gray" }}>
            <div className="container_wrapper" style={{ backgroundColor: "#fff" }}>
                <div className="profile">
                    <div className="close_button hover_style_2">
                        <CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false); }} />
                    </div>
                    <div className="food_suggestion_container">
                        <h1>What Would You Like To Eat Today?</h1>
                        <div className="preferences">
                            <div className="preference_group">
                                <p>What is your mood now?</p>
                                <div className="button_group" style={{ gap: '40px' }}>
                                    <div className='emoji_group'>
                                        <img
                                            src={mood === "sad" ? "/emoji_icons/sad.png" : "/emoji_icons/sad_o.png"}
                                            className='emoji_button'
                                            alt="Sad"
                                            onClick={() => handleMoodChange('sad')}
                                        />
                                        <div className='emoji_group_text'>Sad</div>
                                    </div>

                                    <div className='emoji_group'>
                                        <img
                                            src={mood === "angry" ? "/emoji_icons/angry.png" : "/emoji_icons/angry_o.png"}
                                            className='emoji_button'
                                            alt="Angry"
                                            onClick={() => handleMoodChange('angry')}
                                        />
                                        <div className='emoji_group_text'>Angry</div>
                                    </div>

                                    <div className='emoji_group'>
                                        <img
                                            src={mood === "normal" ? "/emoji_icons/happy.png" : "/emoji_icons/happy_o.png"}
                                            className='emoji_button'
                                            alt="Normal"
                                            onClick={() => handleMoodChange('normal')}
                                        />
                                        <div className='emoji_group_text'>Normal</div>
                                    </div>

                                    <div className='emoji_group'>
                                        <img
                                            src={mood === "happy" ? "/emoji_icons/smile.png" : "/emoji_icons/smile_o.png"}
                                            className='emoji_button'
                                            alt="Happy"
                                            onClick={() => handleMoodChange('happy')}
                                        />
                                        <div className='emoji_group_text'>Happy</div>
                                    </div>
                                </div>
                            </div>
                            <div className="preference_group">
                                <p>What kind of meal are you looking for?</p>
                                <div className="button_group">
                                    <button onClick={() => handleMealTypeChange('breakfast')} className={mealType === 'breakfast' ? 'active' : ''}>Breakfast</button>
                                    <button onClick={() => handleMealTypeChange('lunch')} className={mealType === 'lunch' ? 'active' : ''}>Lunch</button>
                                    <button onClick={() => handleMealTypeChange('dinner')} className={mealType === 'dinner' ? 'active' : ''}>Dinner</button>
                                    <button onClick={() => handleMealTypeChange('snack')} className={mealType === 'snack' ? 'active' : ''}>Snack</button>
                                    <button onClick={() => handleMealTypeChange('dessert')} className={mealType === 'dessert' ? 'active' : ''}>Dessert</button>
                                </div>
                            </div>
                            <div className="preference_group">
                                <p>Are there any dietary restrictions or preferences you follow?</p>
                                <div className="button_group">
                                    <button onClick={() => handleDietaryPreferenceChange('no')} className={dietaryPreference === 'no' ? 'active' : ''}>No restrictions</button>
                                    <button onClick={() => handleDietaryPreferenceChange('vegetarian')} className={dietaryPreference === 'vegetarian' ? 'active' : ''}>Vegetarian</button>
                                    <button onClick={() => handleDietaryPreferenceChange('vegan')} className={dietaryPreference === 'vegan' ? 'active' : ''}>Vegan</button>
                                    <button onClick={() => handleDietaryPreferenceChange('halal')} className={dietaryPreference === 'halal' ? 'active' : ''}>Halal</button>
                                </div>
                            </div>
                            <div className="preference_group">
                                <p>How would you describe your preferred level of spiciness?</p>
                                <div className="button_group" style={{ width: '300px', color: '#30bfbfc0' }}>
                                    <Slider
                                        aria-label="Custom marks"
                                        defaultValue={0}
                                        getAriaValueText={valuetext}
                                        step={25}
                                        valueLabelDisplay="auto"
                                        marks={spicyLevel}
                                        className='logo_color_text'
                                        onChange={handleSpicyLevelChange}
                                    />
                                </div>
                            </div>
                            <div className="preference_group">
                                <p>Are there any specific ingredients you love?</p>
                                <div className="button_group" >
                                    <input type='text' name='' className='' placeholder='e.g., cheese, chocolate, seafood' onChange={handleLoveIngredientsChange} ></input>
                                </div>
                            </div>
                            <div className="preference_group">
                                <p>Are there any specific ingredients you want to avoid?</p>
                                <div className="button_group" >
                                    <input type='text' name='' className='' placeholder='e.g., nuts, dairy, soy' onChange={handleAvoidIngredientsChange} ></input>
                                </div>
                            </div>
                            <div className='preference_group'>
                                <button className="glow-on-hover" type="button" onClick={handleClickFood}>Search</button>
                            </div>
                            {isLoading && <div className='preference_group'>
                                <div className='loader'></div>
                                <p>Loading ...</p>
                            </div>}
                        </div>
                        {isResultShown && <FoodResult />}
                    </div>
                </div>
            </div>
        </div>
    )
}
