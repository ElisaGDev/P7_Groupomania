import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";

export default function Profil() {
  const uid = useContext(UidContext);

  return (
    <div>
      {uid ? <h1>Update Page</h1> : <Log login={false} register={true} />}
    </div>
  );
}
