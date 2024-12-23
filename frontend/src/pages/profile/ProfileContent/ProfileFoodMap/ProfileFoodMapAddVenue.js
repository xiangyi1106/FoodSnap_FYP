import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { ProfileFoodMapAddVenueForm } from './ProfileFoodMapAddVenueForm';

export default function ProfileFoodMapAddVenue({ setVisible, user, setFoodVenuesMap }) {
    return (
        <>
            <div className='blur place_detail_information'>
                <div className='container_wrapper' style={{ backgroundColor: 'white' }}>
                    <div className='profile'>
                    </div>
                    <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false); }} /></div>
                    <div className="settings_layout hidden">
                        <div className="settings_header">
                            <h2 className="settings_title">Add Food Venue</h2>
                            <p className="settings_description">
                                Add your favourite food venues to form a personalized map
                            </p>
                        </div>
                        <div className="settings_separator"></div>
                        <div className="settings_container">
                            <ProfileFoodMapAddVenueForm user={user} setVisible={setVisible} setFoodVenuesMap={setFoodVenuesMap} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
