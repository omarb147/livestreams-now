const middy = require("/opt/middy-wrapper");
const headers = require("../utils/headers");
const firebaseRef = require('firebase/firebase-db');

const main = async () => {
    const dbData = await firebaseRef.getAllDataFromCollection('cities');
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify(dbData)
    };
}
exports.handler = middy(main);
