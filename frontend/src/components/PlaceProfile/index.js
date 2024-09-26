import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './PlaceDetailInformation.css';
import PlaceProfilePictureInfo from './PlaceProfilePictureInfo';
import PlaceProfileMenu from './PlaceProfileMenu';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilCheckAlt, cilX } from '@coreui/icons';
import PlaceProfileOverview from './PlaceProfileOverview';
import PlaceProfileReview from './PlaceProfileReview';
import PlaceProfilePhotos from './PlaceProfilePhotos';
import PlaceProfileRelatedPost from './PlaceProfileRelatedPost';
import PlaceProfileFoodMenu from './PlaceProfileFoodMenu';

export default function PlaceDetails({ setVisible }) {
    const { tab } = useParams();
    const [currentActive, setCurrentActive] = useState(tab || "overview");

    useEffect(() => {
        setCurrentActive(tab);
    }, [tab]);

    return (
        <div className='blur place_detail_information' style={{ backgroundColor: "gray" }}>
            <div className='container_wrapper'>
                <div className='profile'>
                    <div className='close_button hover_style_2'><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setVisible(false); console.log("visible none"); }} /></div>
                    <div className="profile_top" style={{ marginTop: '0' }}>
                        <div className="profile_container" style={{ maxWidth: "none" }}>
                            <div className="profile_cover">
                                <img src={'https://www.creativefabrica.com/wp-content/uploads/2021/05/26/Food-Restaurant-Facebook-Cover-Banner-Graphics-12504719-1.jpg'} className="cover" alt="profile_cover"></img>
                            </div>
                            <PlaceProfilePictureInfo />
                            <PlaceProfileMenu currentActive={currentActive} setCurrentActive={setCurrentActive} />
                        </div>
                    </div>
                    <div className="profile_bottom">
                        <div className="profile_container" style={{ maxWidth: "none" }}>
                            <div className="bottom_container">
                                {currentActive === 'overview' && <PlaceProfileOverview />}
                                {currentActive === 'reviews' && <PlaceProfileReview />}
                                {currentActive === 'photos' && <PlaceProfilePhotos />}
                                {currentActive === 'posts' && <PlaceProfileRelatedPost />}
                                {currentActive === 'menu' && <PlaceProfileFoodMenu />}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
