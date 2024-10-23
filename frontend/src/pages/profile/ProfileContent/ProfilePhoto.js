import React from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useOutletContext } from 'react-router-dom';
import 'react-photo-view/dist/react-photo-view.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CIcon from '@coreui/icons-react';
import {
    cilZoomIn, cilZoomOut
} from '@coreui/icons';
import { ImageList, ImageListItem } from '@mui/material';
import ProfilePhotoGallery from './ProfilePhotoGallery';

export default function ProfilePhoto() {
    const { photos } = useOutletContext(); // Fetch the user profile data from context
    return (
        <div className='profile_card'>
            <div className='profile_card_header'>
                All Photos
            </div>
            {/* <div className='profile_card_count'> */}
            {/* {photos.total_count === 0 ? "" : photos.total_count === 1 ? "1 Photo" : `${photos.total_count} photos`} */}
            {/* </div> */}
            {/* <div className='profile_card_grid'> */}
            {/* <PhotoProvider
                toolbarRender={({ onScale, scale }) => {
                    return (
                        <div style={{ display: 'flex', gap: '10px', color: '#fff' }}>
                            <button
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                }}
                                onClick={() => onScale(scale + 1)}
                            >
                                <CIcon icon={cilZoomIn} className="icon_size_20" />

                            </button>
                            <button
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 12px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                }}
                                onClick={() => onScale(scale - 1)}
                            >
                                <CIcon icon={cilZoomOut} className="icon_size_20" />
                            </button>
                        </div>
                    );
                }}
            >
                {photos?.resources && photos.resources.map((img) => (
                        <div className="profile_photo_card" key={img.public_id}>
                            <PhotoView src={img.secure_url}>
                                <img
                                    src={img.secure_url}
                                    alt=""
                                    className="photo-thumbnail"
                                    style={{ cursor: 'pointer', width: '100%', height: 'auto' }}
                                />
                            </PhotoView>
                        </div>
                    ))}
                {photos?.resources && <ImageList variant="masonry" cols={3} gap={8} style={{ width: '500px' }}>
                    {photos?.resources.map((img) => (
                        <PhotoView src={img.secure_url}>
                            <ImageListItem key={img.public_id}>

                                <img
                                    srcSet={`${img.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${img.secure_url}?w=248&fit=crop&auto=format`}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        </PhotoView>
                    ))}
                </ImageList>}
            </PhotoProvider> */}
            <ProfilePhotoGallery photos={photos}/>
            {/* </div> */}
            {photos.total_count === 0 ?
                <div style={{ textAlign: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/no-image.png`} className="" alt="profile_cover"></img>
                    <div style={{ color: 'gray', fontSize: '0.9rem', marginTop: '3px' }}>Sorry, there are currently no photos available.</div>
                </div>
                : ""}
        </div>
    )
}
