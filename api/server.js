// implement your server here
// require your posts router and connect it here
const express = require('express');

const server = express();

server.use(express.json());

const postsRouter = require('./posts/posts-router.js');
server.use('/api/posts', postsRouter);

// const commentsRouter = require('./posts/posts-router.js');
// server.use('/api/comments', commentsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>API 2 Project</h2>`)
})


module.exports = server;
