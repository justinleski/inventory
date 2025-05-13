const express = require("express");
const path = require("node:path");
const app = express();
const indexRouter = require("./routes/indexRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("styles"));


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});