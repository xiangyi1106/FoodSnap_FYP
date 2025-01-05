import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { EditEventForm } from './EditEventForm';
import { useEffect } from 'react';
import { toggleScroll } from '../../../functions/fileUtils';

export default function EditEvent({ setVisible, eventId, user }) {
    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);
    return (
        <>
            <div className='blur place_detail_information'>
                <div className='container_wrapper' style={{backgroundColor: 'white'}}>
                    <div className='profile'>
                    </div>
                    <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false);}} /></div>
                    <div className="settings_layout hidden">
                        <div className="settings_header">
                            <h2 className="settings_title">Edit Event</h2>
                            <p className="settings_description">
                                Edit the event details.
                            </p>
                        </div>
                        <div className="settings_separator"></div>
                        <div className="settings_container">
                            <EditEventForm user={user} setVisible={setVisible} eventId={eventId}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
