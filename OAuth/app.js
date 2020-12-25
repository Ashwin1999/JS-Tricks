const express = require("express");
const app = express();
require("dotenv/config");

const bodyParser = require('body-parser');
const cors = require("cors");
const passport = require('passport');
const passportSetup = require("./config/passport-setup");
const mongoose = require("mongoose");
const cookieSession = require('cookie-session');

app.use(cors());
app.use(bodyParser.json());

// cookieSession
app.use(cookieSession({
    maxAge: 30 * process.env.MINUTE,
    keys: [process.env.COOKIE_KEYS]
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// IMPORT ROUTES
const authRoutes = require("./routes/auth");

// MIDDLEWARES
app.use('/auth', authRoutes);

// DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db!!!');
});

// PORT TO LISTEN
app.listen(3030, () => { console.log("Server running on: http://localhost:3030"); });