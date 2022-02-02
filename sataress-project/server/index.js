const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("express").Router();

const talkToChatbot = require("./chatbot");
const saveMood = require("./moodResult");
const addUsers = require("./addUser");
var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(morgan("dev"));

app.post("/moodtrack", jsonParser, urlEncoded, function (req, res, next) {
  const message = req.body.message;
  console.log("message " + message);

  talkToChatbot(message)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
      res.send({
        error: "Error occured here",
      });
    });
});

app.post("/mood-result", jsonParser, urlEncoded, function (req, res, next) {
  const result = req.body;
  saveMood(result)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.post("/users", jsonParser, urlEncoded, function (req, res, next) {
  const result = req.body;
  addUsers(result)
  .then((response) => {
    res.send({ message: response});
  })
  .catch((error) => {
    console.log(error);
  })
})

app.use("/", router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
