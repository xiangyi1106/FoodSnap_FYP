import Moment from "react-moment";

export default function Comment({ comment }) {
    return (
        <div className="comment">
            <img src={comment.userId.picture} alt="" className="comment_img" />
            <div className="comment_col">
                <div className="comment_name">
                    {comment.userId.name}
                </div>
                <div className="comment_wrap">
                    <div className="comment_text">{comment.content}</div>
                </div>
                {comment.image && (
                    <img src={comment.image} alt="" className="comment_image" />
                )}
                <div className="comment_actions">
                    <span>Like</span>
                    <span>Reply</span>
                    <span>
                        <Moment fromNow interval={30}>
                            {comment.commentAt}
                        </Moment>
                    </span>
                </div>
            </div>
        </div>
    );
}
