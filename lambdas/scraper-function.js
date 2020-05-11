// EXTERNAL PACKAGES
const chromium = require("chrome-aws-lambda");
// LAYER PACKAGES
const middy = require("/opt/middy-wrapper");
// UTILITY FUNCTIONS
const headers = require("../utils/headers");
const {
  getAllDataFromCollection,
  addFilteredDocuments,
} = require("../firebase/firebase-db");
// PUPPETEER FUNCTIONS
const getJambaseData = require("../websites/scrapeJambase");
const getTicketMasterData = require("../websites/ticket-master");

const main = async (event) => {
  let browser = null;
  let result = null;
  let dbCollection = null;

  browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const targetUrl = event.queryStringParameters.url;
  if (targetUrl.includes("ticketmaster.co.uk")) {
    // TODO: function which takes the browser as an input to do whatever
    result = await getTicketMasterData(browser, targetUrl);
    dbCollection = process.env.TICKETMASTER_DB;
  } else if (targetUrl.includes("jambase.com")) {
    // TODO : function which takes the browser as an input to do whatever
    result = await getJambaseData(browser, targetUrl);
    dbCollection = process.env.JAMBASE_DB;
  }

  await browser.close();

  await addFilteredDocuments("artist", result, dbCollection);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(result),
  };
};

exports.handler = middy(main);
