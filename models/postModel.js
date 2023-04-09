const { Schema, model } = require('mongoose');

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title required"]
    },
    body: {
        type: String,
        required: [true, "Body required"]
    }
});

const Post = model("Post", postSchema)

module.exports = Post;