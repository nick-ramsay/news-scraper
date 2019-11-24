var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    article_id: {
        type: Schema.Types.ObjectId,
        ref: "Article"
    }
});

var Comment = mongoose.model("Comment",CommentSchema);

modules.exports = Comment;