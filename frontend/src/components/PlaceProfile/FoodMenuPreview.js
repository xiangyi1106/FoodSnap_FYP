import { cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useEffect } from 'react'
import { toggleScroll } from '../../functions/fileUtils';
import { CircularProgress } from '@mui/material';

export default function FoodMenuPreview({ setIsMenuPreviewOpen, medias, setMedias, mediainputref, menuSubmit, isLoading }) {
    const handleDeleteMedia = (index) => {
        setMedias((prevMedias) => prevMedias.filter((_, i) => i !== index));
    };

    useEffect(() => {
        toggleScroll(true);
        return () => toggleScroll(false); // Re-enable scrolling on cleanup
    }, []);
    return (
        <div className="blur place_detail_information" style={{ backgroundColor: "gray" }}>
            <div className="container_wrapper" style={{ backgroundColor: "#fff", width: '50vw', display: 'flex', flexDirection: 'column' }}>
                <div className="profile" >
                    <div className="close_button hover_style_2" >
                        <CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setIsMenuPreviewOpen(false); }} />
                    </div>
                    <div className="edit_place_info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between' }}>
                        <button className="green_btn" style={{ margin: '30px 0' }} onClick={() => mediainputref.current.click()} disabled={isLoading}>Add Photo</button>
                        {medias && medias.length > 0 &&
                            <div className="preview6">
                                {medias.map((media, i) => (
                                    <div key={i} className="media_container">
                                        <div className="media_item">
                                            <img src={media} alt="post_img_upload" />
                                        </div>
                                        <button className="clear_button" onClick={() => handleDeleteMedia(i)} disabled={isLoading}><CIcon icon={cilX} className="icon_size_18" /> </button>
                                    </div>
                                ))}
                            </div>
                        }
                        <div style={{ marginTop: 'auto' }}>
                            <button className="green_btn" style={{ margin: '30px 0', position: 'relative', bottom: '0' }} onClick={menuSubmit}>{!isLoading ? "Upload Menu" : <CircularProgress size={30} sx={{ color: 'white' }} />}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
