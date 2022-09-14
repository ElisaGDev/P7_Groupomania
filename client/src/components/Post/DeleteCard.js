import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const DeleteCard = (props) => {
  const dispatch = useDispatch();

  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <Button
      className="btn-icon"
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer votre publication ?")) {
          deleteQuote();
        }
      }}
    >
      <Card.Img src="./img/icons/trash.svg" alt="trash" />
    </Button>
  );
};

export default DeleteCard;
