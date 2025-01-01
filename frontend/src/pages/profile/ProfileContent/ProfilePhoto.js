import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useOutletContext } from 'react-router-dom';
import 'react-photo-view/dist/react-photo-view.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProfilePhotoGallery from './ProfilePhotoGallery';
import { HashLoader } from "react-spinners";


export default function ProfilePhoto() {
    const { photos, loading } = useOutletContext(); // Fetch the user profile data from context
    return (
        <div className='profile_card'>
            <div className='profile_card_header'>
                All Photos
            </div>
            {loading ?
                <>
                    <div className="skelton_loader">
                        <HashLoader color="#30BFBF" />
                    </div>
                </> :
                <ProfilePhotoGallery photos={photos} />
            }
        </div>
    )
}
