import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';
import Header from '../../../components/header';
import CustomBreadcrumbs from '../../../components/BreadCrumbs';
import { generateBreadcrumbs } from '../../../functions/generateBreadCrumbs';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilColorBorder, cilBookmark } from '@coreui/icons';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import EditEvent from '../EditEvent/EditEvent';

const EventDetails = ({ user }) => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const location = useLocation();
    const [visitor, setVisitor] = useState(false);
    const [visible, setVisible] = useState(false);

    // Generate breadcrumbs using the reusable function
    const breadcrumbs = generateBreadcrumbs(location, 'Food Event', '/foodEvent', event?.name);
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/event/${id}`); // Include ID in the request URL
                setEvent(response.data);
                setVisitor(response.data.organizer.id !== user._id); // Update visitor state
                // console.log(response.data);
            } catch (error) {
                toast.error("Error fetching event: " + error.message);
            }
        };

        fetchEvent();
    }, [id, user, visible]);

    return (
        <div className="profile place_detail_information">
            <Header />
            <div className="place_details_wrapper">
                {visible && <EditEvent eventId={event?._id} user={user} setVisible={setVisible}/>}
                <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
                <div className="profile_top" style={{ marginTop: '0' }}>
                    <div className="profile_container" style={{ maxWidth: "none" }}>
                        <div className="profile_cover">
                            <img src={event?.image ? event?.image : `${process.env.PUBLIC_URL}/images/no-picture.png`} className="cover" alt="profile_cover"></img>
                        </div>
                        {/* <div className='event_profile_picture_wrapper' style={{ padding: '0 4rem', height: '250px', alignItems: 'flex-start' }}> */}
                        <div className='event_profile_picture_wrapper'>
                            
                            {/* {visible && <EditEventDetails setVisible={setVisible} />} */}
                            <div className='event_profile_picture_left'>
                                <div className='event_profile_col'>
                                    <div className='event_place_profile'>
                                        <span className='place_profile_name'>{event?.name}</span>
                                        <span>
                                            <div className='place-ratings' style={{ color: 'gray', fontWeight: 'normal' }}>
                                                <span className=''>{event?.location?.name}</span>
                                            </div>
                                        </span>
                                        <p style={{ color: '#30BFBF' }}>{new Date(event?.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {event?.time} {event?.endDate && 'to'}
                                            {event?.endDate && new Date(event?.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {event?.endTime && event?.endTime}
                                        </p>
                                        <div className="discover_post_user">
                                            <Link
                                                to={`/profile/${event?.organizer?.username}`}
                                                style={{ color: 'black' }}
                                            >
                                                <div className="discover_post_user_name">
                                                    <Avatar
                                                        alt={event?.organizer.name}
                                                        src={event?.organizer.picture}
                                                        sx={{ width: 18, height: 18 }}
                                                    />
                                                    {event?.organizer.name}
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className='profile_picture_right'
                                style={{ gap: '15px', position: 'relative', top: '130px' }}
                            >
                                {!visitor && <Tooltip title='Edit Event Information'>
                                    <button className="food_event_card_icon_button logo_color_background_hover">
                                        <CIcon icon={cilColorBorder} className='icon_size_20' onClick={()=> setVisible(true)}/>
                                    </button>
                                </Tooltip>}
                                {/* <Tooltip title='Save Event'>
                                    <button className="food_event_card_icon_button">
                                        <span className="material-symbols-outlined"><FavoriteBorderOutlined /></span>
                                    </button>
                                </Tooltip> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_bottom">
                    <div className="profile_container" style={{ maxWidth: "none" }}>
                        <div className="bottom_container" style={{ padding: "10px 4rem" }}>
                            <div style={{ padding: '5px 13px' }}>
                                <p style={{ textTransform: 'uppercase', color: 'gray', fontSize: '0.9rem' }}>Description</p>
                                <p>{event?.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
