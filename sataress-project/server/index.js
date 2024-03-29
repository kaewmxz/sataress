const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const router = require("express").Router();

const talkToChatbot = require("./chatbot");
const talkDASS = require("./chat_dass");
const { saveMood, getMood, getMoodIntense, getMoodLogs, getMoodDates } = require("./mood");
const { saveDass, getDassFirstTime } = require("./dass");
const { response } = require("express");
const { addUsers, addBiweek, updateBiweek, getUserFirstTime, getBiweek} = require("./users");
const {
  addGratitude,
  getGratitude,
  getGratitudeTable,
  getGratitudeLogs,
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

app.use(express.static("build"));

app.post("/moodtrack", jsonParser, urlEncoded, function (req, res, next) {
  const message = req.body.message;
  const id = req.body.userId;
  console.log("message " + message);
  talkToChatbot(message, id)
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

app.post("/dass-21", jsonParser, urlEncoded, function (req, res, next) {
  const message = req.body.message;
  const id = req.body.userId;
  console.log("message " + message);

  talkDASS(message, id)
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

app.post("/dass-result", jsonParser, urlEncoded, function (req, res, next) {
  const result = req.body;
  saveDass(result)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.get("/mood", (req, res, next) => {
  const id = req.query.id;
  const range = req.query.range;
  // console.log(id);
  getMood(id, range)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.get("/mood-logs", (req, res, next) => {
  const id = req.query.id;
  const date = req.query.date;
  // console.log(id);
  getMoodLogs(id, date)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.get("/mood-dates", (req, res, next) => {
  const id = req.query.id;
  const date = req.query.date;
  // console.log(id);
  getMoodDates(id, date)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.get("/mood-intense", (req, res, next) => {
  const id = req.query.id;
  const range = req.query.range;
  // console.log(id);
  getMoodIntense(id, range)
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

app.post("/bi-week", jsonParser, urlEncoded, function (req, res, next) {
  const result = req.body;
  addBiweek(result)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/bi-week-update", jsonParser, urlEncoded, function (req, res, next) {
  const result = req.body;
  updateBiweek(result)
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

app.get("/dass-firstTime", (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  getDassFirstTime(id)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.get("/bi-week-check", (req, res, next) => {
  const id = req.query.id;
  console.log(id);
  getBiweek(id)
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
  const range = req.query.range;
  console.log(id);
  getGratitude(id,range)
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

app.get("/gratitude-logs", (req, res, next) => {
  const id = req.query.id;
  const date = req.query.date;
  // console.log(id);
  getGratitudeLogs(id, date)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
    });
});

app.post(
  "/gratitude-delete",
  jsonParser,
  urlEncoded,
  function (req, res, next) {
    const result = req.body;
    deleteGratitude(result)
      .then((response) => {
        console.log(response);
        res.send({ message: response });
      })
      .catch((error) => {
        console.log("Something went wrong: " + error);
      });
  }
);

app.use("/", router);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
