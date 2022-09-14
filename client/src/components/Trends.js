import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTrends } from "../actions/post.actions";
import { isEmpty } from "./utils/tools";
import { NavLink } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Trends = () => {
  const posts = useSelector((state) => state.allPostsReducer);
  const usersData = useSelector((state) => state.usersReducer);
  const trendList = useSelector((state) => state.trendingReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmpty(posts[0])) {
      const postsArr = Object.keys(posts).map((i) => posts[i]);
      let sortedArray = postsArr.sort((a, b) => {
        return b.likers.length - a.likers.length;
      });
      sortedArray.length = 3;
      dispatch(getTrends(sortedArray));
    }
  }, [posts, dispatch]);

  return (
    <div className="trending-container">
      <h4 className="text-tertary fw-bold">Trending</h4>
      <NavLink to="/trending">
        <ul className="list-trend">
          {trendList.length &&
            trendList.map((post) => {
              return (
                <li key={post._id}>
                  <Card>
                    <Row className="g-0">
                      <Col className="col-md-4">
                        {post.picture && (
                          <Card.Img
                            src={post.picture}
                            alt="post-pic"
                            width="40px"
                          />
                        )}
                        {post.video && (
                          <iframe
                            src={post.video}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={post._id}
                            className="video-trend"
                          ></iframe>
                        )}
                        {isEmpty(post.picture) && isEmpty(post.video) && (
                          <Card.Img
                            src={
                              usersData[0] &&
                              usersData
                                .map((user) => {
                                  if (user._id === post.posterId) {
                                    return user.picture;
                                  } else return null;
                                })
                                .join("")
                            }
                            className="profil-picture"
                            alt="profil-pic"
                          />
                        )}
                      </Col>
                      <Col className="col-md-8">
                        <Card.Body className="trend-content">
                          <p>{post.message}</p>
                          <span>Lire</span>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                </li>
              );
            })}
        </ul>
      </NavLink>
    </div>
  );
};

export default Trends;
