const chromium = require("chrome-aws-lambda");
const headers = require("./utils/headers");

exports.handler = async (event) => {
  let browser = null;

  browser = await chromium.puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const targetUrl = event.queryStringParameters.url;

  const page = await browser.newPage();
  // await page.setViewport({ width: 1920, height: 1080 });
  await page.goto(targetUrl, {
    waitUntil: ["domcontentloaded", "networkidle2"],
  });
  // TODO: Implement a switch/ if statement, which allows you to do different actions depending on the url we are scraping
  const content = await page.evaluate(() => document.body.innerHTML);
  await browser.close();
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      content,
    }),
  };
};
