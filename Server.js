const dotenv = require('dotenv')
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

// dotenv path setup
dotenv.config({ path: './config.env' });

app.use(cookieParser());


// convert json file use express
app.use(express.json());

// link router file(auth) from router folder
app.use('/api', require("./router/auth"));
app.use('/api', require("./router/QA"));

// for deployment
if (process.env.NODE_ENV == "production") {

    const path = require("path");

    app.get("/", (req, res) => {
        app.use(express.static(path.resolve(__dirname, "client/build")));
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port.`)
})