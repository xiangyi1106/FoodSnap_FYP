import React, { useState } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { cilZoomIn, cilZoomOut } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const ProfilePhotoGallery = ({ photos }) => {
    return (<div>
        <PhotoProvider
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
            {photos?.resources && photos.resources.length > 0 ? (
                <ImageList variant="masonry" cols={3} gap={8}>
                    {photos.resources.map((img) => (
                        <PhotoView src={img.secure_url} key={img.public_id}>
                            <ImageListItem key={img.public_id} style={{ cursor: 'pointer' }}>
                                <img
                                    srcSet={`${img.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                    src={`${img.secure_url}?w=248&fit=crop&auto=format`}
                                    loading="lazy"
                                    alt=""
                                />
                            </ImageListItem>
                        </PhotoView>
                    ))}
                </ImageList>
            ) : (
                <div style={{ textAlign: 'center' }}>
                    <img src={`${process.env.PUBLIC_URL}/images/no-image.png`} className="" alt="profile_cover"></img>
                    <div style={{ color: 'gray', fontSize: '0.9rem', marginTop: '3px' }}>Sorry, there are currently no photos available.</div>
                </div>
            )}
        </PhotoProvider>

    </div>
    )
}
export default ProfilePhotoGallery;
