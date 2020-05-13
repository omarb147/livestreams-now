function scrapeLivestreams($) {
  const source = "Jambase";
  const results = [];

  $(".streams-list.js-stickybit-parent").each((index, section) => {
    const date = $(section)
      .find("h2")
      .clone()
      .children()
      .remove()
      .end()
      .text()
      .trim();
    results.push(date);

    $(section)
      .find("[id*='list-post']")
      .each((index, streamDetails) => {
        const imageUrl = $(streamDetails).find("img").attr("src");
        const title = $(streamDetails).find("h3").text().trim();
        const description = $(streamDetails).find("h4").text().trim();
        const extra = $(streamDetails).find("p").text().trim();
        const livestreamUrl = $(streamDetails).find(".link-show").attr("href");
        const time = $(streamDetails)
          .find("ul")
          .children()
          .first()
          .text()
          .trim();
        const price = $(streamDetails)
          .find("ul")
          .children()
          .last()
          .text()
          .trim();

        results.push({
          title,
          description,
          imageUrl,
          date,
          extra,
          time,
          price,
          source,
          livestreamUrl,
        });
      });
  });

  return results;
}

module.exports = async (browser, targetURL) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  // prep For scraping the first page
  await page.goto(targetURL);
  await page.waitForSelector("div.article-content");
  await page.addScriptTag({
    url: "https://code.jquery.com/jquery-3.2.1.min.js",
  });
  let data = [];
  // // Add ScriptTag for function
  await page.addScriptTag({ content: `${scrapeLivestreams}` });

  // Scrape Today's Livestreams page
  const firstPage = await page.evaluate(() => {
    const $ = window.$; //otherwise the transpiler will rename it and won't work
    return window.scrapeLivestreams($);
  });

  // Prep for scraping the second page
  await Promise.all([
    page.waitForNavigation(),
    await page.evaluate(() => $("a:contains(Tomorrow & Beyond)")[0].click()),
    await page.waitForSelector("div.article-content"),
    await page.addScriptTag({
      url: "https://code.jquery.com/jquery-3.2.1.min.js",
    }),
  ]);

  await page.addScriptTag({ content: `${scrapeLivestreams}` });
  const secondPage = await page.evaluate(() => {
    const $ = window.$; //otherwise the transpiler will rename it and won't work
    return window.scrapeLivestreams($);
  });

  return [...firstPage, ...secondPage];
};
