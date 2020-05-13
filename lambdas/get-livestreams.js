require("module-alias/register");
const paths = require("../utils/pathVars");
const middy = require(`${paths.COMMON_MODULE_LAYER_PATH}middy-wrapper`);
const headers = require("../utils/headers");
const firebaseRef = require("../firebase/firebase-db");

const main = async (event) => {
  const dbData = await firebaseRef.getAllDataFromCollection(
    process.env.DB_NAME
  );
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(dbData),
  };
};
exports.handler = middy(main);
