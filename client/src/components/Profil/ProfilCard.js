import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import Stack from "react-bootstrap/Stack";

export default function ProfilCard() {
  const userData = useSelector((state) => state.userReducer);

  return (
    <Card className="text-center">
      <Card.Img
        src="https://www.angelxp.eu/image/Twitter/art/noir06.jpg"
        alt="background img"
        height="60"
      />
      <Card.ImgOverlay>
        <Card.Img
          src={userData.picture}
          className="rounded-circle center avatar-profil"
        />
      </Card.ImgOverlay>
      <Card.Body className="mt-4 text-center">
        <Card.Title className="mb-3">{userData.pseudo}</Card.Title>
        <NavLink to="/profil">
          <Button type="button" className="text-white">
            Editer le profil
          </Button>
        </NavLink>
        <Card className="follow d-flex justify-content-center mt-4">
          <Stack direction="horizontal" gap={2}>
            <div className="bg-light">
              <h6 className="fw-bold">Abonnés</h6>
              <span>{userData.followers ? userData.followers.length : ""}</span>
            </div>
            <div className="bg-light">
              <h6 className="fw-bold">Abonnements</h6>
              <span>{userData.following ? userData.following.length : ""}</span>
            </div>
          </Stack>
        </Card>
      </Card.Body>
    </Card>
  );
}
