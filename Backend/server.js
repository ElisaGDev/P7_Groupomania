// Import des packages
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
// Helmet sécurise les requêtes HTTP, les en-têtes...
const helmet = require("helmet");

// Import des routes et middleware d'auth
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");

// Import paramètres de connexion MongoDB
require("dotenv").config({ path: "./config/.env" });
require("./config/db");

const app = express();

// Insertion CORS
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-site" }));

// Gestion des routes
// jwt
app.get("*", checkUser);
app.get("/api/token", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

// serveur
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
