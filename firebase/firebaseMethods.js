"use-strict";

let admin = require("firebase-admin");
let jambaseScrape = require("./jambaseResponse.json");
const serviceAccount = require("../firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gs-livestream.firebaseio.com",
});

const db = admin.firestore();

const addCollection = async (collection, data) => {
  try {
    return await db.collection(collection).add(data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

const searchDatabase = async (collection, field, searchText) => {
  let response = await db
    .collection(collection)
    .where(field, "==", searchText)
    .get();
  if (response.empty) {
    console.log("-----------search return empty");
    return true;
  } else {
    console.log("------existing field found");
    return false;
  }
};

const addAllData = (collection) => {
  let field = "artist";
  jambaseScrape.forEach(async (data) => {
    let searchText = data.artist;
    let dataInDatabase = await searchDatabase(collection, field, searchText);
    console.log(dataInDatabase);
    if (dataInDatabase == true) {
      console.log(`--->added ${searchText} to firebase`);
      await addCollection(collection, data);
    }
  });
};

const uploadTofirebase = (collection) => {
  jambaseScrape.forEach(async (data) => {
    await addCollection("jambaseStreams", data);
  });
};

const main = async () => {
  let collection = "jambaseStreams";
  addAllData(collection);
};
main();
