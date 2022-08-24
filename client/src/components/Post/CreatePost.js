import React, { useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { isEmpty } from "../utils/tools";

export default function CreatePost(props) {
  const getPosterId = props.cle;
  const getPosterPseudo = props.pseudo;

  const [addMessage, setAddMessage] = useState("");

  const [file, setFile] = useState();
  const [filename, setFilename] = useState("");
  const [uploadedFile, setUploadedfile] = useState({});
  const [verifFile, setVerifFile] = useState(false);

  const handleAddPost = (e) => {
    e.preventDefault();
    if (filename && verifFile === false) {
      swal({
        title: "Erreur!",
        text: "Veuillez importer votre image!",
        icon: "error",
      });
    } else {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
        data: {
          message: addMessage,
          picture: filename,
          posterId: getPosterId,
          posterPseudo: getPosterPseudo,
        },
      })
        .then(() => {
          swal({
            title: "Ajouté!",
            text: "Votre post a bien été créé!",
            icon: "success",
          }).then(() => {
            window.location = "/";
          });
        })
        .catch((err) => {
          console.log(err);
          swal({
            title: "Attention!",
            text: "Vous n'êtes pas authentifié! Veuillez vous connecter!",
            icon: "error",
          });
          window.location = "/login";
        });
    }
  };

  const handleUploadPicture = async (e) => {
    e.preventDefault();
    setVerifFile(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/posts/file`,
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      const { fileName, filePath } = res.data;
      setUploadedfile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("Problème serveur");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  return (
    <div className="card-body">
      <form className="form-group" onSubmit={handleAddPost}>
        <textarea
          className="form-control"
          name="message"
          rows="5"
          cols="50"
          maxLength="500"
          onChange={(e) => setAddMessage(e.target.value)}
          value={addMessage}
          placeholder="Veuillez saisir votre message"
        ></textarea>

        <input
          type="file"
          id="customFile"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setFilename(e.target.files[0].name);
          }}
          className="btn-active"
        />
        <label htmlFor="customFile">{filename}</label>
        <button
          onClick={handleUploadPicture}
          className="btn btn-primary btn-active text-white "
        >
          Importer
        </button>
        {!isEmpty(uploadedFile) ? (
          <div>
            <img src={uploadedFile.filePath} alt="user_post_pic" />
          </div>
        ) : null}

        <input
          className="btn btn-primary text-white"
          type="submit"
          value="Valider"
        />
      </form>
    </div>
  );
}
