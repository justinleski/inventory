// routes/
const { Router } = require("express");
const indexRouter = Router();



// Our index router will take any requests from the index page and route them
indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Tea Inventory" });
});

/* 
Will route anytime we go to /new
*/
indexRouter.get("/new", (req, res) => {
  res.render("form", { title: "Form" });
});
// deals with form submission
indexRouter.post("/new", (req, res) => {
  // console.log(req.body);
  messages.push({ text: req.body.messageText, user: req.body.userName, added: new Date() });
  res.redirect("/");
});

module.exports = indexRouter;