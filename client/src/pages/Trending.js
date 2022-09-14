import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../components/AppContext";
import { isEmpty } from "../components/utils/tools";
import PostCard from "../components/Post/PostCard";
import ProfilCard from "../components/Profil/ProfilCard";
import Trends from "../components/Trends";
import FriendsHint from "../components/Profil/FriendsHint";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Trending = () => {
  const uid = useContext(UidContext);
  const trendList = useSelector((state) => state.trendingReducer);

  return (
    <Container fluid className="trending-page">
      <Row>
        <Col className="mb-4">
          <ProfilCard />
        </Col>
        <Col lg={6} className="main">
          <ul>
            {!isEmpty(trendList[0]) &&
              trendList.map((post) => <PostCard post={post} key={post._id} />)}
          </ul>
        </Col>
        <Col className="right-side">
          <Trends />
          {uid && <FriendsHint />}
        </Col>
      </Row>
    </Container>
  );
};

export default Trending;
