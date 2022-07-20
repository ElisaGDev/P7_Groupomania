const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const {
  requireAuth /* , checkUser  */,
} = require("./middleware/auth.middleware");

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//Routes
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

//Dossier où stocker les images
//app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
