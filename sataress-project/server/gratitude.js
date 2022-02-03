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
  
async function getGratitude(id) {
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
  snapshot.forEach((doc) => {
    grat_arr.push(doc.data().gratitude);
  });
  grats_dict = grat_arr.reduce((acc, val) => {
    acc[val] = acc[val] === undefined ? 1 : (acc[val] += 1);
    return acc;
  }, {});

  for (const [text, value] of Object.entries(grats_dict)) {
    res.push({text, value});
  }
  console.log(res);
  return res;
}

module.exports = {addGratitude, getGratitude};
  