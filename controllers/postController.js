const Post = require('../models/postModel');

exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: true,
            results: posts.length,
            data: posts
        })
    } catch (e) {
        res.status(400).json({
            status: false,
        })
    }
}

exports.getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: true,

            data: post
        })
    } catch (e) {
        res.status(400).json({
            status: false,
        })
    }
}

exports.createPost = async (req, res, next) => {
    try {
        const post = await Post.create(req.body);
        res.status(200).json({
            status: true,

            data: post
        })
    } catch (e) {
        res.status(400).json({
            status: false,
        })
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: true,

            data: post
        })
    } catch (e) {
        res.status(400).json({
            status: false,
        })
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: true,
        })
    } catch (e) {
        res.status(400).json({
            status: false,
        })
    }
}