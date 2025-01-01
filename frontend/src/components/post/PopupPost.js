// import { cilLockLocked, cilPeople, cilX } from '@coreui/icons';
// import CIcon from '@coreui/icons-react';
// import React, { Fragment, useEffect, useRef, useState } from 'react'
// import PostDetailsInformation from '../../pages/PostDetails/PostInformation';
// import { toggleScroll } from '../../functions/fileUtils';
// import { Box, Typography } from '@mui/material';
// import { Link, useNavigate } from 'react-router-dom';
// import Moment from 'react-moment';
// import { Public } from '../../svg';
// import CreateComment from './CreateComment';

// export default function PopupPost({ post, setPosts, user, setIsFeedCommentVisible, setIsShareVisible, sharesCount, setSharesCount, setSelectedSharePost }) {
//     const [feedComment, setFeedComment] = useState(true);
//     useEffect(() => {
//         toggleScroll(true);
//         return () => toggleScroll(false); // Re-enable scrolling on cleanup
//     }, []);
//     const [showMenu, setShowMenu] = useState();

//     const postRef = useRef(null);
//     const dotRef = useRef(null);

//     const navigate = useNavigate();

//     const handleClick = (postId, i) => {
//         navigate(`/post/${postId}/${i}`);
//     };

//     return (
//         <div className='blur place_detail_information'>
//             <div className='container_wrapper' style={{ backgroundColor: 'white', overflowY: 'scroll' }}>
//                 <div className='close_button hover_style_2' ><CIcon icon={cilX} className="icon_size_22 close_button_icon" onClick={() => { setIsFeedCommentVisible(false); }} /></div>
//                 <div style={{ marginTop: '30px', padding: '10px 20px' }}>
//                     <Box sx={{ flex: 1, padding: '10px 0px', height: '100vh' }} className="postDetailsInformation" ref={postRef}>
//                         <div className="post_header">
//                             <Link
//                                 to={`/profile/${post?.user?.username}`}
//                                 className="post_header_left"
//                             >
//                                 <img src={post?.user?.picture} alt="" />
//                                 <div className="header_col">
//                                     <div className="post_profile_name">
//                                         {post?.user?.name} <span> @{post?.user?.username} </span>
//                                     </div>
//                                     <div className="post_profile_privacy_date">
//                                         <Moment fromNow interval={30}>
//                                             {post?.createdAt}
//                                         </Moment>
//                                         . {post?.privacy === 'public' ? <Public color="#828387" /> : post?.privacy === 'followers' ? <CIcon icon={cilPeople} className="icon_size_12" style={{ marginLeft: '2px' }} /> : <CIcon icon={cilLockLocked} className="icon_size_12" style={{ marginLeft: '2px' }} />}
//                                     </div>
//                                 </div>
//                                 {post?.location && post.location[0]?.name &&
//                                     <span className='post_location'>
//                                         <CIcon icon={cilLocationPin} style={{ color: 'red', position: 'relative', bottom: '1px', marginRight: '2px' }} className="icon_size_16" />
//                                         {post.location[0].name}
//                                     </span>
//                                 }
//                             </Link>
//                             <div
//                                 className="post_header_right hover_style_1"
//                                 onClick={() => setShowMenu((prev) => !prev)}
//                                 ref={dotRef}
//                             >
//                                 <Dots color="#828387" />
//                             </div>
//                         </div>
//                         <Typography variant="body1" sx={{ marginTop: 1, padding: '10px 15px' }}>
//                             {post?.text}
//                         </Typography>
//                         <div className='post_grid_media'>
//                             {!postDetailsPage && post.media && post.media.length > 0 && (
//                                 <div
//                                     className={`
//                             ${post.media.length === 1
//                                             ? "grid_1"
//                                             : post.media.length === 2
//                                                 ? "grid_2"
//                                                 : post.media.length === 3
//                                                     ? "grid_3"
//                                                     : post.media.length === 4
//                                                         ? "grid_4"
//                                                         : post.media.length >= 5 && "grid_5"
//                                         }`}
//                                 >
//                                     {post.media.slice(0, 5).map((mediaItem, i) => (
//                                         <Fragment key={`media-${i}`}>
//                                             <div className="media-item">
//                                                 {mediaItem.type === "image" ? (
//                                                     <img src={mediaItem.url} key={`image-${i}`} alt="" className={`img-${i}`}
//                                                         onClick={() => handleClick(post._id, i)} />
//                                                 ) : mediaItem.type === "video" ? (
//                                                     <video key={`video-${i}`} className={`video-${i}`} style={{ cursor: 'pointer' }} controls onClick={() => handleClick(post.id, i)}>
//                                                         <source src={mediaItem.url} type="video/mp4" />
//                                                         Your browser does not support the video tag.
//                                                     </video>
//                                                 ) : null}
//                                             </div>
//                                         </Fragment>
//                                     ))}

