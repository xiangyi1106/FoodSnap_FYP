import React, { useRef } from 'react'
import CIcon from '@coreui/icons-react';
import { cilX } from '@coreui/icons';
import { useDropzone } from 'react-dropzone';

export default function MediaPreview({ medias, setMedias, setPage, setError }) {
    const { getRootProps, getInputProps, open } = useDropzone({
        noDrag: true,
        noClick: true,
        accept: {
            'image/*': [],
            'video/*': []
        },
        onDrop: acceptedFiles => {
            acceptedFiles.forEach((file) => {
                if (
                    
                    // !file.type.startsWith("image/") &&
                    // !file.type.startsWith("video/")
                    !['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4'].includes(file.type)
                ) {
                    setError(
                        `Unsupported file type. Only Jpeg, Png, Webp, Gif, mp4 are allowed.`
                        // `Unsupported file type. Only images and videos files are allowed.`
                    );
                    acceptedFiles = acceptedFiles.filter((item) => item.name !== file.name);
                    return;
                }
                const reader = new FileReader()
                reader.readAsDataURL(file);
                reader.onload = (readerEvent) => {
                    setMedias((prevMedias) => [...prevMedias, { data: readerEvent.target.result, type: file.type }]);
                }
            })
        }
    });

    const mediainputref = useRef(null);
    const handleMedias = (e) => {
        console.log("Handling medias...");
        let files = Array.from(e.target.files);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (readerEvent) => {
                //setMedias((medias) => [...medias, { data: readerEvent.target.result, type: file.type }]);
                // Add each media item at the end of the array
                setMedias((prevMedias) => [...prevMedias, { data: readerEvent.target.result, type: file.type }]);
            }
            reader.onerror = (error) => {
                console.error('Error reading file:', error);
            };
        });
    };

    const isImageFile = (type) => type.startsWith('image');
    const isVideoFile = (type) => type.startsWith('video');

    const handleDeleteMedia = (index) => {
        setMedias((prevMedias) => prevMedias.filter((_, i) => i !== index));
    };

    return (
        <div className='add_picture_wrapper' {...getRootProps()}>
            <input type='file' multiple hidden onChange={handleMedias} ref={mediainputref} accept="image/*,video/*" {...getInputProps({ refKey: 'mediainputref' })}></input>
            {medias && medias.length ? (
                <div className='add_picture p0'>
                    <div className='preview_actions' style={{ zIndex: "99" }}>
                        <button className='' onClick={open}>
                            <i className='addPhoto_icon'></i>
                            Add Photo/Video
                        </button>
                        <button className='' onClick={() => setPage(3)}>
                            <i className='edit_icon'></i>
                            Edit
                        </button>
                        <button className='' onClick={() => setMedias([])} style={{ zIndex: "99" }}>
                            <CIcon icon={cilX} className="icon_size_18" />
                            {/* <i className='exit_icon'></i> */}
                            Clear
                        </button>
                    </div>
                    {/* <i className='exit_icon' onClick={() => setMedias([])} style={{ zIndex: "99" }}></i> */}
                    {/* <div className={
                        medias.length === 1 ? 'preview1' :
                            medias.length === 2 ? 'preview2' :
                                medias.length === 3 ? 'preview3' :
                                    medias.length === 4 ? 'preview4' :
                                        medias.length === 5 ? 'preview5' :
                                            medias.length % 2 === 0 ? 'preview6' :
                                                'preview6 singular_grid'}>
                        {medias.map((media, i) => (
                            isImageFile(media.type) ? (
                                // Handle image upload
                                <img key={i} src={media.data} alt="post_img_upload" />
                            ) : (
                                isVideoFile(media.type) ? (
                                    // Handle video upload
                                    <video key={i} controls preload="metadata">
                                        <source src={`${media.data}#t=0.1`} type={media.type} />
                                    </video>
                                ) : null
                            )
                        ))}
         
                    </div> */}
                    <div className={
                        `${medias.length === 1 ? 'preview1' :
                            medias.length === 2 ? 'preview2' :
                                medias.length === 3 ? 'preview3' :
                                    medias.length === 4 ? 'preview4' :
                                        medias.length === 5 ? 'preview5' :
                                            medias.length % 2 === 0 ? 'preview6' :
                                                'preview6 singular_grid'
                        }`
                    }>
                        {medias.map((media, i) => (
                            <div key={i} className="media_container">
                                <div className="media_item">
                                    {isImageFile(media.type) ? (
                                        // Handle image upload
                                        <img src={media.data} alt="post_img_upload" />
                                    ) : (
                                        isVideoFile(media.type) ? (
                                            // Handle video upload
                                            <video controls preload="metadata">
                                                <source src={`${media.data}#t=0.1`} type={media.type} />
                                            </video>
                                        ) : null
                                    )}
                                </div>
                                <button className="clear_button" onClick={() => handleDeleteMedia(i)}><CIcon icon={cilX} className="icon_size_18" /> </button>
                            </div>
                        ))}
                    </div>

                </div>
            ) : (
                // <div className='add_picture' onClick={() => mediainputref.current.click()}>
                <div className='add_picture' onClick={open}>
                    <div className='add_col'>
                        <div className='add_circle'>
                            <i className='addPhoto_icon'></i>
                        </div>
                        <span>Add Photos/Videos</span>
                        <span>or drag and drop</span>
                    </div>
                </div>
            )}
        </div>
    )
}
