import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { AddPromotionForm } from './AddPromotionForm';

export default function AddPromotion({ setIsCreatePromotionVisible, user, setPromotions, setFilteredPromotions, foodVenue }) {
    return (
        <>
            <div className='blur place_detail_information'>
                <div className='container_wrapper' style={{backgroundColor: 'white'}}>
                    <div className='profile'>
                    </div>
                    <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setIsCreatePromotionVisible(false); }} /></div>
                    <div className="settings_layout hidden">
                        <div className="settings_header">
                            <h2 className="settings_title">Add Promotion</h2>
                            <p className="settings_description">
                                Create a new promotion for consumers.
                            </p>
                        </div>
                        <div className="settings_separator"></div>
                        <div className="settings_container">
                            <AddPromotionForm setIsCreatePromotionVisible={setIsCreatePromotionVisible} user={user}  setPromotions={setPromotions} setFilteredPromotions={setFilteredPromotions} foodVenue={foodVenue}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
