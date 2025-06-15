require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./database");
const cors = require("cors");

const app = express();
app.use(cors());



app.use(express.json());

//  Rutas API
const router = require("./routes");
const authRoutes = require("./routes/auth");

app.use("/api", router);         // /api/todos
app.use("/api/auth", authRoutes); // /api/auth/login y /register

const port = process.env.PORT || 5000;

async function startServer() {
  await connectToMongoDB();
  app.listen(port, () => {
    console.log(`🚀 Server is listening on http://localhost:${port}`);
  });
}
startServer();

//  React frontend — debe estar AL FINAL
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});



