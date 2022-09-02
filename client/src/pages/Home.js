import React, { useContext } from "react";
import Log from "../components/Log";
import Thread from "../components/Thread";
import { UidContext } from "../components/AppContext";
import NewPostForm from "../components/Post/NewPostForm";

const Home = () => {
  const uid = useContext(UidContext);

  return (
    <div className="home">
      <div className="main">
        {uid ? (
          <div>
            <div>
              <NewPostForm />
            </div>
            <div>
              <Thread />
            </div>
          </div>
        ) : (
          <div className="log-container">
            <Log signin={false} signup={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
