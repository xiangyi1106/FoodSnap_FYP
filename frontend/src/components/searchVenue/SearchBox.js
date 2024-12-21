import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CIcon from '@coreui/icons-react';
import IconButton from '@mui/material/IconButton';
import { cilSearch, cilFilter, cilLightbulb } from '@coreui/icons';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Tooltip from '@mui/material/Tooltip';
import { City, Country, State } from "country-state-city";
import Selector from './Selector';
import LocationSelector from './LocationSelector';
import FoodVenueList from './FoodVenueList';
import PlaceDetails from '../PlaceProfile';
import EditPlaceInfo from '../PlaceProfile/EditPlaceInfo';
import FoodSuggestion from '../AIRecommendation';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ChangeLocationModal from './ChangeLocationModal';
import SearchFoodCategoryModal from './SearchFoodCategoryModal';
import { searchFoodVenue } from '../../functions/foodVenue';

export default function SearchBox({ setVisible, user, foodVenues, error, setFoodVenues, isAISearchVisible, setIsAISearchVisible }) {

    const [isPlaceDetailsVisible, setPlaceDetailsVisible] = useState(false);
    const [isFoodVenueFinderVisible, setFoodVenueFinderVisible] = useState(false);
    // const [isAISearchVisible, setIsAISearchVisible] = useState(false);
    const [isFilterVisible, setIsFiterVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [isEditPlaceVisible, setIsEditPlaceVisible] = useState(false);
    const location = localStorage.getItem('currentLocation') || 'Johor Bahru';
    const [searchTerm, setSearchTerm] = useState("");

    //Hide the outer scrollbar
    useEffect(() => {
        if (isPlaceDetailsVisible) {
            // Add no-scroll class to body when popup is open
            document.body.classList.add('overflow_hidden');
        } else {
            // Remove no-scroll class from body when popup is closed
            document.body.classList.remove('overflow_hidden');
        }

        // Cleanup function to remove the class when the component unmounts
        return () => {
            document.body.classList.remove('overflow_hidden');
        };
    }, [isPlaceDetailsVisible]);

    // Function to handle search submission
    const handleSearchSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        performSearch();
    };

    const performSearch = async () => {
        try {
            // Make an API call to the backend with the search term and location
            const response = await searchFoodVenue(searchTerm, location, user.token);
            setFoodVenues(response);
        } catch (error) {
            console.error("Error:", error);
            setFoodVenues([]);
        }
    }

    const handleClearSearch = async () => {
        setSearchTerm('');  // Clear the input field
        // Make an API call to the backend with the search term and location
        const response = await searchFoodVenue("", location, user.token);
        // Store the search results in state
        setFoodVenues(Array.isArray(response) ? response : []);
    };

    const searchHandler = async (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    return (
        <Card sx={{ width: '100%', marginLeft: "auto", marginRight: "auto" }}>
            {isPlaceDetailsVisible && <PlaceDetails setVisible={setPlaceDetailsVisible} />}
            {isAISearchVisible && <FoodSuggestion setVisible={setIsAISearchVisible} user={user} />}
            <CardContent>
                <div className='searchbox_wrapper'>
                    <Tooltip title="Change Location">
                        <IconButton aria-label="location" onClick={() => setVisible(true)}>
                            <LocationOnIcon className="logo_color_text" />
                        </IconButton>
                    </Tooltip>

                    <div className="search search1">
                        <input type="text"
                            placeholder="Search Food Venue..."
                            className="hide_input"
                            value={searchTerm} // Controlled input value
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                            onKeyUp={searchHandler}
                        >
                        </input>
                        <div>
                            <button type="submit" className="search_button" onClick={handleSearchSubmit}> <CIcon icon={cilSearch} className="icon_size_18" /></button>
                        </div>
                    </div>
                    <Tooltip title="Filter by Category">
                        <IconButton aria-label="filter" onClick={() => setIsFiterVisible(true)}>
                            <FilterAltIcon style={{ color: '#6C83B5' }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="AI Food Suggestion by Google Gemini">
                    <IconButton aria-label="AISearch" onClick={() => setIsAISearchVisible(true)}>
                        <TipsAndUpdatesIcon style={{ color: '#F5A762' }} />
                    </IconButton>
                    </Tooltip>
                </div>
                {(foodVenues || foodVenues.length > 0) && <FoodVenueList setVisible={setPlaceDetailsVisible} foodVenues={foodVenues} />}
                {(!foodVenues || foodVenues.length === 0) && error && <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>Sorry, there is no food venue found. Please change to another location to find another food venue.</p>}
                {(!foodVenues || foodVenues.length === 0 || !Array.isArray(foodVenues)) && <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>Sorry, there is no food venue found.</p>}
            </CardContent>
            <SearchFoodCategoryModal setVisible={setIsFiterVisible} visible={isFilterVisible} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
        </Card>
    );
}
