import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../utils/tools";
import FollowHandler from "./FollowHandler";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";

const FriendsHint = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  useEffect(() => {
    const notFriendList = () => {
      let array = [];
      usersData.map((user) => {
        if (user._id !== userData._id && !user.followers.includes(userData._id))
          return array.push(user._id);
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) {
        array.length = 5;
      } else if (window.innerHeight > 720) {
        array.length = 4;
      } else if (window.innerHeight > 615) {
        array.length = 3;
      } else if (window.innerHeight > 540) {
        array.length = 1;
      } else {
        array.length = 0;
      }
      setFriendsHint(array);
    };

    if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
      notFriendList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [usersData, userData, playOnce]);

  return (
    <div className="get-friends-container">
      <h4 className="text-tertary fw-bold">Suggestions</h4>
      {isLoading ? (
        <Spinner animation="border" variant="warning" width="text-center" />
      ) : (
        <ul>
          {friendsHint &&
            friendsHint.map((user) => {
              for (let i = 0; i < usersData.length; i++) {
                if (user === usersData[i]._id) {
                  return (
                    <li className="user-hint" key={user}>
                      <Card>
                        <Card.Img
                          src={usersData[i].picture}
                          alt="user-pic"
                          className="user-picture"
                        />
                        <p>{usersData[i].pseudo}</p>
                        <FollowHandler
                          idToFollow={usersData[i]._id}
                          type={"suggestion"}
                        />
                      </Card>
                    </li>
                  );
                }
              }
            })}
        </ul>
      )}
    </div>
  );
};

export default FriendsHint;
