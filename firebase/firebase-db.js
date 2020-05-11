let admin = require("firebase-admin");

const serviceAccount = require("../firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gs-livestream.firebaseio.com",
});

const db = admin.firestore();

const getAllDataFromCollection = async (collection) => {
  const data = [];
  try {
    const snapshot = await db.collection(collection).get();
    snapshot.forEach((doc) => data.push(doc.data()));
    return data;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllDataFromCollection,
};
