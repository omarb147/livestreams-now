const chromium = require("chrome-aws-lambda");
const headers = require("./utils/headers");
const AWS = require("aws-sdk");
const uuid = require("uuid").v4;

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  let browser = null;
  let result = null;

  browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const targetUrl = event.queryStringParameters.url;
  if (targetUrl.includes("ticketmaster.com")) {
    // TODO: function which takes the browser as an input to do whatever
    result = "ticketMaster";
  } else if (targetUrl.includes("jambase.com")) {
    // TODO : function which takes the browser as an input to do whatever
    result = "jambase";
  }
  const params = {
    TableName: process.env.LIVESTREAMS_TABLENAME,
    Item: {
      id: uuid(),
      artist: "Drake",
      date: new Date(),
      imageUrl: "https://google.com",
    },
  };
  console.log(params);
  dynamodb.put(params, (err, data) => {
    if (err) {
      console.log(err);
    }
  });

  await browser.close();
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      result,
    }),
  };
};
