let admin = require("firebase-admin");

const serviceAccount = require("../config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gs-livestream.firebaseio.com",
});

const db = admin.firestore();

// GET ALL DATA FROM DB
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

// ADD SINGLE DOC TO DB
const addSingleDocument = async (collection, data) => {
  try {
    return await db.collection(collection).add(data);
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ADD MULTIPLE DOCS TO DB
const addMultipleDocuments = (collection) => {
  jambaseScrape.forEach(async (data) => {
    await addSingleDocument("jambaseStreams", data);
  });
};

// SEARCH DB COLLECTIONS
const searchCollections = async (collection, field, searchText) => {
  let response = await db
    .collection(collection)
    .where(field, "==", searchText)
    .get();
  if (response.empty) {
    return true;
  } else {
    return false;
  }
};

// VALIDATE AND ADD NEW ENTRIES TO DB
const addFilteredDocuments = (collection) => {
  let field = "artist";
  jambaseScrape.forEach(async (data) => {
    let searchText = data.artist;
    let dataInDatabase = await searchCollections(collection, field, searchText);
    console.log(dataInDatabase);
    if (dataInDatabase == true) {
      console.log(`--->added ${searchText} to firebase`);
      await addSingleDocument(collection, data);
    }
  });
};

module.exports = {
  getAllDataFromCollection,
  addSingleDocument,
  addMultipleDocuments,
  searchCollections,
  addFilteredDocuments,
};
