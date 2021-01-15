const express = require("express");
const app = express();
bodyParser = require('body-parser');
const cors = require("cors");
const { auth } = require('express-openid-connect');
require("dotenv/config");


const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET
};

app.use(auth(config));


app.use(cors());
app.use(bodyParser.json());

const sampleRoutes = require("./routes/sample");
app.use('/', sampleRoutes);

port = process.env.PORT || 3030
app.listen(port, console.log(`server running on port ${port}\nhttp://localhost:${port}`));