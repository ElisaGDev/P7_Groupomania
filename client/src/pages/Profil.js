import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

export default function Profil() {
  const userId = useContext(UidContext);

  return (
    <div>
      {userId.userId !== null ? (
        <UpdateProfil />
      ) : (
        <Log login={false} register={true} />
      )}
    </div>
  );
}
