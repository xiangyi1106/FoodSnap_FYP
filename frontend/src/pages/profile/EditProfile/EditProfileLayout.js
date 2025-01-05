import Header from "../../../components/header";
import { EditProfileForm } from "./EditProfileForm";
import "./style.css";
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';
import { toggleScroll } from "../../../functions/fileUtils";
import { useEffect } from "react";

// const sidebarNavItems = [
//     {
//         title: "Profile",
//         href: "/examples/forms",
//     },
//     {
//         title: "Account",
//         href: "/examples/forms/account",
//     },
//     {
//         title: "Appearance",
//         href: "/examples/forms/appearance",
//     },
//     {
//         title: "Notifications",
//         href: "/examples/forms/notifications",
//     },
//     {
//         title: "Display",
//         href: "/examples/forms/display",
//     },
// ];


export default function EditProfile({ setVisible, user, profile, dispatch }) {
    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);

    return (
        <>
            <div className='blur place_detail_information'>
                <div className='container_wrapper' style={{ backgroundColor: 'white' }}>
                    <div className='profile'>
                    </div>
                    <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false); }} /></div>
                    <div className="settings_layout hidden">
                        <div className="settings_header">
                            <h2 className="settings_title">Edit Profile</h2>
                            <p className="settings_description">
                                Keep your profile fresh and personalized! Edit your details below to make sure everything is accurate and up to date.
                            </p>
                        </div>
                        <div className="settings_separator"></div>
                        <div className="settings_container">
                            <EditProfileForm user={user} profile={profile} dispatch={dispatch} setVisible={setVisible} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
