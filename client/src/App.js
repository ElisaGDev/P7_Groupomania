// useEffect pour effectuer des fetch, useState pour stocker le retour de l'API
import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
// AppContext permet de gérer l'état sans transmettre les props sur chaque composant.
import { UidContext } from "./components/AppContext";
// Axios, permet de faire des promises, de communiquer avec le back
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";

const App = () => {
  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/token`,
        withCredentials: true,
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();

    if (uid) dispatch(getUser(uid));
  }, [uid, dispatch]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

export default App;
