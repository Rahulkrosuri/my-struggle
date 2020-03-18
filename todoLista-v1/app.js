const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + '/date.js')

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["eat", "sleep"];
const work = [];
app.get("/", function(req, res) {
  let day = date.getDate()
  res.render("index", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  console.log(req.body)
  let item = req.body.todo;
  if (req.body.list === "work") {
    work.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("index", { listTitle: "work List", newListItems: work });
});

app.post("/work", function(req, res) {
  let item = req.body.todo;
  work.push(item);
  res.redirect("/work");
});

app.get('/about', function (req, res) {
  res.render('about')
})
app.listen(3000, function() {
  console.log("server Started");
});
