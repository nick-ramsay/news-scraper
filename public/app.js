$.getJSON("/articles", function(data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
      $("#articles").append("<p><a data-id='" + data[i]._id + "' href=" + data[i].url + ">" + data[i].headline + "</a></p>");
    }
  });
  

$(document).on("click", "#scrapeBtn", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(
        console.log("Scrape complete!")
    );
});

$(document).on("click", "#clearArticleBtn", function () {
    $.ajax({
        method: "DELETE",
        url: "/clear-articles"
    }).then(
        console.log("Scraped articles dropped!")
    )
});

