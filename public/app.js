$.getJSON("/articles", function (data) {
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        var card = '<div class="card mb-3" style="max-width: 540px;">';
        var cardRow = '<div class="row no-gutters">';
        var cardBody = '<div class="col-md-8"><div class="card-body">';
        var cardHeading = '<h5 class="card-title"><a data-id="' + data[i]._id + '" href="' + data[i].url + '">' + data[i].headline + '</a></h5>';
        var cardSummary = '<p class="card-text">' + data[i].summary + '</p>';
        var cardImage = '<div class="col-md-4"><img src="' + data[i].photo_url + '" class="card-img" alt="' + data[i].headline + '"></div>';

        card += cardRow;
        card += cardBody;
        card += cardHeading;
        card += cardSummary;
        card += cardImage;

        $("#articles").append(card);
        //$("#articles").append("<p><a data-id='" + data[i]._id + "' href=" + data[i].url + ">" + data[i].headline + "</a></p>");
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
