const bodyParser = require("body-parser");
const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;

//Router Here
const authRouter = require('./routes/authRoute');

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/user', authRouter);

app.use('/', (req, res) => {
    res.send("Hello from server side");
});

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`);
});