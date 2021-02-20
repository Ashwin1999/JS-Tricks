// image url can be found at:
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv/config");

// MANDATORY
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get('/', (req,res)=>{
    res.send("hello")
})

// Routes
const sampleRoutes = require("./routes/sample");
const userRoutes = require("./routes/user");
app.use('/', sampleRoutes);
app.use('/user', userRoutes);

// MongoDBCloud
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('connected to db!!!');
});

// PORT TO LISTEN
port = process.env.PORT || 3030
app.listen(port, console.log(`server running on port ${port}\nhttp://localhost:${port}`));