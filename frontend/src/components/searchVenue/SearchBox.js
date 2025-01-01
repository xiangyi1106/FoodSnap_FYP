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
import { toggleScroll } from '../../functions/fileUtils';
import { HashLoader } from 'react-spinners';

export default function SearchBox({ setVisible, user, foodVenues, error, setFoodVenues, isAISearchVisible, setIsAISearchVisible, loading, setLoading }) {

    const [isPlaceDetailsVisible, setPlaceDetailsVisible] = useState(false);
    const [isFoodVenueFinderVisible, setFoodVenueFinderVisible] = useState(false);
    // const [isAISearchVisible, setIsAISearchVisible] = useState(false);
    const [isFilterVisible, setIsFiterVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [isEditPlaceVisible, setIsEditPlaceVisible] = useState(false);
    const location = localStorage.getItem('currentLocation') || 'Johor Bahru';
    const [searchTerm, setSearchTerm] = useState("");

    // Function to handle search submission
    const handleSearchSubmit = async (event) => {
        event.preventDefault(); // Prevent form submission from reloading the page
        performSearch();
    };

    const performSearch = async () => {
        setLoading(true);
        try {
            // Make an API call to the backend with the search term and location
            const response = await searchFoodVenue(searchTerm, location, user.token);
            setFoodVenues(response);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setFoodVenues([]);
            setLoading(false);
        }
    }

    const handleClearSearch = async () => {
        setLoading(true);
        try {
            setSearchTerm('');  // Clear the input field
            // Make an API call to the backend with the search term and location
            const response = await searchFoodVenue("", location, user.token);
            // Store the search results in state
            setFoodVenues(Array.isArray(response) ? response : []);
            setLoading(false);

        } catch (error) {
            console.error("Error:", error);
            setFoodVenues([]);
            setLoading(false);
        }

    };

    const searchHandler = async (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    };

    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);

    useEffect(() => {
        if (!searchTerm) {
            handleClearSearch();  // If the search term is empty, fetch all food venues
        }
    }, [searchTerm]);

    return (
        <Card sx={{ width: '100%', marginLeft: "auto", marginRight: "auto", height: '100vh' }}>
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
                {loading ?
                    <>
                        <div className="skelton_loader">
                            <HashLoader color="#30BFBF" />
                        </div>
                    </> :
                    <>
                        {(foodVenues && foodVenues.length > 0) ?
                            <FoodVenueList setVisible={setPlaceDetailsVisible} foodVenues={foodVenues} />
                            : <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>Sorry, there is no food venue found.</p>}
                    </>}
                {/* {(!foodVenues || foodVenues.length === 0) && error && <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>Sorry, there is no food venue found. Please change to another location to find another food venue.</p>} */}
                {/* {(!foodVenues || foodVenues.length === 0 || !Array.isArray(foodVenues)) && <p style={{ textAlign: 'center', color: 'gray', marginTop: '20px' }}>Sorry, there is no food venue found.</p>} */}
            </CardContent>
            <SearchFoodCategoryModal setVisible={setIsFiterVisible} visible={isFilterVisible} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} user={user} setFoodVenues={setFoodVenues} />
        </Card>
    );
}
