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
            {<ImageList variant="masonry" cols={3} gap={8} style={{ width: '500px' }}>
                {photos?.resources && photos?.resources.map((img) => (
                    <PhotoView src={img.secure_url}>
                        <ImageListItem key={img.public_id} style={{cursor: 'pointer', padding: '0px 8spx'}}>
                            <img
                                srcSet={`${img.secure_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                src={`${img.secure_url}?w=248&fit=crop&auto=format`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    </PhotoView>
                ))}
                {/* {photos?.resources && photos.resources.map((img) => (
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
                ))} */}
            </ImageList>}
        </PhotoProvider>

    </div>
    )
}
export default ProfilePhotoGallery;
