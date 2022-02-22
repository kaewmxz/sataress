const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("express").Router();

const talkToChatbot = require("./chatbot");
const { saveMood, getMood, getMoodIntense } = require("./mood");
const { response } = require("express");
const { addUsers, getUserFirstTime } = require("./addUser");
const {
  addGratitude,
  getGratitude,
  getGratitudeTable,
  deleteGratitude,
} = require("./gratitude");
var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(morgan("dev"));
app.disable("etag");
// app.get("/*", function (req, res, next) {
//   res.setHeader("Last-Modified", new Date().toUTCString());
//   next();
// });

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

app.get("/mood", (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  getMood(id)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.get("/mood-intense", (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  getMoodIntense(id)
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
      res.send({ message: response });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/user-firstTime", (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  getUserFirstTime(id)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.post(
  "/gratitude-result",
  jsonParser,
  urlEncoded,
  function (req, res, next) {
    const result = req.body;
    console.log(result);
    addGratitude(result)
      .then((response) => {
        res.send({ message: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

app.get("/gratitude", (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  getGratitude(id)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.get("/gratitude-table", (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  getGratitudeTable(id)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.post("/gratitude-delete", jsonParser, urlEncoded, function(req, res, next) {
  const result = req.body;
  deleteGratitude(result)
    .then((response) => {
      console.log(response);
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " +error);
    });
});


app.use("/", router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
