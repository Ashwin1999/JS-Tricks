const router = require("express").Router();

router.get('/', (req, res) => {
    try {
        res.json({ message: "Hi!" });
    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;