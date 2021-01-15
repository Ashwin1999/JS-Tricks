const router = require("express").Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/', (req, res) => {
    res.json({ message: "Hi!!!" })
});

router.get('/restricted', requiresAuth(), (req, res) => {
    res.json({ message: `Hi ${req.oidc.user.name}` })
});

module.exports = router;