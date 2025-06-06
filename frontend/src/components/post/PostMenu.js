import { useRef, useState } from "react";
import MenuItem from "./MenuItem";
import { deletePost, savePost } from "../../functions/post";
import useClickOutside from "../../helpers/clickOutside";

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
    </ul>
  );
}
