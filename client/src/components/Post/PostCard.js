import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dateParser, isEmpty } from "../utils/tools";
import LikeButton from "./LikeButton";
import { updatePost } from "../../actions/post.actions";
import DeleteCard from "./DeleteCard";
import CardComments from "./CardComments";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import CardHeader from "react-bootstrap/CardHeader";
import Spinner from "react-bootstrap/Spinner";

const PostCard = ({ post }) => {
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
    <Card as="li" className="card-thread" key={post._id}>
      {isLoading ? (
        <Spinner animation="border" variant="warning" width="text-center" />
      ) : (
        <>
          <CardHeader className="bg-light">
            <Card.Img
              className="image image--avatar"
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
            <Card.Text as="h5" className="card-pseudo fw-bold">
              {!isEmpty(usersData[0]) &&
                usersData
                  .map((user) => {
                    if (user._id === post.posterId) return user.pseudo;
                    else return null;
                  })
                  .join("")}
              <span className="date fw-light">
                {dateParser(post.createdAt)}
              </span>
            </Card.Text>
            <div className="btn-group">
              {userData._id === post.posterId && userData.role === "user" && (
                <div className="btn_container">
                  <Button
                    className="btn-icon"
                    onClick={() => setIsUpdated(!isUpdated)}
                  >
                    <Card.Img src="./img/icons/edit.svg" alt="edit" />
                  </Button>
                  <DeleteCard id={post._id} />
                </div>
              )}
              {userData.role === "admin" && (
                <div className="btn-container">
                  <Button
                    className="btn-icon"
                    onClick={() => setIsUpdated(!isUpdated)}
                  >
                    <Card.Img src="./img/icons/edit.svg" alt="edit" />
                  </Button>
                  <DeleteCard id={post._id} />
                </div>
              )}
            </div>
          </CardHeader>
          <Card.Body className="card__body">
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
                    <Card.Img src="./img/icons/picture.svg" alt="img" />
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
                  <Button className="btn" onClick={updateItem}>
                    Valider modification
                  </Button>
                </div>
              </div>
            )}
            <figure className="image">
              {post.picture && (
                <Card.Img
                  src={post.picture}
                  alt="card-pic"
                  className="card-pic"
                />
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
                  className="video"
                ></iframe>
              )}
            </figure>
          </Card.Body>
          <Card.Footer className="card-footer">
            <Card.Img
              onClick={() => setShowComments(!showComments)}
              src="./img/icons/message1.svg"
              alt="comment"
              className="btn btn-icon"
            />
            <span>{post.comments.length}</span>
            <LikeButton post={post} />
          </Card.Footer>
          {showComments && <CardComments post={post} />}
        </>
      )}
    </Card>
  );
};

export default PostCard;
