const { getFirestore } = require("firebase-admin/firestore");

async function addUsers(result) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  // Add a new document in collection "moodtrack" with ID 'test'
  const userRef = db.collection("users");
  let res = [];
  const snapshot = await userRef.where("id", "==", result.id).get();
  if (snapshot.empty) {
    res = await db.collection("users").doc(result.id).set(result);
  }
  console.log(res);
  return res;
}

async function addBiweek(result) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  // Add a new document in collection "moodtrack" with ID 'test'
  const userRef = db.collection("bi-week");
  let res = [];
  const snapshot = await userRef.where("id", "==", result.id).get();
  if (snapshot.empty) {
    res = await db.collection("bi-week").doc(result.id).set({id: result.id, date: result.date});
  }
  console.log(res);
  return res;
}

async function updateBiweek(result) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  // Add a new document in collection "moodtrack" with ID 'test'
  console.log(result.id);
  console.log(result.date);
  const userRef = db.collection("bi-week");
  let res = [];
  const snapshot = await userRef.where("id", "==", result.id).get();
  if (!snapshot.empty) {
    res = await db.collection("bi-week").doc(result.id).update({date: result.date});
  }
  // console.log(res);
  return res;
}

async function getUserFirstTime(id) {
  var admin = require("firebase-admin");
  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const gratitude = db.collection("users");
  const snapshot = await gratitude.where("id", "==", id).get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return "";
  }
  let arr = [];
  snapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  console.log(arr);
  return arr;
}

async function getBiweek(id) {
  var admin = require("firebase-admin");
  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const biweek = db.collection("bi-week");
  const snapshot = await biweek.where("id", "==", id).get();
  if (snapshot.empty) {
    console.log("No matching documents.");
    return "";
  }
  let arr = [];
  snapshot.forEach((doc) => {
    arr.push(doc.data());
  });
  console.log(arr);
  return arr;
}

module.exports = { addUsers, addBiweek, updateBiweek, getUserFirstTime, getBiweek };
