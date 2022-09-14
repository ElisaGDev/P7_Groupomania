import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
import { dateParser } from "../utils/tools";
import Following from "./Following";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UpdateProfil = () => {
  const [bio, setBio] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateBio(userData._id, bio));
    setUpdateForm(false);
  };

  return (
    <Container className="profil-container mt-7 shadow">
      <Card>
        <h1 className="profil-title text-center">
          {" "}
          Profil de {userData.pseudo}
        </h1>
        <Card.Header className="profil-header">
          <Card.Img
            src={userData.picture}
            alt="user-pic"
            className="img-profil rounded-circle"
          />
          <h3 className="profil-subtitle">Photo de profil</h3>
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </Card.Header>
        <Card.Body className="text-center">
          <h3>Bio</h3>
          {updateForm === false && (
            <>
              <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
              <Button
                onClick={() => setUpdateForm(!updateForm)}
                className="text-white mb-3"
              >
                Modifier bio
              </Button>
            </>
          )}
          {updateForm && (
            <>
              <Form.Control
                as="textarea"
                defaultValue={userData.bio}
                placeholder="Rédiger votre bio !"
                onChange={(e) => setBio(e.target.value)}
                className="mb-4"
              />
              <Button onClick={handleUpdate} className="text-white mb-4">
                Valider modifications
              </Button>
            </>
          )}
          <h6 className="mb-4">
            Membre depuis le : {dateParser(userData.createdAt)}
          </h6>
          <Following />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UpdateProfil;
