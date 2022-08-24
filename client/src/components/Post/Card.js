import React, { useEffect, useState, useContext } from "react";
import { UidContext } from "../../components/AppContext";
import axios from "axios";
import swal from "sweetalert";

import LikeButton from "./LikeButton";
import { isEmpty, dateParser } from "../utils/tools";
import UpdatePost from "./UpdatePost";

export default function Card(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingUpdatePost, setLoadingUpdatePost] = useState(false);
  const posts = props.posts;
  const post = props.post;

  const { userId, role } = useContext(UidContext);

  const handleLoadUpdatePost = (e) => {
    setLoadingUpdatePost(true);
  };
  const handleCancelUpdatePost = (e) => {
    setLoadingUpdatePost(false);
  };

  const handleDeletePost = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/posts/${post._id}`,
      withCredentials: true,
    })
      .then(() => {
        swal({
          title: "Supprimé!",
          text: "Votre post a bien été supprimé!",
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
  };

  useEffect(() => {
    !isEmpty(posts[0]) && setIsLoading(false);
  }, [posts]);

  return (
    <li className="container">
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <section>
          {role === "admin" ? (
            <div className="card">
              <div className="card-header" post={post}>
                {post.posterPseudo} a écrit :
              </div>
              <div className="card-body">
                <p className="card-text post-message">{post.message}</p>
                {post.picture ? (
                  <div className="feed-image p-2 px-3">
                    <img
                      className="img-fluid img-responsive"
                      src={`images/posts/${post.picture}`}
                      alt="user_post_pic"
                    />
                  </div>
                ) : null}
              </div>
              <div>
                {loadingUpdatePost === false ? (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Modifier"}
                    onClick={handleLoadUpdatePost}
                  />
                ) : (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Annuler"}
                    onClick={handleCancelUpdatePost}
                  />
                )}
                <input
                  type={"submit"}
                  value={"Supprimer"}
                  onClick={handleDeletePost}
                  className="supprimer btn-active"
                />
                {loadingUpdatePost === true ? (
                  <UpdatePost
                    post={post}
                    postid={post._id}
                    message={post.message}
                    picture={post.picture}
                  />
                ) : null}
              </div>
              <div className="card-footer">
                <LikeButton post={post} />
              </div>
              <div className="timestamps-style">
                Posté : {dateParser(post.createdAt)} <br />
                Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </div>
          ) : post.posterId === userId && role === "user" ? (
            <React.Fragment>
              <div post={post}>{post.posterPseudo} à écrit :</div>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <div>
                  <img
                    src={`images/posts/${post.picture}`}
                    alt="user_post_pic"
                  />
                </div>
              ) : null}
              <div>
                {loadingUpdatePost === false ? (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Modifier"}
                    onClick={handleLoadUpdatePost}
                  />
                ) : (
                  <input
                    className="btn-active"
                    type={"button"}
                    value={"Annuler"}
                    onClick={handleCancelUpdatePost}
                  />
                )}
                <input
                  type={"submit"}
                  value={"Supprimer"}
                  onClick={handleDeletePost}
                  className="supprimer btn-active"
                />
                {loadingUpdatePost === true ? (
                  <UpdatePost
                    post={post}
                    postid={post._id}
                    message={post.message}
                    picture={post.picture}
                  />
                ) : null}
              </div>
              <div>
                <LikeButton post={post} />
              </div>
              <div className="timestamps-style">
                Posté : {dateParser(post.createdAt)} <br />
                Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : post.posterId !== userId && role === "user" ? (
            <React.Fragment>
              <div post={post}>{post.posterPseudo} à écrit :</div>
              <p className="post-message">{post.message}</p>
              {post.picture ? (
                <div>
                  <img
                    src={`images/posts/${post.picture}`}
                    alt="user_post_pic"
                  />
                </div>
              ) : null}
              <div>
                <LikeButton post={post} />
              </div>
              <div className="timestamps-style">
                Posté : {dateParser(post.createdAt)} <br />
                Mis à jour : {dateParser(post.updatedAt)}
              </div>
            </React.Fragment>
          ) : null}
        </section>
      )}
    </li>
  );
}
