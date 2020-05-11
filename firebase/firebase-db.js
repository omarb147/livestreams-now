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

const addCollection = async (collection, data) => {
  db.collection(collection)
    .add(data)
    .then((ref) => {
      // On a successful write, return an object
      // containing the new doc id.
    })
    .catch((err) => {
      // Forward errors if the write fails
      console.log();
      callback(err);
    });
};

module.exports = {
  getAllDataFromCollection,
  addCollection,
};
