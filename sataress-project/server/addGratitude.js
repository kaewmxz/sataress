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
  
  module.exports = addGratitude;
  