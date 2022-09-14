import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import { useDispatch } from "react-redux";
import { likePost, unlikePost } from "../../actions/post.actions";
import Card from "react-bootstrap/Card";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post._id, uid));
    setLiked(true);
  };

  const unlike = () => {
    dispatch(unlikePost(post._id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (post.likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, post.likers, liked]);

  return (
    <>
      {uid && liked === false && (
        <Card.Img
          src="./img/icons/like.svg"
          onClick={like}
          alt="like"
          className="btn btn-icon"
        />
      )}
      {uid && liked && (
        <Card.Img
          src="./img/icons/likefull.svg"
          onClick={unlike}
          alt="unlike"
          className="btn btn-icon"
        />
      )}
      <span>{post.likers.length}</span>
    </>
  );
};

export default LikeButton;
