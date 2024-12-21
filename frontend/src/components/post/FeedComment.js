import { cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import React, { useState } from 'react'
import PostDetailsInformation from '../../pages/PostDetails/PostInformation';

export default function FeedComment({post, user, setIsFeedCommentVisible }) {
    const [feedComment, setFeedComment] = useState(true);
    return (
        <div className='blur place_detail_information'>
            <div className='container_wrapper' style={{ backgroundColor: 'white', overflowY: 'scroll'  }}>
                <div className='close_button hover_style_2' ><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setIsFeedCommentVisible(false); }} /></div>
                <div style={{marginTop:'30px', padding: '10px 20px'}}>
                <PostDetailsInformation post={post} user={user} feedComment={feedComment} setFeedComment={setFeedComment}/>
                </div>
            </div>
        </div>
    )
}
