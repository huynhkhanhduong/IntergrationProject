require("dotenv").config();
const express = require("express");
const configViewEngine = require("./config/viewEngine");
const webRouter = require("./routes/web");
const API_Filtering = require("./routes/api/Filter_api");

const app = express(); //app express
const port = process.env.PORT || 8888; // port
const hostname = process.env.HOST_NAME;

// config request body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true }));

// Parse URL-encoded bodies (as sent by HTML forms)

// config template engine
configViewEngine(app);

// clarify the routes
app.use("/", webRouter);

// initial all api
API_Filtering(app);

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`);
});
