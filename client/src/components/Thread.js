import React, { useEffect, useState } from "react";
// useDispatch = permet d'envoyer des actions qui seront traitées par le reducer
// useSelector = permet de récupérer les données qui sont stockées depuis n'importe quel composant
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/post.actions";
import PostCard from "./Post/PostCard";
import NewPostForm from "../components/Post/NewPostForm";
import { isEmpty } from "./utils/tools";
import Trends from "./Trends";
import FriendsHint from "../components/Profil/FriendsHint";
import ProfilCard from "./Profil/ProfilCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  // Infinite scroll
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
    <Container fluid>
      <Row>
        <Col className="mb-4">
          <ProfilCard />
        </Col>
        <Col lg={6}>
          <NewPostForm />
          <div className="card-container">
            {!isEmpty(posts[0]) &&
              posts.map((post) => {
                return <PostCard post={post} key={post._id} />;
              })}
          </div>
        </Col>
        <Col>
          <Trends />
          <FriendsHint />
        </Col>
      </Row>
    </Container>
  );
};

export default Thread;
