const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

async function saveMood(result) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  // Add a new document in collection "moodtrack" with ID 'test'
  const res = await db.collection("moodtrack").add(result);

  return res;
}

async function getMood(id) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const moodtrack = db.collection("moodtrack");
  const snapshot = await moodtrack.where("id", "==", id).get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  let moods_arr = [];
  let moods_dict = {};
  let res = [];
  snapshot.forEach((doc) => {
    moods_arr.push(doc.data().mood);
  });
  moods_dict = moods_arr.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
    return acc;
  }, {});

  for (const [mood, count] of Object.entries(moods_dict)) {
    res.push({ mood, count });
  }
  // Seperate key and value into two arrays
  // var x = [], y = [];
  // for (var property in moods_dict) {
  //   if (!moods_dict.hasOwnProperty(property)) {
  //     continue;
  //   }

  //   x.push(property);
  //   y.push(moods_dict[property]);
  // }
  // const res = {x, y}
  console.log(res);
  return res;
}

async function getMoodIntense(id) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const moodtrack = db.collection("moodtrack");
  const snapshot = await moodtrack.where("id", "==", id).get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  let moods_arr = [];
  let moods_dict = {};
  let res = [];
  snapshot.forEach((doc) => {
    const mood = doc.data().mood;
    const intensity = doc.data().intensity;
    const dict = { [mood]: intensity };
    moods_arr.push(dict);
  });

  var avg = Array.from(
    moods_arr.reduce(
      (acc, obj) =>
        Object.keys(obj).reduce(
          (acc, key) =>
            typeof obj[key] == "number"
              ? acc.set(key, (acc.get(key) || []).concat(obj[key]))
              : acc,
          acc
        ),
      new Map()
    ),
    ([mood, values]) => ({
      mood,
      average: values.reduce((a, b) => a + b) / values.length,
    })
  );
  // moods_dict = moods_arr.reduce((acc, val) => {
  //   acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
  //   return acc;
  // }, {});

  // for (const [mood, count] of Object.entries(moods_dict)) {
  //   res.push({mood, count});
  // }

  // Seperate key and value into two arrays
  // var x = [], y = [];
  // for (var property in moods_dict) {
  //   if (!moods_dict.hasOwnProperty(property)) {
  //     continue;
  //   }

  //   x.push(property);
  //   y.push(moods_dict[property]);
  // }
  // const res = {x, y}
  // console.log(res);
  return avg;
}

module.exports = { saveMood, getMood, getMoodIntense };
