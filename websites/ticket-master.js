module.exports = async (browser, targetURL) => {
  const page = await browser.newPage();
  await page.goto(targetURL);
  await page.waitForSelector("h4");
  await page.addScriptTag({
    url: "https://code.jquery.com/jquery-3.2.1.min.js",
  });

  let ticketMasterStreams = await page.evaluate(() => {
    const $ = window.$; //otherwise the transpiler will rename it and won't work
    const source = "ticketmaster";
    const data = [];
    $("h4").each((index, dateElement) => {
      const dateValue = $(dateElement).text().trim();

      $(dateElement)
        .nextUntil("h4")
        .filter("p")
        .each((index, livestream) => {
          $(livestream).find("strong").remove();
          if ($(livestream).text() !== "") {
            const rawData = $(livestream).text().trim().split("\n");
            const title = rawData[0];
            const time = rawData[1];
            const platform = rawData[2] !== "More Info" ? rawData[2] : "";
            const livestreamUrl = $(livestream).find("a").attr("href");
            // Appears to be some events at the bottom of the page with long descriptions, generally these don't have date
            if (livestreamUrl) {
              data.push({
                title,
                time,
                platform,
                date: dateValue,
                livestreamUrl,
                source,
              });
            }
          }
        });
    });

    return data;
  });
  return ticketMasterStreams;
};
