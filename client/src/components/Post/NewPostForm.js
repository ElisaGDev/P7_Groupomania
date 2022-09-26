import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../utils/tools";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [video, setVideo] = useState("");
  const [file, setFile] = useState();
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("posterId", userData._id);
      data.append("message", message);
      if (file) data.append("file", file);
      data.append("video", video);
      setTimeout(function () {
        window.location.reload();
      });

      dispatch(addPost(data));
      dispatch(getPosts());
      cancelPost();
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    setVideo("");
  };

  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);

    const handleVideo = () => {
      let findLink = message.split(" ");
      for (let i = 0; i < findLink.length; i++) {
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          setVideo(embed.split("&")[0]);
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          setPostPicture("");
        }
      }
    };
    handleVideo();
  }, [userData, message, video]);

  return (
    <Container className="postform-container bg-secondary">
      {isLoading ? (
        <Spinner animation="border" variant="warning" width="text-center" />
      ) : (
        <>
          <NavLink to="/profil">
            <div className="user-info">
              <img
                src={userData.picture}
                className="rounded-circle"
                alt="user-img"
                width="50px"
              />
            </div>
          </NavLink>
          <Form>
            <Form.Group className="post-form">
              <Form.Label>Crée un nouveau post !</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                id="message"
                placeholder="Rédiger votre message !"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              />
            </Form.Group>
            {message || postPicture || video.length > 20 ? (
              <Card as="li" className="card-thread">
                <Card.Header className="bg-light">
                  <Card.Img
                    src={userData.picture}
                    alt="user-pic"
                    className="image image--avatar"
                  />
                  <Card.Text as="h5" className="card-pseudo fw-bold">
                    <span>{userData.pseudo}</span>
                    <span className="date fw-light">
                      {timestampParser(Date.now())}
                    </span>
                  </Card.Text>
                </Card.Header>
                <Card.Body className="card__body">
                  <Card.Text className="card__supporting-text">
                    {message}
                  </Card.Text>
                  <Card.Img src={postPicture} alt="" width="50%" />
                  {video && (
                    <iframe
                      src={video}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video}
                    ></iframe>
                  )}
                </Card.Body>
              </Card>
            ) : null}
            <Card.Footer className="footer-form">
              <Form.Group className="form-control .has-feedback">
                {isEmpty(video) && (
                  <>
                    <Card.Img
                      src="./img/icons/picture.svg"
                      alt="img"
                      className="form-control-feedback img-postform"
                    />
                    <Form.Control
                      type="file"
                      id="file-upload"
                      name="file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => handlePicture(e)}
                      className="form-control"
                    />
                  </>
                )}
                {video && (
                  <Button className="text-white" onClick={() => setVideo("")}>
                    Supprimer la video
                  </Button>
                )}
              </Form.Group>
              <InputGroup className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <Button className="cancel text-white" onClick={cancelPost}>
                    Annuler message
                  </Button>
                ) : null}
                <Button className="send text-white" onClick={handlePost}>
                  Envoyer
                </Button>
              </InputGroup>
            </Card.Footer>
          </Form>
        </>
      )}
    </Container>
  );
};

export default NewPostForm;
