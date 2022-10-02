import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, editComment } from "../../actions/post.actions";
import { UidContext } from "../AppContext";

const EditDeleteComment = ({ comment, postId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(postId, comment._id, text));
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () => dispatch(deleteComment(postId, comment._id));

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comment.commenterId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comment.commenterId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && userData.role === "user" && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {userData.role === "admin" && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && userData.role === "user" && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <br />
          <textarea
            type="text"
            className="form-control"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn-group-comment">
            <span
              onClick={() => {
                if (
                  window.confirm("Voulez-vous supprimer votre commentaire ?")
                ) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <Button
              type="submit"
              value="Valider modification"
              className="btn-primary text-white"
            >
              Valider modification
            </Button>
          </div>
        </form>
      )}
      {userData.role === "admin" && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <br />
          <textarea
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comment.text}
          />
          <br />
          <div className="btn-group-comment">
            <span
              onClick={() => {
                if (
                  window.confirm("Voulez-vous supprimer votre commentaire ?")
                ) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="delete" />
            </span>
            <Button
              type="submit"
              value="Valider modification"
              className="btn-primary text-white"
            >
              Valider modification
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
