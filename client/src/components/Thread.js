import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import Card from "./Post/Card";
import NewPostForm from "../components/Post/NewPostForm";
import { isEmpty } from "./utils/tools";
import Trends from "./Trends";
import FriendsHint from "../components/Profil/FriendsHint";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }

    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-3 bg-secondary">Profil card</div>
        <div className="col-lg-6">
          <div className="card-postform">
            <NewPostForm />
          </div>
          <div className="card-container">
            {!isEmpty(posts[0]) &&
              posts.map((post) => {
                return <Card post={post} key={post._id} />;
              })}
          </div>
        </div>
        <div className="col-lg-3">
          <Trends />
          <FriendsHint />
        </div>
      </div>
    </div>
  );
};

export default Thread;
