/*

   Make sure you add the following to .env file in production mode:
1. PORT
2. DB (monogdb url)
3. ACCESS_TOKEN_SECRET

*/
require("dotenv/config");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());

const testRoute = require("./api/routes/testRoute");
const authRoute = require("./api/authentication/authRoute");
app.use("/api", testRoute);
app.use("/api/auth", authRoute);

const mongoose = require("mongoose");
mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
