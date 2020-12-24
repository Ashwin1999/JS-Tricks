const express = require("express");
const app = express();
require("dotenv/config");

const bodyParser = require('body-parser');
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

// IMPORT ROUTES
// example:
const sampleRoutes = require("./routes/sample");

// MIDDLEWARES
// example:
app.use('/', sampleRoutes);

// PORT TO LISTEN
app.listen(3030, () => { console.log("Server running on: http://localhost:3030"); });