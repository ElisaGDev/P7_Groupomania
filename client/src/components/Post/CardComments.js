import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../utils/tools";
import EditDeleteComment from "./EditDeleteComments";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const CardComments = ({ post }) => {
  const [text, setText] = useState("");
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(addComment(post._id, userData._id, text, userData.pseudo))
        .then(() => dispatch(getPosts()))
        .then(() => setText(""));
    }
  };

  return (
    <div className="comments-container">
      {post.comments.map((comment) => {
        return (
          <Card
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <Card.Header className="bg-secondary">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
                className="img-comment"
              />
              <Card.Text as="h6" className="card-pseudo fw-bold">
                {comment.commenterPseudo}
                <span className="date fw-light">
                  {timestampParser(comment.timestamp)}
                </span>
              </Card.Text>
            </Card.Header>
            <Card.Body className="subpart-comment">
              <div className="update-comment">
                <p className="text-comment">{comment.text}</p>
                <EditDeleteComment comment={comment} postId={post._id} />
              </div>
            </Card.Body>
          </Card>
        );
      })}
      {userData._id && (
        <Form action="" onSubmit={handleComment} className="comment-form">
          <Form.Control
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <Button
            type="submit"
            value="Envoyer"
            className="btn-comment text-white"
          >
            Envoyer
          </Button>
        </Form>
      )}
    </div>
  );
};

export default CardComments;
