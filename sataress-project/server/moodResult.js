// const {
//   initializeApp,
//   applicationDefault,
//   cert,
// } = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

// async function initializeAppWithProjectId() {
//   // [START firestore_setup_client_create]
//   const firebaseConfig = {
//     apiKey: "AIzaSyB4Jdub6rsHGvRgbDWE54jsYlL1RZrt4Ms",
//     authDomain: "senior-project-105f0.firebaseapp.com",
//     projectId: "senior-project-105f0",
//     storageBucket: "senior-project-105f0.appspot.com",
//     messagingSenderId: "135782512554",
//     appId: "1:135782512554:web:3afd66dab4be67d4ca9dd3",
//     measurementId: "G-2X4JEP8GJ1",
//   };

//   initializeApp(firebaseConfig);
//   const db = getFirestore();
//   // [END firestore_setup_client_create]
//   return db;
// }

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

module.exports = saveMood;
