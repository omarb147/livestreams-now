module.exports = async (browser, targetURL) => {
  const page = await browser.newPage();
  await page.goto(targetURL);
  await page.waitForSelector("h4");
  await page.addScriptTag({
    url: "https://code.jquery.com/jquery-3.2.1.min.js",
  });

  let ticketMasterStreams = await page.evaluate(() => {
    const $ = window.$; //otherwise the transpiler will rename it and won't work
    const data = [];
    $("h4").each((index, dateElement) => {
      const dateValue = $(dateElement).text().trim();

      $(dateElement)
        .nextUntil("h4")
        .filter("p")
        .each((index, livestream) => {
          $(livestream).find("strong").remove();
          if ($(livestream).text() !== "") {
            const rawData = $(livestream).text().split("\n");
            const title = rawData[0];
            const time = rawData[1];
            const platform = rawData[3] !== "More Info" ? rawData[3] : "";
            const livestreamUrl = $(livestream).find("a").attr("href");

            data.push({ title, time, platform, dateValue, livestreamUrl });
          }
        });
    });

    return data;
  });
  return ticketMasterStreams;
};
