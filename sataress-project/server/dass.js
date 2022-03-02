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

async function saveDass(result) {
  var admin = require("firebase-admin");

  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  // Add a new document in collection "dass21" with ID ''
  const res = await db.collection("dass21").add(result);

  return res;
}

async function getDassFirstTime(id) {
  var admin = require("firebase-admin");
  var serviceAccount = require("./configs/senior-project-105f0-firebase-adminsdk-n6vca-2612fcc05a.json");

  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  const db = getFirestore();
  const gratitude = db.collection("dass21");
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
module.exports = { saveDass, getDassFirstTime };
