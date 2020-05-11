let admin = require("firebase-admin");

const serviceAccount = require("../firebaseConfig.json");

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
const addMultipleDocuments = async (data, collection) => {
  return await data.forEach((doc) => {
    addSingleDocument(collection, doc);
  });
};

// SEARCH DB COLLECTIONS
const searchCollections = async (collection, field, searchText) => {
  try {
    let response = await db
      .collection(collection)
      .where(field, "==", searchText)
      .get();
    if (response.empty) {
      console.log("-----------search return empty. add new data.");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

// VALIDATE AND ADD NEW ENTRIES TO DB
const addFilteredDocuments = async (fieldToCheck, data, collection) => {
  try {
    data.forEach(async (doc) => {
      let searchText = doc[fieldToCheck];
      let dataInDatabase = await searchCollections(
        collection,
        fieldToCheck,
        searchText
      );
      console.log(dataInDatabase);
      if (dataInDatabase == true) {
        console.log(`--->added ${searchText} to firebase`);
        await addSingleDocument(collection, doc);
      }
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = {
<<<<<<< HEAD
  getAllDataFromCollection,
  addSingleDocument,
  addMultipleDocuments,
  searchCollections,
  addFilteredDocuments,
=======
  getAllDataFromCollection
>>>>>>> Setup Lambda Function For Firebase Get Request
};
