import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';

export default function PostLoading() {
    return (
        <div className="post_loading">
            <div className="post_loading_wrapper">
                <CircularProgress className='logo_color_text' />
            </div>
        </div>
    )
}
