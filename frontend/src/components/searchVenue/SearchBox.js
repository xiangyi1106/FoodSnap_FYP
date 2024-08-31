import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CIcon from '@coreui/icons-react';
import IconButton from '@mui/material/IconButton';
import { cilSearch, cilFilter, cilLightbulb } from '@coreui/icons';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Tooltip from '@mui/material/Tooltip';
import { CButton, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal } from '@coreui/react';
import { City, Country, State } from "country-state-city";
import Selector from './Selector';
import LocationSelector from './LocationSelector';
import FoodVenueFinder from './FoodVenueFinder';
import PlaceDetails from '../PlaceProfile';
import EditPlaceInfo from '../PlaceProfile/EditPlaceInfo';
import FoodSuggestion from '../AIRecommendation';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import ChangeLocationModal from './ChangeLocationModal';
import SearchFoodCategoryModal from './SearchFoodCategoryModal';

export default function SearchBox() {
    const [visible, setVisible] = useState(false);
    const countryData = Country.getAllCountries();
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);

    const [country, setCountry] = useState(countryData[0] || '');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');

    useEffect(() => {
        const states = State.getStatesOfCountry(country?.isoCode) || [];
        console.log(country?.isoCode)
        setStateData(states);
        console.log(state)
        console.log(stateData)

        if (states.length > 0) {
            setState(states[0]?.name || '');
        } else {
            setState('');
        }
    }, [country]);

    useEffect(() => {
        const cities = City.getCitiesOfState(country?.isoCode, state?.isoCode) || [];
        setCityData(cities);
        if (cities.length > 0) {
            setCity(cities[0]?.name || '');
        } else {
            setCity('');
        }
    }, [state]);

    // const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPlaceDetailsVisible, setPlaceDetailsVisible] = useState(false);
    const [isFoodVenueFinderVisible, setFoodVenueFinderVisible] = useState(false);
    const [isAISearchVisible, setIsAISearchVisible] = useState(false);
    const [isFilterVisible, setIsFiterVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');

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

    return (
        <Card sx={{ width: '100%', marginLeft: "auto", marginRight: "auto" }}>
            {isPlaceDetailsVisible && <PlaceDetails setVisible={setPlaceDetailsVisible} />}
            {/* {isPlaceDetailsVisible && <EditPlaceInfo setVisible={setPlaceDetailsVisible}/>} */}
            {isAISearchVisible && <FoodSuggestion setVisible={setIsAISearchVisible} />}
            <CardContent>
                <div className='searchbox_wrapper'>
                    <Tooltip title="Change Location">
                        <IconButton aria-label="location" onClick={() => setVisible(true)}>
                            {/* <CIcon icon={cilLocationPin} className="icon_size_18 logo_color_text" /> */}
                            <LocationOnIcon className="logo_color_text" />
                        </IconButton>
                    </Tooltip>

                    <div className="search search1">
                        <input type="text" placeholder="What would you like to eat today?" className="hide_input"></input>
                        <button type="submit" className="search_button"> <CIcon icon={cilSearch} className="icon_size_18" /></button>
                    </div>
                    <IconButton aria-label="filter" onClick={() => setIsFiterVisible(true)}>
                        <FilterAltIcon style={{ color: '#6C83B5' }} />
                    </IconButton>
                    <IconButton aria-label="AISearch" onClick={() => setIsAISearchVisible(true)}>
                        <TipsAndUpdatesIcon style={{ color: '#F5A762' }} />
                    </IconButton>
                </div>
                <FoodVenueFinder setVisible={setPlaceDetailsVisible} />
            </CardContent>
            <SearchFoodCategoryModal setVisible={setIsFiterVisible} visible={isFilterVisible} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
            <ChangeLocationModal setVisible={setVisible} visible={visible} setSelected={setCity} selected={city} />
        </Card>
    );
}
