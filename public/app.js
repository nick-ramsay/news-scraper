$.getJSON("/articles", function (data) {
    for (var i = 0; i < data.length; i++) {
        switch (data[i].saved) {
            case false:
                var card = '<div class="card"></div>';
                var cardRow = '<div class="row">';
                var cardText = '<div class="col-md-8"><div class="card-body"><h5 class="card-title"><a data-id="' + data[i]._id + '" href="' + data[i].url + '">' + data[i].headline + '</a></h5><p class="card-text">' + data[i].summary + '</p></div></div>';
                var cardSaveButton = '<div class="col-md-1" style="margin: auto; text-align: center;"><button class="btn btn-danger"><img src="./images/saveArticleIcon.png" style="max-height:24px; max-width: 24px;"></button></div>';
                var cardImage = '<div class="col-md-3" style="text-align:center;vertical-align:center;"><img src="' + data[i].photo_url + '" class="card-img m-1" alt="' + data[i].headline + '" style="max-height: 150px; max-width:150px;"></div>';
                cardRow += cardText;
                switch (data[i].photo_url) {
                    case undefined:
                        break;
                    default:
                        cardRow += cardImage;
                }

                cardRow += cardSaveButton;

                card += cardRow;

                $("#articles").append(card);
        }
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
