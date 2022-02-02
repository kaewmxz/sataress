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
    const userRef = db.collection("users").doc(result.id);
    const res = await userRef.set(result, {merge : true});
  
    return res;
  }
  
  module.exports = addUsers;
  