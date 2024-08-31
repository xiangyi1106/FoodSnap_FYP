import React from 'react'
import { asianCuisines, foodCategory } from '../../data/foodCategory'
import { CButton, CModalBody, CModalFooter, CModalHeader, CModalTitle, CModal } from '@coreui/react';

export default function SearchFoodCategoryModal({ setVisible, visible, selectedCategory, setSelectedCategory }) {
    // const handleCategoryClick = (category) => {
    //     setSelectedCategory(category);
    // };

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
                <CModalBody>
                    <div className='selected_names'>
                        <div className={`selected_name hover_style_2 ${selectedCategory === null ? 'selected_active' : ''}`}
                            style={{ cursor: "pointer" }}
                            onClick={() => setSelectedCategory(null)}
                        >
                            No filter
                        </div>
                    </div>
                    <div className='category'>
                        <div className='category_title'>Cuisine Type</div>
                        <div className="selected_names" style={{ maxHeight: 'none' }} >
                            {asianCuisines.map((cuisine, index) => (
                                <div className={`selected_name hover_style_2 ${selectedCategory === cuisine ? 'selected_active' : ''}`}
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedCategory(cuisine)}
                                >
                                    {cuisine}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='category'>
                        <div className='category_title'>Dishes</div>
                        <div className="selected_names" style={{ maxHeight: 'none' }} >
                            {foodCategory.map((cuisine, index) => (
                                <div className={`selected_name hover_style_2 ${selectedCategory === cuisine ? 'selected_active' : ''}`}
                                    key={index}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setSelectedCategory(cuisine)}
                                >
                                    {cuisine}
                                </div>
                            ))}
                        </div>
                    </div>
                </CModalBody>
                <CModalFooter>
                    <CButton color="secondary" onClick={() => setVisible(false)}>
                        Cancel
                    </CButton>
                    <CButton color="primary">Ok</CButton>
                </CModalFooter>
            </CModal>
        </div>
    )
}
