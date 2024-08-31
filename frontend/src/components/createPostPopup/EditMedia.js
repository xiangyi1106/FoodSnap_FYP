import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CIcon from '@coreui/icons-react';
import { cilArrowLeft, cilLocationPin, cilX } from '@coreui/icons';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
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
        setMedias((prevMedias) => prevMedias.filter((_, i) => i !== index));
        // Check if there are any media items remaining
        if (medias.length > 0) {
            // Set the index of the media to be previewed
            // let previewIndex;
            // If the deleted item is not the last one
            if (index !== medias.length - 1) {
                // previewIndex = index;
                setPreviewIndex(index);
            } else {
                // If the deleted item is the last one, set the preview to the previous one
                // previewIndex = index - 1;
                setPreviewIndex(index-1);
            }
            console.log("Preview media after deletion:", previewMedia);
        } else {
            // If there are no more media items, set the preview media to a default image
            setPreviewMedia({
                data: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
                type: "image/jpg"
            });
        }

        // // Check if there are any media items
        // if (medias.length > 0) {
        //     // If the clicked item is not the first one
        //     if (index !== 0) {
        //         // Set the previous index
        //         const previousIndex = index - 1;
        //         // Set the preview media to the previous item
        //         setPreviewMedia({
        //             data: medias[previousIndex].data,
        //             type: medias[previousIndex].type
        //         });
        //         console.log(previousIndex);
        //     } else {
        //         // If the clicked item is the first one
        //         // Check if there are still media items remaining after deletion
        //         if (index + 1 < medias.length) {
        //             // If yes, set the preview media to the next available item
        //             setPreviewMedia({
        //                 data: medias[index + 1].data,
        //                 type: medias[index + 1].type
        //             });
        //             console.log('2');

        //         } else {
        //             // If not, set the preview media to the first item in the array
        //             setPreviewMedia({
        //                 data: "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg",
        //                 type: "image/jpg"
        //             });
        //             console.log('3');

        //         }
        //     }
        // }
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
                                    {/* <div className='list_index'>{index}</div> */}
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
