import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import FollowHandler from "./FollowHandler";

function Following() {
  const [showFollowing, setShowFollowing] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);

  const followingClose = () => setShowFollowing(false);
  const followingOpen = () => setShowFollowing(true);
  const followersClose = () => setShowFollowers(false);
  const followersOpen = () => setShowFollowers(true);

  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  return (
    <>
      <Button variant="tertary" onClick={followingOpen} className="text-white">
        Abonnements : {userData.following ? userData.following.length : ""}
      </Button>
      <Button
        variant="tertary"
        onClick={followersOpen}
        className="text-white ms-3"
      >
        Abonnés : {userData.followers ? userData.followers.length : ""}
      </Button>

      {showFollowing && (
        <Modal show={showFollowing} onHide={followingClose}>
          <Modal.Header closeButton>
            <Modal.Title>Abonnements</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.following.length; i++) {
                  if (user._id === userData.following[i]) {
                    return (
                      <li key={user._id} className="mb-3 text-center">
                        <img
                          className="img-modal"
                          src={user.picture}
                          alt="user-pic"
                        />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={followingClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {showFollowers && (
        <Modal show={showFollowers} onHide={followersClose}>
          <Modal.Header closeButton>
            <Modal.Title>Abonnements</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ul>
              {usersData.map((user) => {
                for (let i = 0; i < userData.followers.length; i++) {
                  if (user._id === userData.followers[i]) {
                    return (
                      <li key={user._id} className="mb-3 text-center">
                        <img
                          className="img-modal"
                          src={user.picture}
                          alt="user-pic"
                        />
                        <h4>{user.pseudo}</h4>
                        <div className="follow-handler">
                          <FollowHandler
                            idToFollow={user._id}
                            type={"suggestion"}
                          />
                        </div>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={followersClose}>
              Fermer
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
export default Following;
