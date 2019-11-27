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

