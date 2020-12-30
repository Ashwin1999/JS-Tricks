const router = require("express").Router();
const Post = require('../../models/Posts/Posts');
const verifyUser = require('../authentication/verifyTokens');


// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const allPosts = await Post.find();
        res.json(allPosts);
    } catch (err) {
        res.json({ message: err });
    }
});


// GET PAGE N WITH LIMIT L
function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        const results = {}

        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        try {
            results.results = await model.find().limit(limit).skip(startIndex).exec()
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }
}
router.get('/section', paginatedResults(Post), async (req, res) => {
    try {
        res.json(res.paginatedResults)
    } catch (err) {
        res.json({ message: err });
    }
})


// GET SPECIFIC POST
router.get('/:id', async (req, res) => {
    try {
        const specificPost = await Post.findById(req.params.id);
        res.json(specificPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// ADD A POST TO DB
router.post('/', async (req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savePost = await post.save();
        res.json(savePost);
    } catch (err) {
        res.json({ message: err });
    }
});


// DELETE A POST
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.deleteOne({ _id: req.params.id });
        res.json(deletedPost);
    } catch (err) {
        res.json({ message: err });
    }
});


// UPDATE A POST
router.patch('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { useFindAndModify: false }
        )
        const updated = await Post.findById(req.params.id)
        res.json({ message: updated });
    } catch (err) {
        res.json({ message: err });
    }
});


module.exports = router;
