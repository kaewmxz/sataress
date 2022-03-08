const { getFirestore } = require("firebase-admin/firestore");

async function addGratitude(result) {
  var admin = require("firebase-admin");
  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  // Add a new document in collection "gratitude"
  const res = db.collection("gratitude").add(result);
  return res;
}

async function getGratitude(id, range) {
  var admin = require("firebase-admin");
  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const gratitude = db.collection("gratitude");
  const snapshot = await gratitude.where("id", "==", id).get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  let grat_arr = [];
  let grats_dict = {};
  let res = [];
  if (range != undefined) {
    snapshot.forEach((doc) => {
      // const date1 = new Date(doc.data().dateToCheck);
      // const date2 = new Date();
      // const diffTime = Math.abs(date2 - date1);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // if (diffDays <= days) {
      //   grat_arr.push(doc.data().gratitude);
      // }
      const date3 = new Date(doc.data().dateToCheck);
      const date1 = new Date(range[0]);
      const date2 = new Date(range[1]);
      if (date1 <= date3 && date3 <= date2) {
        grat_arr.push(doc.data().gratitude);
      }
    });
  } else {
    snapshot.forEach((doc) => {
      grat_arr.push(doc.data().gratitude);
    });
  }

  grats_dict = grat_arr.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : 1;
    return acc;
  }, {});

  for (const [text, value] of Object.entries(grats_dict)) {
    res.push({ text, value });
  }
  console.log(res);
  return res;
}

async function getGratitudeTable(id) {
  var admin = require("firebase-admin");
  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const gratitude = db.collection("gratitude");
  const snapshot = await gratitude.where("id", "==", id).get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return;
  }
  let grat_arr = [];
  snapshot.forEach((doc) => {
    grat_arr.push(doc.data());
  });
  console.log(grat_arr);
  return grat_arr;
}

async function deleteGratitude(result) {
  var admin = require("firebase-admin");
  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const gratitude = db.collection("gratitude");

  try {
    for (let i = 0; i < result.date.length; i++) {
      const snapshot = await gratitude
        .where("id", "==", result.id)
        .where("date", "==", result.date[i])
        .get();
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      snapshot.forEach((doc) => {
        doc.ref.delete();
      });
    }
    return "Deleted success";
  } catch (er) {
    return er;
  }
}

module.exports = {
  addGratitude,
  getGratitude,
  getGratitudeTable,
  deleteGratitude,
};
