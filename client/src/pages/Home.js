import React, { useState, useContext, useEffect } from "react";
import Log from "../components/Log";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContext";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      await axios({
        methode: "get",
        url: `${process.env.REACT_APP_API_URL}api/posts`,
        withCredentials: true,
      })
        .then((res) => {
          const getPosts = res.data;
          setPosts(getPosts);
        })
        .catch((err) => {});
    };

    fetchPosts();
  }, []);
  const userId = useContext(UidContext);

  return (
    <React.Fragment>
      {userId.userId !== null ? <Thread posts={posts} /> : <Log />}
    </React.Fragment>
  );
}
