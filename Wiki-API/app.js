const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/wikiDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("article", articleSchema);

app
  .route("/articles")
  ////trageting all article///
  .get(function (req, res) {
    Article.find({}, function (err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err);
      }
    });
  })
  .post(function (req, res) {
    const title = req.body.title;
    const content = req.body.content;
    const newArticle = new Article({
      title: title,
      content: content,
    });
    newArticle.save(function (err) {
      if (!err) {
        res.send("Succesfully added an article");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function (req, res) {
    Article.deleteMany({}, function (err) {
      if (!err) {
        res.send("Successfully deleted all the articles");
      } else {
        res.send(err);
      }
    });
  });
////targeting a specific article/////
app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle }, function (
      err,
      foundArticle
    ) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("no matching articles");
      }
    });
  })
  .put(function (req, res) {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      function (err) {
        if (!err) {
          res.send("Successfully updated");
        }
      }
    );
  })
  .patch(function (req, res) {
    Article.update({ title: req.params.articleTitle },{$set: req.body}, function(err){
        if(!err){
            res.send('Successfully updated article')
        }else{
            res.send(err)
        }
    });
  })
  .delete(function(req, res){
      Article.deleteOne({title: req.params.articleTitle}, function(err){
          if(!err){
              res.send('Successfully deleted the article')
          }else{
              res.send(err)
          }
      })
  })

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function (req, res) {
  console.log("server started on port " + port);
});
