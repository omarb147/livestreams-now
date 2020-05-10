const chromium = require("chrome-aws-lambda");
const headers = require("./utils/headers");
const middy = require("/opt/middy-wrapper");
const getJambaseData = require("./websites/scrapeJambase");
const firebaseConfig = require("./config/db.config");

var firebase = require("firebase");
var app = firebase.initializeApp(firebaseConfig);

async function getdata() {
  return app
    .firestore()
    .collection("scrapedData")
    .get()
    .then((data) => data.data());
}

const main = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
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
  const test = await getdata();
  console.log(test);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(test),
  };
};

exports.handler = middy(main);
