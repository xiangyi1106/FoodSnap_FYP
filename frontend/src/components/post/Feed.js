import React, { useEffect, useRef, useState } from 'react'
import Post from "../post";
export default function Feed({ posts, user }) {

    const middle = useRef(null);
    const [height, setHeight] = useState();

    useEffect(() => {
        if (middle.current) {
            setHeight(middle.current.clientHeight);
        }
    }, [posts]);
    return (
        <div className='feed_middle' style={{ height: `${height + 80}px` }}>
            <div className="home_middle" ref={middle}>
                <div className="posts">
                    {posts.map((post) => (
                        <Post key={post._id} post={post} user={user} />
                    ))}
                </div>
            </div>
        </div>
    )
}
