var express = require("express");
var mongoose = require("mongoose");

ObjectId = require('mongodb').ObjectID;

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

require("dotenv").config();
const keys = require('./keys');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//MongoDB Atlas connection...
const connection = (process.env.NODE_ENV === "production" ? process.env.MONGO_URI : keys.mongodb.mongo_uri);

if (process.env.NODE_ENV === "production") {
    mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
      .then(() => console.log("Database Connected Successfully"))
      .catch(err => console.log(err));
  } else {
    mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/searching-google-news", { useNewUrlParser: true, useUnifiedTopology: true });
  }
  

app.get("/scrape", function (req, res) {
    axios.get("https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen").then(function (response) {
        var $ = cheerio.load(response.data);
        //console.log(response.data);

        $("article h3").each(function (i, element) {
            var result = {};

            result.headline = $(this)
                .text();

            result.summary = $(this)
                .next()
                .children("span")
                .text();

            result.url = "https://news.google.com" + $(this)
                .children("a")
                .attr("href");

            result.photo_url = $(this)
                .parents()
                .parent()
                .children("a")
                .children("figure")
                .children("img")
                .attr("src");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                })
        });

        res.send("Scrape Complete");
        res.redirect("/");

    })
});

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.get("/comments/:articleID", function (req, res) {
    db.Comment.find({ article_id: req.params.articleID })
        .then(function (dbArticle) {
            res.json(dbArticle);
            res.send(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
})

app.delete("/clear-articles", function (req, res) {
    db.Article.remove({})
        .then(function (dbArticle) {
            console.log(dbArticle);
        })
    db.Comment.remove({})
        .then(function (dbArticle) {
            console.log(dbArticle);
        })
    console.log("Article API called!");
});

app.post("/save-article/:id", function (req, res) {
    var savedID = req.params.id;
    console.log(savedID);
    db.Article.update({ _id: ObjectId(savedID) }, { $set: { "saved": true } }, function (err, result) {
        var response;
        if (err) {
            response = {'status':200,'message':'An error has occurred'}
        } else {
            response = {'status':404,'message':'' + result + ' document(s) updated'}
        }
        res.send(response);
    }).then(function (dbArticle) {
        console.log(dbArticle);
    })
});

app.post("/remove-article/:id", function (req, res) {
    var savedID = req.params.id;
    console.log(savedID);
    db.Article.update({ _id: ObjectId(savedID) }, { $set: { "saved": false } }, function (err, result) {
        if (err) {
            console.log('Error updating object: ' + err);
            res.send({ 'error': 'An error has occurred' });
        } else {
            console.log('' + result + ' document(s) updated');
            res.send(result);
        }
    })
});

app.post("/add-comment/:note/:articleID", function (req, res) {
    var comment = {};
    var userComment = req.params.note;
    var articleID = req.params.articleID;
    console.log(userComment);
    console.log(articleID);

    comment = {
        comment: userComment,
        article_id: articleID
    }

    db.Comment.create(comment)
        .then(function (dbArticle) {
            console.log(dbArticle);
            res.send(dbArticle);
        })
        .catch(function (err) {
            console.log(err);
        })
});




app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
