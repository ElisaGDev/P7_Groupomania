import React, { useState, useEffect, useContext } from "react";
import Card from "./Post/Card";
import CreatePost from "./Post/CreatePost";

import { isEmpty } from "../components/utils/tools";
import { UidContext } from "./AppContext";

const Thread = (props) => {
  const [loadPosts, setLoadPosts] = useState(true);
  const [addPost, setAddPost] = useState(false);
  const [count, setCount] = useState(5);
  const { userId, pseudo } = useContext(UidContext);
  const posts = props.posts;

  useEffect(() => {
    if (loadPosts) {
      setLoadPosts(false);
      setCount(count + 5);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPosts, /*  dispatch, */ count]);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPosts(true);
    }
  };

  const handleAddPost = () => {
    setAddPost(true);
  };
  const handleCancelPost = () => {
    setAddPost(false);
  };
  return (
    <section className="container">
      {addPost === false ? (
        <button
          onClick={handleAddPost}
          className="btn btn-primary text-white btn-active"
        >
          Ajouter
        </button>
      ) : (
        <React.Fragment>
          <button
            onClick={handleCancelPost}
            className="btn btn-primary text-white btn-active"
          >
            Annuler
          </button>
          <CreatePost cle={userId} pseudo={pseudo} />
        </React.Fragment>
      )}
      <div className="container thread">
        <h2>Fil d'actualité</h2>
        <ul>
          {!isEmpty(posts[0]) &&
            posts.map((post) => {
              return <Card post={post} posts={posts} />;
            })}
        </ul>
      </div>
    </section>
  );
};

export default Thread;
