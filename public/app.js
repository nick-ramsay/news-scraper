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

function renderArticles(data) {
    $("#articles").empty();
    switch (data) {
        case (undefined):
            var emptyMessage = "<div class='alert alert-warning text-center'><h4>Uh Oh. Looks like we don't have any new articles.</h4><h5>Click \"Scrape New Article\" button to generate more articles.</h5></div>"
            $("#articles").append(emptyMessage);
            break;
        default:
            for (var i = 0; i < data.length; i++) {
                switch (data[i].saved) {
                    case false:
                        var card = '<div class="card"></div>';
                        var cardRow = '<div class="row">';
                        var cardText = '<div class="col-md-8"><div class="card-body"><h5 class="card-title"><a data-id="' + data[i]._id + '" href="' + data[i].url + '">' + data[i].headline + '</a></h5><p class="card-text">' + data[i].summary + '</p></div></div>';
                        var cardSaveButton = '<div class="col-md-1" style="margin: auto; text-align: center;"><button class="btn btn-danger saveArticleBtn" data-id="' + data[i]._id + '"><img src="./images/saveArticleIcon.png" style="max-height:24px; max-width: 24px;"></button></div>';
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
    }
}

function renderSavedArticles(data) {
    $("#articles").empty();
    switch (data) {
        case (undefined):
            var emptyMessage = "<div class='alert alert-warning text-center'><h4>Uh Oh. Looks like we don't have any new articles.</h4><h5>Click \"Scrape New Article\" button to generate more articles.</h5></div>"
            $("#articles").append(emptyMessage);
            break;
        default:
            for (var i = 0; i < data.length; i++) {
                switch (data[i].saved) {
                    case true:
                        var card = '<div class="card"></div>';
                        var cardRow = '<div class="row">';
                        var cardText = '<div class="col-md-7"><div class="card-body"><h5 class="card-title"><a data-id="' + data[i]._id + '" href="' + data[i].url + '">' + data[i].headline + '</a></h5><p class="card-text">' + data[i].summary + '</p></div></div>';
                        var cardRemoveButton = '<div class="col-md-1" style="margin: auto; text-align: center;"><button class="btn btn-danger removeArticleBtn" data-id="' + data[i]._id + '">X</button></div>';
                        var cardCommentButton = '<div class="col-md-1" style="margin: auto; text-align: center;"><button class="btn btn-primary commentBtn" data-toggle="modal" data-target="#commentModal' + data[i]._id + '" data-id="' + data[i]._id + '">Comment</button></div>';
                        var commentModal = '<div class="modal" id="commentModal' + data[i]._id + '" tabindex="-1" role="dialog"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">'+ data[i].headline + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><p>Add a comment...</p><form><div class="form-group"><textarea class="form-control" id="exampleFormControlTextarea1" rows="2" id="commentInput" data-article-id="' + data[i]._id + '"></textarea></div></form><button type="button" class="btn btn-primary addCommentBtn">Add Comment</button><p class="mt-2"><strong>Comments</strong></p><ul class="list-group list-group-flush commentList"><li class="list-group-item list-group-item-primary data-article-id="' + data[i]._id + '">Test Comment!</li></ul></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
                        var cardImage = '<div class="col-md-3" style="text-align:center;vertical-align:center;"><img src="' + data[i].photo_url + '" class="card-img m-1" alt="' + data[i].headline + '" style="max-height: 150px; max-width:150px;"></div>';
                        cardRow += cardText;
                        switch (data[i].photo_url) {
                            case undefined:
                                break;
                            default:
                                cardRow += cardImage;
                        }
                        
                        //Comment HTML: <li class="list-group-item list-group-item-primary">Test Comment!</li>


                        cardRow += cardCommentButton;
                        cardRow += cardRemoveButton;
                        cardRow += commentModal;

                        card += cardRow;

                        $("#articles").append(card);
                }
            }
    }
}

function initArticles() {
    $.get("/articles", function (data) {
        renderArticles(data);
    });
}

function initSavedArticles() {
    $.get("/articles", function (data) {
        renderSavedArticles(data);
    });
}

$(document).on("click", "#scrapeBtn", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function (res, req) {
        $.get("/articles", function (data) {
            console.log(data);
            renderArticles(data);
        });
    });
});

$(document).on("click", "#clearArticleBtn", function () {
    $.ajax({
        method: "DELETE",
        url: "/clear-articles",
        success: renderArticles()
    })
});

$(document).on("click", "#savedArticles", function () {
    $.ajax({
        method: "GET",
        url: "/articles"
    }).then(function (res, req) {
        $.get("/articles", function (data) {
            console.log(data);
            renderSavedArticles(data);
        });
    });
});

$(document).on("click", ".saveArticleBtn", function () {
    $.ajax({
        method: "POST",
        url: "/save-article/" + $(this).attr("data-id"),
        success: initArticles()
    }).then(function (res, req) {
        $.get("/articles", function (data) {
            renderArticles(data);
        });
    })
})

$(document).on("click", ".removeArticleBtn", function () {
    $.ajax({
        method: "POST",
        url: "/remove-article/" + $(this).attr("data-id"),
        success: initSavedArticles()
    })
})

window.onload = initArticles();