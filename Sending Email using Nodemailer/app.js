// IMPORTS
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv/config");


// MANDATORY
app.use(cors());
app.use(bodyParser.json());

// IMPORT ROUTES
const postRoutes = require("./routes/posts/posts");
const authRoutes = require("./routes/authentication/auth");
const notificationRoutes = require("./routes/notification/emailNotification");


// MIDDLEWARES
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);
app.use('/email', notificationRoutes);


// DB CONNECTION
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to Database!!!');
});

// PORT TO LISTEN
app.listen(3030, () => { console.log("Server running on: http://localhost:3030") });
