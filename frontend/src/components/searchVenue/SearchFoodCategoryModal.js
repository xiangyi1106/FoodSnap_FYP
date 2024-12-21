import React, { useEffect } from 'react'
import { asianCuisines, foodCategory } from '../../data/foodCategory'
import { CButton, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal } from '@coreui/react';

export default function SearchFoodCategoryModal({ setVisible, visible, selectedCategory, setSelectedCategory }) {
    const handleCategoryClick = (category) => {
        // Toggle the category in the selectedCategory array
        setSelectedCategory(prevSelectedCategories => {
            if (prevSelectedCategories.includes(category)) {
                // If category is already selected, remove it
                return prevSelectedCategories.filter(item => item !== category);
            } else {
                // If category is not selected, add it
                return [...prevSelectedCategories, category];
            }
        });
    };

    // Clear all selected categories
    const clearAllCategories = () => {
        setSelectedCategory([]);
    };

    // Disable body scroll when the modal is visible
    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto'; // Clean up when modal is closed
        };
    }, [visible]);

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
                            {selectedCategory.length > 0 && (
                                <>
                                    {/* <div className="selected_categories_header">
                                        <div className="selected_categories_title">Selected Categories:</div>
                                        <CButton
                                            color="danger"
                                            onClick={clearAllCategories}
                                            size="sm"
                                        >
                                            Clear All
                                        </CButton>
                                    </div> */}
                                    Filter {selectedCategory.length}
                                    <div className="selected_categories_list">
                                        {selectedCategory.map((category, index) => (
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
                        <div className='category_title'>Cuisine Type</div>
                        <div className="select_category" >
                            {asianCuisines.map((cuisine, index) => (
                                <div className={`selected_name hover_style_2 ${selectedCategory.includes(cuisine) ? 'selected_active' : ''}`}
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
                    <div className='category'>
                        <div className='category_title'>Dishes</div>
                        <div className="select_category">
                            {foodCategory.map((cuisine, index) => (
                                <div className={`selected_name hover_style_2 ${selectedCategory.includes(cuisine) ? 'selected_active' : ''}`}
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
                </CModalBody>
                {/* <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary">Ok</CButton>
                </CModalFooter> */}
            </CModal>
        </div>
    )
}
