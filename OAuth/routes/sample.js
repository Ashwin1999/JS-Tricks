// IMPORTS
const router = require("express").Router();

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        res.json(process.env.SAMPLE);
    } catch (err) {
        res.json({ message: err });
    }
});


// EXPORT THE ROUTER
module.exports = router;