import React, { useEffect, useRef, useState } from 'react'
import Post from "../post";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch } from 'react-redux';
import FeedComment from './FeedComment';

// export default function Feed({ posts, user }) {
export default function Feed({ posts, user, fetchMorePosts, hasMore }) {

    const middle = useRef(null);
    const [height, setHeight] = useState();

    useEffect(() => {
        if (middle.current) {
            setHeight(middle.current.clientHeight);
        }
    }, [posts]);

    const [isFeedCommentVisible, setIsFeedCommentVisible] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const handleShowFeedComment = (post) => {
        setSelectedPost(post);
        setIsFeedCommentVisible(true);
    };

    // Close FeedComment overlay
    const handleCloseFeedComment = () => {
        setIsFeedCommentVisible(false);
        setSelectedPost(null);
    };

    return (
        <div className='feed_middle' style={{ height: `${height + 80}px` }}>
            {isFeedCommentVisible && selectedPost && <FeedComment post={selectedPost} user={user} setIsFeedCommentVisible={setIsFeedCommentVisible} />}
            <div className="home_middle" ref={middle}>
                <div className="posts">
                    {/* {posts.map((post) => (
                        <Post key={post._id} post={post} user={user} />
                    ))} */}
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={() => {
                            fetchMorePosts(); // Trigger fetching more posts on scroll
                        }}
                        hasMore={hasMore} // Keep fetching until no more posts are available
                        loader={<h4 style={{ textAlign: 'center', color: 'gray' }}>Loading...</h4>}
                        endMessage={<p style={{ textAlign: 'center', color: 'gray' }}>No more posts available</p>}
                    >
                        {posts.map((post) => (
                            <Post key={post._id} post={post} user={user} onShowFeedComment={handleShowFeedComment}/>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    )
}
