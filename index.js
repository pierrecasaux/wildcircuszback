const express = require("express");

const dotenv = require("dotenv");

dotenv.config();

const bodyParser = require("body-parser");

const api = require("./src/routes");

const PORT = process.env.DATA_PORT || 8000;

const app = express();

// SupPORT JSON-encoded bodies
app.use(bodyParser.json());
// SupPORT URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// pour plaire au corse
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, GET, OPTIONS");
    next();
});

app.use("/api", api);

app.listen(PORT, err => {
    if (err) {
        throw new Error("Something bad happened...");
    }
    console.log(`Server is listening on ${PORT}`);
});
