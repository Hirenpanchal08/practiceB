const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const db = require("./config/connection");
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const port = 3000;
const taskRoute = require("./routes/taskRoute");
app.get("/", async (req, res) => {
  res.send("heyy");
});
app.use("/task", taskRoute);
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
