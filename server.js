var express = require("express");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;

var app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = /*process.env.mongolab - rectangular - 08989 || */"mongodb://localhost/news-scraper";

mongoose.connect(MONGODB_URI);

app.get("/scrape", function(req,res) {
    axios.get("https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen").then(function(response){
        var $ = cheerio.load(response.data);
        //console.log(response.data);

        $("article h3").each(function(i,element) {
            var result = {};

            result.title = $(this)
            .text();

            result.link = "news.google.com" + $(this)
            .children("a")
            .attr("href");

            result.description = $(this)
            .next()
            .children("span")
            .text();

            result.photo_url = $(this)
            .parents()
            .parent()
            .children("a")
            .children("figure")
            .children("img")
            .attr("src");
            console.log(result);
        })
    });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