//                                     {post.media.length > 5 && (
//                                         <div className="more-pics-shadow">
//                                             +{post.media.length - 5}
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                         <div className="post_infos">
//                             <div className="reacts_count">
//                                 <div className="reacts_count_imgs">
//                                     <LikeButton
//                                         post={post}
//                                         user={user}
//                                         setLikesCount={setLikesCount} // Pass setLikesCount function
//                                         isLiked={isLiked}
//                                         setIsLiked={setIsLiked}
//                                         dispatch={dispatch}
//                                         setPosts={setPosts}
//                                         fromPage={fromPage}
//                                     />
//                                 </div>
//                                 <div className="reacts_count_imgs">
//                                     <CIcon icon={cilCommentBubble}
//                                         className="icon_size_22 icon_button"
//                                         onClick={() => !feedComment ? onShowFeedComment(post) : handleCommentIconClick()}
//                                     />
//                                 </div>
//                                 <div className="reacts_count_imgs">
//                                     <CIcon icon={cilShare} className="icon_size_22 icon_button" onClick={() => { setIsShareVisible(true); setSelectedSharePost(post) }} />
//                                 </div>
//                             </div>
//                             <div className="to_right">
//                                 <div className="likes_count">{postDetailsPage ? likesCount : post.likes.length || 0} {(post.likes.length || 0) > 1 || likesCount > 1 ? 'likes' : 'like'}</div>
//                                 {/* <div className="comments_count">{commentCount} {commentCount > 1 ? 'comments' : 'comment'}</div> */}
//                                 <div className="comments_count"> {postDetailsPage ? commentCount : post.commentCount || 0} {(post.commentCount || 0) > 1 || commentCount > 1 ? 'comments' : 'comment'}</div>
//                                 <div className="share_count">{postDetailsPage ? sharesCount : post.shares.length || 0} {sharesCount > 1 || post.shares.length > 1 ? 'shares' : 'share'}</div>
//                             </div>
//                         </div>
//                         {!isPost &&
//                             <div className="comments_wrap">
//                                 <div className="comments_order"></div>
//                                 <CreateComment
//                                     user={user}
//                                     postId={post?._id}
//                                     setComments={setComments}
//                                     setCount={setCount}
//                                     setCommentCount={setCommentCount}
//                                     focusInput={focusCommentInput}
//                                     dispatch={dispatch}
//                                     onCommentAdded={handleCommentUpdate}
//                                 />
//                                 <div className='comment_section'>
//                                     <h5 style={{ marginBottom: '20px' }}>Comments</h5>
//                                     {comments && comments.length > 0 ? (
//                                         <>
//                                             {comments
//                                                 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                                                 .slice(0, count)
//                                                 // .slice(0, 5)
//                                                 .map((comment, i) => (
//                                                     <Comment comment={comment} key={i} />
//                                                 ))}

//                                             {/* Show "View more comments" button if there are more comments */}
//                                             {/* {comments.length > 5 && ( */}
//                                             {count < comments.length && (
//                                                 <div className="view_comments" onClick={() => showMore()}>
//                                                     View more comments
//                                                 </div>
//                                             )}
//                                         </>
//                                     ) : (
//                                         // Message when no comments are available
//                                         <div style={{ color: 'gray', fontSize: '0.9rem' }}>No comments yet. Be the first to comment!</div>
//                                     )}
//                                 </div>
//                             </div>
//                         }
//                         {showMenu && (
//                             <PostMenu
//                                 userId={user.id}
//                                 postUserId={post.user._id}
//                                 setShowMenu={setShowMenu}
//                                 postId={post._id}
//                                 token={user.token}
//                                 checkSaved={checkSaved}
//                                 setCheckSaved={setCheckSaved}
//                                 postRef={postRef}
//                                 dotRef={dotRef}
//                             />
//                         )}
//                     </Box>
//                 </div>
//             </div>
//         </div>
//     )
// }
