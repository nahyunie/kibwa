var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    contents: String,
    author: String,
    id: String,
    comment_date: {type: Date, default: Date.now()}
});

var postSchema = new Schema({
    title: String,
    contents: String,
    category : String,
    id: String,
    name: String,
    post_date: {type: Date, default: Date.now()},
    comments: [commentSchema]
});

module.exports = mongoose.model('posts', postSchema);