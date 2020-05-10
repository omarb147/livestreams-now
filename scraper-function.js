const chromium = require("chrome-aws-lambda");
const headers = require("./utils/headers");
const middy = require("/opt/middy-wrapper");

const main = async (event) => {
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

  await browser.close();
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      result,
    }),
  };
};

exports.handler = middy(main);
