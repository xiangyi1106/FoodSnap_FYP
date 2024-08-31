import React, { useRef } from 'react'

export default function ImagePreview({ images, setImages }) {
    const imageInputRef = useRef(null);
    const handleImages = (e) => {
        let files = Array.from(e.target.files);
        files.forEach((img) => {
            const reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = (readerEvent) => {
                setImages((images) => [...images, readerEvent.target.result]);
            }
        });
    };

    return (
        <div className='add_picture_wrapper'>
            <input type='file' multiple hidden ref={imageInputRef} onChange={handleImages} accept="image/*,video/*"></input>
            {images && images.length ? (
                <div className='add_picture p0'>
                    <div className='preview_actions'>
                        <button className=''>
                            <i className='edit_icon'></i>
                            Edit
                        </button>
                        <button className='' onClick={() => imageInputRef.current.click()}>
                            <i className='addPhoto_icon'></i>
                            Add Photos/Videos
                        </button>
                    </div>
                    <i className='exit_icon' onClick={()=>setImages([])}></i>
                    <div className={
                        images.length === 1 ? 'preview1': 
                        images.length === 2 ? 'preview2':
                        images.length === 3 ? 'preview3':
                        images.length === 4 ? 'preview4':
                        images.length === 5 ? 'preview5':
                        images.length % 2 === 0 ? 'preview6' :
                         'preview6 singular_grid'}>
                        {images.map((image, i) => (
                            <img key={i} src={image} alt="post_img_upload" />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='add_picture'>
                    {/* <i className='exit_icon'></i> */}
                    <div className='add_col' onClick={() => imageInputRef.current.click()}>
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
