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

async function getMood(id, days) {
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

  if (days != undefined) {
    snapshot.forEach((doc) => {
      const date1 = new Date(doc.data().dateToCheck);
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= days) {
        moods_arr = moods_arr.concat(doc.data().mood);
      }
    });
  } else {
    snapshot.forEach((doc) => {
      moods_arr = moods_arr.concat(doc.data().mood);
    });
  }

  for (var i = 0; i < moods_arr.length; i++) {
    moods_dict[moods_arr[i]] = (moods_dict[moods_arr[i]] || 0) + 1;
  }
  for (const [mood, count] of Object.entries(moods_dict)) {
    res.push({ mood, count });
  }

  // console.log(moods_arr)
  // console.log(moods_arr)
  // moods_dict = moods_arr.reduce((acc, val) => {
  //   acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
  //   return acc;
  // }, {});

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

async function getMoodIntense(id, days) {
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
  let arr = [];
  let moods_arr = [];
  let intensity_arr = [];
  let moods_dict = {};
  let res = [];

  // snapshot.forEach((doc) => {
  //   moods_arr = moods_arr.concat(doc.data().mood);
  //   intensity_arr = intensity_arr.concat(doc.data().intensity);
  // });

  if (days != undefined) {
    snapshot.forEach((doc) => {
      const date1 = new Date(doc.data().dateToCheck);
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays <= days) {
        moods_arr = moods_arr.concat(doc.data().mood);
        intensity_arr = intensity_arr.concat(doc.data().intensity);
      }
    });
  } else {
    snapshot.forEach((doc) => {
      moods_arr = moods_arr.concat(doc.data().mood);
      intensity_arr = intensity_arr.concat(doc.data().intensity);
    });
  }

  for (var i = 0; i < moods_arr.length; i++) {
    arr.push({ [moods_arr[i]]: intensity_arr[i] });
  }

  var avg = Array.from(
    arr.reduce(
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
  console.log(avg);
  return avg;
}

module.exports = { saveMood, getMood, getMoodIntense };
