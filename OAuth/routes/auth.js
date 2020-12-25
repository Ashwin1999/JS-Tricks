// IMPORTS
const router = require("express").Router();
const passport = require("passport");

router.get('/login', (req, res) => {
    res.send('Logging    in with google...');
});

router.get('/logout', (req, res) => {
    res.send('Logging out');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// callback auth for google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.send('Hello ' + req.user.name);
})

// EXPORT THE ROUTER
module.exports = router;