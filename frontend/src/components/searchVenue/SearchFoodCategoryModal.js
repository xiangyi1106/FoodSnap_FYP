import React, { useEffect, useState } from 'react'
import { asianCuisines, foodCategory, foodVenueFeatures, priceLevelCategory } from '../../data/foodCategory'
import { CButton, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal } from '@coreui/react';
import { toggleScroll } from '../../functions/fileUtils';
import { Badge } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { searchFoodVenuesByFilter } from '../../functions/foodVenue';
import { toast } from 'react-toastify';

export default function SearchFoodCategoryModal({ setVisible, visible, selectedCategory, setSelectedCategory, user, setFoodVenues }) {

    const [selectedCategories, setSelectedCategories] = useState([]); // For food categories
    const [selectedPriceLevel, setSelectedPriceLevel] = useState(null); // For price levels
    const [selectedTotal, setSelectedTotal] = useState([]); // Combined total


    const handleCategoryClick = (category) => {
        setSelectedTotal((prevSelectedCategories) => {
            // Check if the category belongs to priceLevelCategory
            if (priceLevelCategory.includes(category)) {
                // If the category is already selected, remove it (toggle off)
                if (prevSelectedCategories.includes(category)) {
                    setSelectedPriceLevel(null);
                    return prevSelectedCategories.filter((item) => item !== category);
                }
                // Otherwise, replace any previously selected price level with the new one
                setSelectedPriceLevel(mapPriceLevelForBackend(category));
                return [
                    ...prevSelectedCategories.filter((item) => !priceLevelCategory.includes(item)),
                    category,
                ];
            } else {
                // Toggle the category for non-price level items
                if (prevSelectedCategories.includes(category)) {
                    // setSelectedCategories((prev)=> prev.filter((item) => item !== category));
                    return prevSelectedCategories.filter((item) => item !== category);
                } else {
                    // setSelectedCategories();
                    // setSelectedCategories((prev) => [...prev, category] );
                    return [...prevSelectedCategories, category];
                }
            }
        });
    };
    // // Handle category clicks
    // const handleCategoryClick = (category) => {
    //     if (priceLevelCategory.includes(category)) {
    //         // Handle price level
    //         setSelectedPriceLevel((prev) => (prev === category ? null : category));

    //         // Update total state
    //         setSelectedTotal((prev) => {
    //             if (prev.includes(category)) {
    //                 return prev.filter((item) => item !== category);
    //             }
    //             return [...prev.filter((item) => !priceLevelCategory.includes(item)), category];
    //         });
    //     } else {
    //         // Handle food categories
    //         setSelectedCategories((prev) => {
    //             const newCategories = prev.includes(category)
    //                 ? prev.filter((item) => item !== category)
    //                 : [...prev, category];
    //             // Update total state
    //             setSelectedTotal((prevTotal) => {
    //                 if (prevTotal.includes(category)) {
    //                     return prevTotal.filter((item) => item !== category);
    //                 }
    //                 return [...prevTotal, category];
    //             });
    //             return newCategories;
    //         });
    //     }
    // };

    // Clear all selected categories
    const clearAllCategories = () => {
        setSelectedCategories([]);
        setSelectedPriceLevel(null);
        setSelectedTotal([]);
    };

    // Map price levels for backend
    const mapPriceLevelForBackend = (priceLevel) => {
        if (priceLevel === '<= RM20') return 'RM1-20';
        if (priceLevel === '> RM20') return 'RM20-40';
        return priceLevel; // Default case
    };


    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);

    const handleApplyFilters = async () => {
        // Send the selected filters to the parent component or directly to backend
        // Send the filters to the parent component to fetch the data

        try {
            let updatedSelectedCategories = [...selectedTotal];

            // Filter out <= RM10 and >= RM10 from selectedCategories if they exist
            updatedSelectedCategories = updatedSelectedCategories.filter(
                (category) => category !== '<= RM20' && category !== '> RM20'
            );

            // Update selectedCategories with the filtered categories
            setSelectedCategories(updatedSelectedCategories);

            const filters = {
                categories: updatedSelectedCategories,
                priceLevel: selectedPriceLevel,
                // features: selectedFeatures,
            };
            const location = localStorage.getItem('currentLocation') || 'Johor Bahru';
            // console.log(updatedSelectedCategories, selectedPriceLevel, location);
            const response = await searchFoodVenuesByFilter(location, filters, user?.token);
            console.log(response);
            if(response){
                setFoodVenues(response);
            }else{
                setFoodVenues([]);
            }
            setVisible(false); // Close the modal
        } catch (error) {
            toast.error("Error searching food venue, please try again.");
        }
    };

    return (
        <div className='modal-open'>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="VerticallyCenteredExample"
            >
                <CModalHeader>
                    <CModalTitle id="VerticallyCenteredExample">Advanced Filter</CModalTitle>
                </CModalHeader>
                <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    {/* <div className='selected_names'>
                        <div className={`selected_name hover_style_2 ${selectedCategory === null ? 'selected_active' : ''}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedCategory(null)}
                        >
                            No filter
                        </div>
                    </div> */}
                    <div className='category'>
                        <div className="selected_categories">
                            {selectedTotal.length > 0 && (
                                <>
                                    <span style={{ color: 'gray', fontSize: '0.9' }}>Filter {selectedTotal.length} </span>
                                    {/* <Badge badgeContent={4} color="primary">
                                        <FilterAltIcon style={{ color: '#6C83B5' }} />
                                    </Badge> */}
                                    <div className="selected_categories_list">
                                        {selectedTotal.map((category, index) => (
                                            <div
                                                key={index}
                                                className="selected_category_item"
                                                style={{ marginRight: '8px', display: 'inline-block' }}
                                            >
                                                {category}
                                            </div>
                                        ))}
                                    </div>
                                    <p onClick={clearAllCategories} className="clearAll_textButton">Clear All</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className='category'>
                        <div className='category_title'>Price Level</div>
                        <div className="select_category">
                            {priceLevelCategory.map((p, index) => (
                                <div className={`selected_name hover_style_2 ${selectedTotal.includes(p) ? 'selected_active' : ''}`}
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleCategoryClick(p)}
                                >
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='category'>
                        <div className='category_title'>Cuisine/Food Type</div>
                        <div className="select_category">
                            {foodCategory.map((cuisine, index) => (
                                <div className={`selected_name hover_style_2 ${selectedTotal.includes(cuisine) ? 'selected_active' : ''}`}
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    // onClick={() => setSelectedCategory(cuisine)}
                                    onClick={() => handleCategoryClick(cuisine)}
                                >
                                    {cuisine}
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* <div className='category'>
                        <div className='category_title'>Features</div>
                        <div className="select_category">
                            {foodVenueFeatures.map((p, index) => (
                                <div className={`selected_name hover_style_2 ${selectedCategory.includes(p) ? 'selected_active' : ''}`}
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleCategoryClick(p)}
                                >
                                    {p}
                                </div>
                            ))}
                        </div>
                    </div> */}
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary" onClick={handleApplyFilters} >Ok</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}
