import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import { deletePost, savePost } from "../../functions/post";
import useClickOutside from "../../helpers/clickOutside";
// import { saveAs } from "file-saver";

export default function PostMenu({
  postUserId,
  userId,
  setShowMenu,
  token,
  postId,
  checkSaved,
  setCheckSaved,
  postRef,
  dotRef,
  // sharedPost
}) {
  const [test, setTest] = useState(postUserId === userId ? true : false);
  // Check if the user is the owner of either the repost or the original post (sharedPost)
  // const [test, setTest] = useState(
  //   postUserId === userId || (sharedPost && sharedPost.user._id === userId)
  // );
  
  const menu = useRef(null);
  // useOnClickOutside(menu, () => setShowMenu(false));
  useClickOutside(menu, [dotRef], () => {setShowMenu(false);});
  const saveHandler = async () => {
    savePost(postId, token);
    if (checkSaved) {
      setCheckSaved(false);
      postRef.current.style.display = 'none';
    } else {
      setCheckSaved(true);
    }
  };
//   const downloadImages = async () => {
//     images.map((img) => {
//       saveAs(img.url, "image.jpg");
//     });
//   };
  const deleteHandler = async () => {
    const res = await deletePost(postId, token);
    if (res.status === "ok") {
      postRef.current.remove();
    }
  };
  return (
    <ul className="post_menu" ref={menu}>
      {/* {test && <MenuItem icon="pin_icon" title="Pin Post" />} */}
      <div onClick={() => saveHandler()}>
        {checkSaved ? (
          <MenuItem
            icon="save_icon"
            title="Unsave Post"
            subtitle="Remove this from your saved items."
          />
        ) : (
          <MenuItem
            icon="save_icon"
            title="Save Post"
            subtitle="Add this to your saved items."
          />
        )}
      </div>
      {/* <div className="line"></div> */}
      {/* {test && <MenuItem icon="edit_icon" title="Edit Post" />} */}
      {/* {!test && (
        <MenuItem
          icon="turnOnNotification_icon"
          title="Turn on notifications for this post"
        />
      )} */}
      {/* {imagesLength && (
        <div onClick={() => downloadImages()}>
          <MenuItem icon="download_icon" title="Download" />
        </div>
      )} */}
      {/* {imagesLength && (
        <MenuItem icon="fullscreen_icon" title="Enter Fullscreen" />
      )} */}
      {/* {test && <MenuItem img="../../../icons/lock.png" title="Edit audience" />} */}
      {/* {test && (
        <MenuItem
          icon="turnOffNotifications_icon"
          title="Turn off notifications for this post"
        />
      )} */}
      {/* {test && <MenuItem icon="delete_icon" title="Turn off translations" />} */}
      {/* {test && <MenuItem icon="date_icon" title="Edit Date" />}
      {test && (
        <MenuItem icon="refresh_icon" title="Refresh share attachment" />
      )}
      {test && <MenuItem icon="archive_icon" title="Move to archive" />} */}
      {/* {test && (
        <div onClick={() => deleteHandler()}>
          <MenuItem
            icon="trash_icon"
            title="Move to trash"
            subtitle="items in your trash are deleted after 30 days"
          />
        </div>
      )} */}
      {/* {!test && <div className="line"></div>} */}
      {/* {!test && (
        <MenuItem
          img="../../../icons/report.png"
          title="Report post"
          subtitle="i'm concerned about this post"
        />
      )} */}
    </ul>
  );
}
