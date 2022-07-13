const express = require("express");
const userRoutes = require("./routes/user.routes");
require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const app = express();

//Routes
app.use("/api/user", userRoutes);

//Serveur
app.listen(process.env.PORT, () => {
  console.log("listening on port 5000");
});
