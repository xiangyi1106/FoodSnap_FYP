import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { Fragment, useState } from "react";
import { Dots, Friends, Public } from "../../svg";
import Moment from "react-moment";
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilShare, cilThumbUp, cilCommentBubble, cilBookmark, cilPeople, cilLockLocked } from '@coreui/icons';
import CreateComment from "./CreateComment";

export default function Post({ post, user, profile }) {
    const [visible, setVisible] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const navigate = useNavigate();

    const handleClick = (postId, i) => {
        navigate(`/post/${postId}/${i}`);
    };
    return (
        <div className={`post`} style={{ width: `${profile && "100%"}`,}}>
            <div className="post_header">
                <Link
                    to={`/profile/${post.user.username}`}
                    className="post_header_left"
                >
                    <img src={post.user.picture} alt="" />
                    <div className="header_col">
                        <div className="post_profile_name">
                            {post.user.name} <span> @{post.user.username} </span>
                            <div className="updated_p">
                                {post.type === "profilePicture" &&
                                    `updated ${post.user.gender === "custom"
                                        ? "the"
                                        : post.user.gender === "male"
                                            ? "his"
                                            : "her"
                                    } profile picture`}
                                {post.type === "cover" &&
                                    `updated ${post.user.gender === "custom"
                                        ? "the"
                                        : post.user.gender === "male"
                                            ? "his"
                                            : "her"
                                    } cover picture`}
                                {post.type === "shared" &&
                                    `Repost`}
                            </div>
                        </div>
                        <div className="post_profile_privacy_date">
                            <Moment fromNow interval={30}>
                                {post.createdAt}
                            </Moment>
                            . {post.privacy === 'public' ? <Public color="#828387" /> : post.privacy === 'followers' ? <CIcon icon={cilPeople} className="icon_size_12" style={{ marginLeft: '2px' }} /> : <CIcon icon={cilLockLocked} className="icon_size_12" style={{ marginLeft: '2px' }} />}
                        </div>
                    </div>
                </Link>
                <div
                    className="post_header_right hover_style_1"
                    onClick={() => setShowMenu((prev) => !prev)}
                >
                    <Dots color="#828387" />
                </div>
            </div>
            <>
                <div className="post_text"><p>{post.text}</p></div>

                {/* Render shared post if exists */}
                {post.sharedPost && (
                    <div className="shared_post">
                        <Post post={post.sharedPost} user={post.sharedPost.user} />
                    </div>
                )}
                {post.media && post.media.length > 0 && (
                    <div
                        className={
                            post.media.length === 1
                                ? "grid_1"
                                : post.media.length === 2
                                    ? "grid_2"
                                    : post.media.length === 3
                                        ? "grid_3"
                                        : post.media.length === 4
                                            ? "grid_4"
                                            : post.media.length >= 5 && "grid_5"
                        }
                    >
                        {post.media.slice(0, 5).map((mediaItem, i) => (
                            <Fragment key={`media-${i}`}>
                                {mediaItem.type === "image" ? (
                                    <img src={mediaItem.url} key={`image-${i}`} alt="" className={`img-${i}`} onClick={() => handleClick(post._id, i)} />
                                ) : mediaItem.type === "video" ? (
                                    <video key={`video-${i}`} className={`video-${i}`} controls onClick={() => handleClick(post.id, i)}>
                                        <source src={mediaItem.url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : null}
                            </Fragment>
                        ))}

                        {post.media.length > 5 && (
                            <div className="more-pics-shadow">
                                +{post.media.length - 5}
                            </div>
                        )}
                    </div>
                )}
                {/* {post.media && post.media.length > 0 && (
                    <div
                        className={
                            post.media.length === 1
                                ? "grid_1"
                                : post.media.length === 2
                                    ? "grid_2"
                                    : post.media.length === 3
                                        ? "grid_3"
                                        : post.media.length === 4
                                            ? "grid_4"
                                            : post.media.length >= 5 && "grid_5"
                        }
                    > */}
                {/* {post.media.slice(0, 5).map((m, i) => (
                            m.type === "image" ? (
                                <img src={m.url} key={i} alt="" className={`img-${i}`} />
                            ) : <video controls >
                                <source src={m.url} />
                            </video> // Handle other media types if necessary
                        ))} */}
                {/* {post.media.slice(0, 5).map((m, i) => renderMedia(m, i))} */}
                {/* {post.media.slice(0, 5).map((mediaArray, index) => (
                            <Fragment key={`media-${index}`}>
                                {renderMedia(mediaArray)}
                            </Fragment>
                        ))} */}
                {/* {post.media.slice(0, 5).map((mArray, i) => (
                            <Fragment key={`media-${i}`}>
                                {Array.isArray(mArray) && mArray.length > 0 ? (
                                    mArray.map((m, innerIndex) => (
                                        <Fragment key={`inner-media-${innerIndex}`}>
                                            {m.type === "image" ? (
                                                <img src={m.url} key={`image-${innerIndex}`} alt="" className={`img-${i}`} />
                                            ) : m.type === "video" ? (
                                                <video key={`video-${innerIndex}`} className={`img-${i}`} controls>
                                                    <source src={m.url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : null}
                                        </Fragment>
                                    ))
                                ) : mArray && mArray.type ? (
                                    mArray.type === "image" ? (
                                        <img src={mArray.url} key={`image-${i}`} alt="" className={`img-${i}`} />
                                    ) : mArray.type === "video" ? (
                                        <video key={`video-${i}`} className={`video-${i}`} controls>
                                            <source src={mArray.url} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : null
                                ) : null}
                            </Fragment>
                        ))}


                        {post.media.length > 5 && (
                            <div className="more-pics-shadow">
                                +{post.media.length - 5}
                            </div>
                        )} */}

                {/* <CCarousel controls indicators dark interval={null} className="carousel">
                            {post.media.map((innerArray, index) => (
                                <CCarouselItem key={`carousel-${index}`}>
                                    {innerArray.map((media, innerIndex) => (
                                        <div key={`media-${innerIndex}`} className="carousel_size">
                                            {media.type === 'image' ? (
                                                <img className="d-block w-100" src={media.url} alt={`slide ${innerIndex}`} />
                                            ) : media.type === 'video' ? (
                                                <video className="d-block w-100" controls>
                                                    <source src={media.url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            ) : null}
                                        </div>
                                    ))}
                                </CCarouselItem>
                            ))}
                        </CCarousel> */}
                {/* </div>
                )} */}
            </>
            {post.type !== 'shared' && (<>
                <div className="post_infos">
                    <div className="reacts_count">
                        <div className="reacts_count_imgs">
                            <CIcon icon={cilThumbUp} className="icon_size_22 icon_button" />
                        </div>
                        <div className="reacts_count_imgs">
                            <CIcon icon={cilCommentBubble} className="icon_size_22 icon_button" />
                        </div>
                        <div className="reacts_count_imgs">
                            <CIcon icon={cilShare} className="icon_size_22 icon_button" />
                        </div>
                        {/* <div className="reacts_count_imgs">
                            <CIcon icon={cilBookmark} className="icon_size_22 icon_button" />
                        </div> */}
                        {/* <div className="reacts_count_num">Like</div> */}
                    </div>
                    <div className="to_right">
                        <div className="comments_count">13 likes</div>
                        <div className="comments_count">13 comments</div>
                        <div className="share_count">1 share</div>
                    </div>
                </div>
                <div className="comments_wrap">
                    <div className="comments_order"></div>
                    <CreateComment user={user} />
                </div>
            </>
            )}

        </div>
    )
}
