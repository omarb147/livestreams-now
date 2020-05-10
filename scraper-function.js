const chromium = require("chrome-aws-lambda");
const headers = require("./utils/headers");
const middy = require("/opt/middy-wrapper");
const getJambaseData = require("./websites/scrapeJambase");

var admin = require("firebase-admin");
var serviceAccount = require("./config/config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gs-livestream.firebaseio.com",
});

const db = admin.firestore();

const main = async (event) => {
  // let browser = null;
  // let result = null;

  // browser = await chromium.puppeteer.launch({
  //   args: chromium.args,
  //   defaultViewport: chromium.defaultViewport,
  //   executablePath: await chromium.executablePath,
  //   headless: true,
  //   ignoreHTTPSErrors: true,
  // });

  // const targetUrl = event.queryStringParameters.url;
  // if (targetUrl.includes("ticketmaster.com")) {
  //   // TODO: function which takes the browser as an input to do whatever
  //   result = "ticketMaster";
  // } else if (targetUrl.includes("jambase.com")) {
  //   // TODO : function which takes the browser as an input to do whatever
  //   result = await getJambaseData(browser, targetUrl);
  // }

  // await browser.close();

  const data = {
    message: "Hello, world!",
  };

  await db
    .collection("lambda-docs-test")
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

  const test = await db
    .collection("lambda-docs-test")
    .get()
    .then((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    })
    .catch((err) => {
      // Forward errors if the write fails
      console.log(err);
      callback(err);
    });

  console.log(test);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(test),
  };
};

exports.handler = main;
