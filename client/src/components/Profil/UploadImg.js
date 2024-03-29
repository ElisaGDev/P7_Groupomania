import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadPicture } from "../../actions/user.actions";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UploadImg = () => {
  const [file, setFile] = useState();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userReducer);

  const handlePicture = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", userData.pseudo);
    data.append("userId", userData._id);
    data.append("file", file);

    dispatch(uploadPicture(data, userData._id));
  };

  return (
    <Form action="" onSubmit={handlePicture} className="upload-pic">
      <Form.Label htmlFor="file">Changer d'image</Form.Label>
      <Form.Control
        type="file"
        id="file"
        name="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <br />
      <Button type="submit" value="Envoyer" className="text-white">
        Envoyer
      </Button>
    </Form>
  );
};

export default UploadImg;
