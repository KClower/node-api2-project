// implement your posts router here
const express = require('express');

const Post = require('./posts-model.js');
const Comment = require('./posts-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Post.find(req.query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The posts information could not be retrieved" });
        });
});

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be retrieved" });
        });
});

router.post('/', (req, res) => {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" });
    }
    Post.insert(newPost)
        .then(result => {
            Post.findById(result.id)
                .then(createdPost => {
                    res.status(201).json({ message: "Created post successfully", createdPost });
                })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "There was an error while saving the post to the database" });
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    if (!changes.title || !changes.contents) {
        return res.status(400).json({ message: "Please provide title and contents for the post" });
    }
    Post.update(id, changes)
        .then(updatePost => {
            console.log(updatePost)
            if (!updatePost) {
                return res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
            Post.findById(id)
                .then(updatedPost => {
                    return res.status(200).json({ message: "Post updated successfully", updatedPost });
                })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post information could not be modified" });
        });
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Post.remove(id)
        .then(id => {
            if (!id) {
                return res.status(404).json({ message: "The post with the specified ID does not exist" });
            }
            res.status(200).json({ message: "The post has been successfully deleted" });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The post could not be removed" });
        });
});

router.get('/:id/comments', (req, res) => {
    const id = req.params.id;

    Post.findPostComments(id)

        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "The comments information could not be retrieved" });
        });
});


module.exports = router;
