// IMPORTS
const router = require("express").Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/Authentication/User');
const { registerValidation, loginValidation } = require('./validation');



// REGISTER
router.post('/register', async (req, res) => {

    // CHECK IF FIELDS ARE VALID
    const { error } = registerValidation(req.body);
    if (error) return res.json({ error: error.details[0].message });

    // CHECK IF EMAIL CLASHES WITH ANOTHER USER
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.json({ error: "User with that email exists" });

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // CREATE USER WITH THE HASHED PASSWORD
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    // TRY TO SAVE USER
    try {
        const savedUser = await user.save();
        res.json({ user: user._id });
    } catch (err) {
        res.json({ message: err });
    }

});


// LOGIN
router.post('/login', async (req, res) => {

    // CHECK IF FIELDS ARE VALID
    const { error } = loginValidation(req.body);
    if (error) return res.json({ error: error.details[0].message });

    // CHECK IF USER WITH EMAIL EXIST
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({ error: "Invalid email" });

    // CHECK IF PASSWORD IS VALID
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.json({ error: "Invalid password" });

    // IF ALL SATISFY
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: 60 * process.env.MTL });
    res.json({ token: token });

})

module.exports = router;
