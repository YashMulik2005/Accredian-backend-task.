const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const userroute = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: "https://deft-tiramisu-c60213.netlify.app",
  })
);
app.use(express.json());
app.use("/user", userroute);

app.listen(3000, () => {
  console.log("server running.");
});
