const router = require("express").Router();
const passport = require("passport");

router.get('/login', (req, res) => {
    res.send('Logging in with your google account');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// callback auth for google
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
})

module.exports = router;