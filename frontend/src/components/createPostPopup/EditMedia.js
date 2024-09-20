import React, { useState, useEffect } from 'react'
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilLocationPin, cilX } from '@coreui/icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default function EditMedia({ setPage, setMedias, medias }) {
    const [previewMedia, setPreviewMedia] = useState({ data: medias[0].data, type: medias[0].type });
    const [previewIndex, setPreviewIndex] = useState(0);

    useEffect(() => {
         // Set the preview media based on the previewIndex
         setPreviewMedia({
            data: medias[previewIndex].data,
            type: medias[previewIndex].type
        });
    }, [previewIndex]);

    const handleMediaClick = (data, type) => {
        setPreviewMedia({ data, type });
    };

    const handleDeleteMedia = (index) => {
        console.log("Preview media before deletion:", previewMedia);
        
        setMedias((prevMedias) => {
            const updatedMedias = prevMedias.filter((_, i) => i !== index);
    
            // Check if there are any media items remaining
            if (updatedMedias.length > 0) {
                // If the deleted item is not the last one
                if (index !== updatedMedias.length) {
                    setPreviewIndex(index); // Set preview to the same index
                } else {
                    setPreviewIndex(index - 1); // Set preview to the previous one
                }
            } else {
                // If no media items remain, reset the preview and page
                setPreviewIndex(null); // No media to preview
                setPage(0);
            }
    
            return updatedMedias;
        });
    };
    
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('index', index.toString());
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, newIndex) => {
        e.preventDefault();
        const index = parseInt(e.dataTransfer.getData('index'));
        if (index === newIndex) return;
        const newMedias = [...medias];
        const movedItem = newMedias.splice(index, 1)[0]; // Remove the item from its original position
        newMedias.splice(newIndex, 0, movedItem); // Insert the item at the new position
        setMedias(newMedias);
    };

    return (
        <div style={{ height: "400px" }}>
            <div className="create_post_popup_header" style={{ justifyContent: "center" }}>
                <div><CIcon icon={cilArrowLeft} className="icon_size_22 icon_button exit_icon_left" onClick={() => setPage(0)} /></div>
                <span className="create_post_popup_header_title" style={{ textAlign: "center" }}>Edit Media</span>
            </div>
            <div className='edit_media_wrapper'>
                <div className='media_list'>
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {medias.map((media, index) => {
                            return (
                                <div key={index}>
                                    <ListItem
                                        button
                                        className='media_list_item'
                                        onClick={() => handleMediaClick(media.data, media.type)}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, index)}
                                        onDragOver={(e) => handleDragOver(e)}
                                        onDrop={(e) => handleDrop(e, index)}
                                    >
                                        {media.type.startsWith('image') && <img src={media.data}></img>}
                                        {media.type.startsWith('video') && <video preload="metadata">
                                            <source src={`${media.data}#t=0.1`} type={media.type} />
                                        </video>}
                                        <IconButton size="small" onClick={() => handleDeleteMedia(index)}>
                                            <ClearIcon />
                                        </IconButton>
                                    </ListItem>
                                </div>
                            );
                        })}
                    </List>
                </div>
                <div key={Date.now()} className='media_preview'>
                    {previewMedia.type.startsWith('image') && <img src={previewMedia.data}></img>}
                    {previewMedia.type.startsWith('video') && <video controls>
                        <source src={previewMedia.data} type={previewMedia.type} />
                    </video>}
                </div>
            </div>
        </div>
    )
}
