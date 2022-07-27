const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
const cookieParser = require("cookie-parser");

const usersLogRoutes = require("./routes/log.routes");
const usersRoutes = require("./routes/user.routes");
const postsRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const {
  requireAuth /* , checkUser  */,
} = require("./middleware/auth.middleware");

app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
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
/*-------------------------------------------------*/
//Routes
app.use("/api", authRoutes);
app.get("/api/token", requireAuth);
app.use("/auth", usersLogRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

//Dossier où stocker les images
//app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
