const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const indexRouter = require("./src/routes/indexRouter");

// server
const app = express();

// middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(indexRouter);
app.use(express.static("views"));

// port 3000
app.listen(3000, () => console.log("Server is running on port 3000"));
