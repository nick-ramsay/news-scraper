# The Scrape

Heroku Deployment: https://blooming-savannah-49090.herokuapp.com/

## Problem Summary 
- As someone who enjoys reading the news, I don't like having to browser multiple sites to find interesting stories.

## Overview
- This is an application that scrapes data from the US version of [Google News](https://news.google.com/topics/CAAqIggKIhxDQkFTRHdvSkwyMHZNRGxqTjNjd0VnSmxiaWdBUAE?hl=en-US&gl=US&ceid=US%3Aen) to consolidate news articles onto one page where they can be bookmarked and commented upon.

## Installation & Prerequisites

![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/the-scrape/dependent-packages.jpg?raw=true)

- The The Scrape application is dependent upon four packages...
 1. Express
 2. Axios
 3. Cheerio
 4. Mongoose
 
- If you have cloned the repository with the package.json file, these packages can be installed using the npm-install command.

## Instructions

The Scrape is deployed on Heroku for usage [here](https://blooming-savannah-49090.herokuapp.com/).

![The Scrape Homepage](https://github.com/nick-ramsay/readme-images/blob/master/the-scrape/the-scrape-home.jpg?raw=true)

Users will first land on a homepage showing them all articles that have been scraped and are currently in the database. A user can bookmark an article as saved by clicking the red button with the heart icon.

![The Scrape Saved Articles](https://github.com/nick-ramsay/readme-images/blob/master/the-scrape/the-scrape-saved.jpg?raw=true)

Once you save the article, you can click the "Saved Articles" link at the top of the page to view the saved articles.

![The Scrape Saved - Comment](https://github.com/nick-ramsay/readme-images/blob/master/the-scrape/the-scrape-comment.jpg?raw=true)

On the saved article page, you can leave a comment and view existing comments.

You can also remove an article from the saved list by selecting the red, "X" button.

![The Scrape Saved - Clear Articles](https://github.com/nick-ramsay/readme-images/blob/master/the-scrape/the-scrape-clear-articles.jpg?raw=true)

Finally, you also have the option of clearing all scraped articles and comments from the page by clicking the "Clear Articles" button.

![The Scrape Saved - Rescrape](https://github.com/nick-ramsay/readme-images/blob/master/the-scrape/the-scrape-rescrape.jpg?raw=true)

After clearing the articles, you can click "Scrape New Articles" to scrape a new set of articles and render them on the page for viewing.

## Built With
- The Scrape application was built using jQuery, MongoDB, Bootstrap, Node.js and the following Node Package Manage modules:

 1. Express
 2. Axios
 3. Cheerio
 4. Mongoose

## Authors 
- Developer: Nick Ramsay (@nick-ramsay)