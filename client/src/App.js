import React, { useEffect, useState } from "react";
import Routes from "./components/Routes";
import { UidContext } from "./components/AppContext";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState("");
  const [pseudo, setPseudo] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/token`,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
          setUserId(res.data.user_Id);
          setRole(res.data.role);
          setPseudo(res.data.pseudo);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
  }, []);

  return (
    <UidContext.Provider value={{ userId, role, pseudo }}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
