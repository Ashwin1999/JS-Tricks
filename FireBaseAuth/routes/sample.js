const router = require("express").Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/public', (req, res) => {
    res.json({ message: "Hi! This is a public route." })
});

router.get('/restricted1', (req, res) => {
    res.json({ message: "This is the restricted route 1." })
});

router.get('/restricted2', (req, res) => {
    res.json({ message: "This is the restricted route 2." })
});

router.get('/restricted3', (req, res) => {
    res.json({ message: "This is the restricted route 3." })
});

module.exports = router;