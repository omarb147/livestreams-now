module.exports = async (browser, targetURL) => {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(targetURL);
  await page.waitForSelector("div.article-content");

  const data = await page.evaluate(() => {
    const callQuerySelector = (item, element, property) =>
      item.querySelector(element) ? item.querySelector(element)[property] : "";
    let results = [];
    let items = document.querySelectorAll(
      ".streams-list.js-stickybit-parent >ul >li >div.item-wrap >div.col-content"
    );
    try {
      items.forEach((item) => {
        let artist = callQuerySelector(item, "h3", "innerText");
        let description = callQuerySelector(item, "p", "innerText");
        let url = callQuerySelector(item, "a", "href");
        let time = callQuerySelector(item, "ul li:first-child", "innerText");

        results.push({
          artist,
          description,
          source: url,
          date: time,
        });
      });
    } catch (error) {
      throw new Error(error);
    }
    return results;
  });
  return data;
};
