import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../utils/tools";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";

const Card = ({ post }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [file, setFile] = useState();
  const [showComments, setShowComments] = useState(false);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const updateItem = () => {
    if (textUpdate || file) {
      const data = new FormData();
      data.append("message", textUpdate);
      data.append("file", file);
      dispatch(updatePost(post._id, data));
      setTimeout(function () {
        window.location.reload();
      });
    }
    setIsUpdated(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card" key={post._id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <header className="card__primary-title">
            <figure className="image image--avatar">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.posterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="poster-pic"
              />
            </figure>
            <div className="item item--two-lines">
              <h2 className="text-medium text-bold">
                {!isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === post.posterId) return user.pseudo;
                      else return null;
                    })
                    .join("")}
              </h2>
              <h3 className="text-secondary text-normal text-small">
                {dateParser(post.createdAt)}
              </h3>
            </div>
            <div className="button-group">
              {userData._id === post.posterId && userData.role === "user" && (
                <div className="button-container">
                  <div
                    className="button-item"
                    onClick={() => setIsUpdated(!isUpdated)}
                  >
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard id={post._id} />
                </div>
              )}
              {userData.role === "admin" && (
                <div className="button-container">
                  <div
                    className="button-item"
                    onClick={() => setIsUpdated(!isUpdated)}
                  >
                    <img src="./img/icons/edit.svg" alt="edit" />
                  </div>
                  <DeleteCard id={post._id} />
                </div>
              )}
            </div>
          </header>
          <div className="card__body">
            {isUpdated === false && (
              <div className="card__supporting-text">{post.message}</div>
            )}
            {isUpdated === true && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="icon">
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </>
                </div>
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Valider modification
                  </button>
                </div>
              </div>
            )}
            <figure className="image">
              {post.picture && (
                <img src={post.picture} alt="card-pic" className="card-pic" />
              )}
              {post.video && (
                <iframe
                  width="500"
                  height="300"
                  src={post.video}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={post._id}
                ></iframe>
              )}
            </figure>
          </div>
          <footer className="card__actions">
            <img
              onClick={() => setShowComments(!showComments)}
              src="./img/icons/message1.svg"
              alt="comment"
              className="btn btn--icon"
            />
            <span>{post.comments.length}</span>
            <LikeButton post={post} />
          </footer>
          {showComments && <CardComments post={post} />}
        </>
      )}
    </li>
  );
};

export default Card;
