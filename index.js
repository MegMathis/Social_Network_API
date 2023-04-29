const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// const cwd = process.cwd();

const PORT = 3000;
const app = express();

// const activity = cwd.includes("challenges");
//     ?cwd.split("/challenges")[1]
//     :cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log("API server funning on PORT " + PORT);
  });
});
