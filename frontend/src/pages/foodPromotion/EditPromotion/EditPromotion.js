import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { EditPromotionForm } from './EditPromotionForm';

export default function EditPromotion({ setVisible, promotionId, user }) {
    return (
        <>
            <div className='blur place_detail_information'>
                <div className='container_wrapper' style={{backgroundColor: 'white'}}>
                    <div className='profile'>
                    </div>
                    <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false);}} /></div>
                    <div className="settings_layout hidden">
                        <div className="settings_header">
                            <h2 className="settings_title">Edit Promotion</h2>
                            <p className="settings_description">
                                Edit the promotion details.
                            </p>
                        </div>
                        <div className="settings_separator"></div>
                        <div className="settings_container">
                            <EditPromotionForm user={user} setVisible={setVisible} promotionId={promotionId}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
