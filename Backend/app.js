const express = require("express");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");

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

/* --------------------------------------- UploadFile - Post images -------------------------------------------- */
app.use(fileUpload());

app.post("/api/posts/file", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded!" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/../client/public/images/posts/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res
      .status(201)
      .json({ fileName: file.name, filePath: `/images/posts/${file.name}` });
  });
});

//Routes
app.use("/api", authRoutes);
app.get("/api/token", requireAuth);
app.use("/auth", usersLogRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

module.exports = app;
