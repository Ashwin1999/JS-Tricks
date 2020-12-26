const isAuthenticated = require('../config/authCheck');
const router = require("express").Router();

router.get('/profile', isAuthenticated, (req, res) => {
    res.send(`Hi ${req.user.name}!`);
});

module.exports = router;