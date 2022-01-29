const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const talkToChatbot = require("./chatbot");
var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(morgan("dev"));

app.post("/chatbot", jsonParser, urlEncoded, function (req, res, next) {
  res.header({"Content-Type": "application/json"});
  next;
  const message = req.body.message;
  console.log("message " + message);

  talkToChatbot(message)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
      res.send({
        error: "Error occured here"
      });
    });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});