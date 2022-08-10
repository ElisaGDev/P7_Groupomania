const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const usersLogRoutes = require("./routes/log.routes");
const usersRoutes = require("./routes/user.routes");
const postsRoutes = require("./routes/post.routes");
const authRoutes = require("./routes/auth.routes");
const {
  requireAuth /* , checkUser  */,
} = require("./middleware/auth.middleware");

app.use(express.json());

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));
app.use(cookieParser());

//Routes
app.use("/api", authRoutes);
app.get("/api/token", requireAuth);
app.use("/auth", usersLogRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

module.exports = app;
