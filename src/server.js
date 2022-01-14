const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passportSetup = require("./passport-setup");
//const path = require('path')
const routes = require("./routes");
const config = require("./config");
const server = express();

//Settings
server.set("port", config.server.port);

//Middlewares
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());
server.use(morgan("dev"));

//Routes
server.use("/auth", routes.user);
server.use("/api/product", routes.product);
server.use("/api/order", routes.order);
server.use("/api/company", routes.company);
server.use("/api/category", routes.category);

server.get("/", (req, res) => {
  return res.json("Built done");
});

//Static
//server.use(express.static(path.join(__dirname, 'statics')))

module.exports = server;
