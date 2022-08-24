import React from "react";

export default function UpdateProfil() {
  return (
    <div className="profil-container">
      <div className="profil-container__card">
        <h1>Profil de </h1>
        <div className="profil-container__card__update-img">
          <h3>Photo de profil</h3>
          <img alt="user-pic" />
        </div>
        <form className="profil-container__card__update-pseudo">
          <input
            aria-label="changer son nom"
            type="text"
            id="pseudo"
            name="pseudo"
          />
          <input type="submit" value="Valider" />
        </form>
        <button
          aria-label="Bouton supprimer son compte"
          className="profil-container__card__delete-account"
        >
          Supprimer le compte
        </button>
      </div>
    </div>
  );
}
