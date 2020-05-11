module.exports = async (browser, targetURL) => {
  const page = await browser.newPage();
  await page.goto(targetURL);
  await page.waitForSelector("h4");

  let ticketMasterStreams = await page.evaluate(() => {
    function getStreamTime(validatedLiveStream, liveStream) {
      const startOfTime = validatedLiveStream.lastIndexOf("<br") - 5;
      const endOfTime = validatedLiveStream.lastIndexOf("<br");
      const liveStreamTime = validatedLiveStream.slice(startOfTime, endOfTime);
      if (parseInt(liveStreamTime)) {
        liveStream.time = liveStreamTime;
      }
    }

    function getArtistName(validatedLiveStream, liveStream) {
      const startOfArtistName = validatedLiveStream.indexOf("/strong>") + 8;
      const endOfArtistName = validatedLiveStream.indexOf("<br");
      const artist = validatedLiveStream.slice(
        startOfArtistName,
        endOfArtistName
      );
      liveStream.artist = artist;
    }

    function getStreamLink(validatedLiveStream, liveStream) {
      const startOfLink = validatedLiveStream.indexOf('a href="') + 8;
      const endOfLink = validatedLiveStream.indexOf('target="') - 2;
      const liveStreamLink = validatedLiveStream.slice(startOfLink, endOfLink);
      liveStream.linkToStream = liveStreamLink;
    }

    const liveStreams = [];
    const liveStreamEvents = Array.from(document.querySelectorAll("p"));
    const liveStreamsOuterHTML = liveStreamEvents.map((liveStreamElement) => {
      return liveStreamElement.outerHTML;
    });
    let validatedLiveStreams = liveStreamsOuterHTML.filter((liveStream) => {
      const regexTest = /<strong>/;
      if (liveStream.includes("Artist:")) {
        return regexTest.test(liveStream);
      }
    });

    validatedLiveStreams.forEach((validatedLiveStream) => {
      let liveStream = { artist: "", time: "", linkToStream: "" };
      getStreamTime(validatedLiveStream, liveStream);
      getArtistName(validatedLiveStream, liveStream);
      getStreamLink(validatedLiveStream, liveStream);
      liveStreams.push(liveStream);
    });
    return liveStreams;
  });
  return ticketMasterStreams;
};
