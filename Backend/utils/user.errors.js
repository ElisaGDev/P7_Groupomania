exports.registerErrors = (err) => {
  let errors = { pseudo: "", email: "", password: "" };

  if (err.message.includes("pseudo"))
    errors.pseudo = "Pseudo incorrect ou déja utilisé!";

  if (err.message.includes("email")) errors.email = "Email incorrect!";

  if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect!(6 caractères minimum)";

  if (err.code === 11000 && Object.keys(err.keyvalue)[0].includes("pseudo"))
    errors.pseudo = "Ce pseudo est déjà utilisé!";

  if (err.code === 11000 && Object.keys(err.keyvalue)[0].includes("email"))
    errors.email = "Cet email est déjà utilisé!";

  return errors;
};

exports.loginErrors = (err) => {
  let errors = { email: "", password: "" };

  if (err.message.includes("email")) errors.email = "Email incorrect!";

  if (err.message.includes("password"))
    errors.password = "Mot de passe incorrect!";

  return errors;
};
