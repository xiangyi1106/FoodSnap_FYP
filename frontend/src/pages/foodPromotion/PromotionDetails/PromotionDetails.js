import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../../../components/header';
import CustomBreadcrumbs from '../../../components/BreadCrumbs';
import { generateBreadcrumbs } from '../../../functions/generateBreadCrumbs';
import { Avatar, Tooltip } from '@mui/material';
import CIcon from '@coreui/icons-react';
import { cilColorBorder} from '@coreui/icons';
import EditPromotion from '../EditPromotion/EditPromotion';
import { convertTo12HourFormat } from '../../../functions/fileUtils';

const PromotionDetails = ({ user }) => {
    const { id } = useParams();
    const [promotion, setPromotion] = useState(null);
    const location = useLocation();
    const [visitor, setVisitor] = useState(false);
    const [visible, setVisible] = useState(false);
    const [validityToEditFoodVenue, setValidityToEditFoodVenue] = useState(false);

    // Generate breadcrumbs using the reusable function
    const breadcrumbs = generateBreadcrumbs(location, 'Food Promotion', '/foodPromotion', promotion?.name);
    useEffect(() => {
        const fetchPromotion = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/promotion/${id}`); // Include ID in the request URL
                setPromotion(response.data);
                setVisitor(response.data.organizer.id !== user._id); // Update visitor state
                if (user.role === 'business' && user.foodVenueOwned === response.data.foodVenue) {
                    setValidityToEditFoodVenue(true);  // Set validity to true if both conditions are met
                }
            } catch (error) {
                toast.error("Error fetching promotion: " + error.message);
            }
        };

        fetchPromotion();
    }, [id, user, visible]);

    return (
        <div className="profile place_detail_information">
            <Header />
            <div className="place_details_wrapper">
                {visible && <EditPromotion promotionId={promotion?._id} user={user} setVisible={setVisible} />}
                <CustomBreadcrumbs breadcrumbs={breadcrumbs} />
                <div className="profile_top" style={{ marginTop: '0' }}>
                    <div className="profile_container" style={{ maxWidth: "none" }}>
                        <div className="profile_cover">
                            <img src={promotion?.image ? promotion?.image : `${process.env.PUBLIC_URL}/images/no-picture.png`} className="cover" alt="profile_cover"></img>
                        </div>
                        <div className='event_profile_picture_wrapper'>
                            <div className='event_profile_picture_left'>
                                <div className='event_profile_col'>
                                    <div className='event_place_profile'>
                                        <span className='place_profile_name'>{promotion?.name}</span>
                                        <span>
                                            <div className='place-ratings' style={{ color: 'gray', fontWeight: 'normal' }}>
                                                <span className=''>{promotion?.location?.name}</span>
                                            </div>
                                        </span>
                                        <p style={{ color: '#30BFBF' }}>{new Date(promotion?.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {convertTo12HourFormat(promotion?.time)} {promotion?.endDate && <span style={{ color: 'black', margin: '0 5px' }}>- </span>}
                                            {promotion?.endDate && new Date(promotion?.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} {promotion?.endTime && convertTo12HourFormat(promotion?.endTime)}
                                        </p>
                                        <div className="discover_post_user">
                                            <Link
                                                to={`/profile/${promotion?.organizer?.username}`}
                                                style={{ color: 'black' }}
                                            >
                                                <div className="discover_post_user_name">
                                                    <Avatar
                                                        alt={promotion?.organizer?.name}
                                                        src={promotion?.organizer?.picture}
                                                        sx={{ width: 18, height: 18 }}
                                                    />
                                                    {promotion?.organizer?.name}
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
                                {validityToEditFoodVenue && <Tooltip title='Edit Promotion Information'>
                                    <button className="food_event_card_icon_button logo_color_background_hover">
                                        <CIcon icon={cilColorBorder} className='icon_size_20' onClick={() => setVisible(true)} />
                                    </button>
                                </Tooltip>}
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_bottom">
                    <div className="profile_container" style={{ maxWidth: "none" }}>
                        <div className="bottom_container" style={{ padding: "10px 4rem" }}>
                            <div style={{ padding: '5px 13px' }}>
                                <p style={{ textTransform: 'uppercase', color: 'gray', fontSize: '0.9rem' }}>Description</p>
                                <p>{promotion?.description}</p>
                            </div>
                            <div style={{ padding: '5px 13px' }}>
                                <p style={{ textTransform: 'uppercase', color: 'gray', fontSize: '0.9rem' }}>Terms and Conditions</p>
                                <p>{promotion?.termsAndConditions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromotionDetails;
