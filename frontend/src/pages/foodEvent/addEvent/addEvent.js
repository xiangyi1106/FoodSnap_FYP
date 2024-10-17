import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { AddEventForm } from "./AddEventForm";
import './style.css';

export default function AddEvent({ setIsCreateFormVisible, user }) {
    return (
        <>
            <div className='blur place_detail_information'>
                <div className='container_wrapper' style={{backgroundColor: 'white'}}>
                    <div className='profile'>
                    </div>
                    <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setIsCreateFormVisible(false); console.log("visible none"); }} /></div>
                    <div className="settings_layout hidden">
                        <div className="settings_header">
                            <h2 className="settings_title">Add Event</h2>
                            <p className="settings_description">
                                Create a new event for others to join.
                            </p>
                        </div>
                        <div className="settings_separator"></div>
                        <div className="settings_container">
                            <AddEventForm user={user}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
