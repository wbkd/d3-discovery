/* eslint-disable */
const fs = require('fs');
const path = require('path');

const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');

const dataPath = path.resolve(__dirname, '../../static/data.json');
const data = require(dataPath);

let browser;

async function run(data, page, currentIndex) {
  if (currentIndex === data.length) {
    await browser.close();
    return false;
  }

  const url = data[currentIndex].homepage || '';

  console.log("url", url);
  if (url && url.substr(0, 4) === 'http') {
    try {
      await page.emulate(devices['iPhone 6 landscape']);
      await page.goto(url);

      const filename = path.resolve(__dirname, `../../images/${data[currentIndex].name}.jpeg`);

      await page.screenshot({ path: filename, quality: 80 });
      run(data, page, currentIndex + 1);
    } catch (err) {
      console.error(`Error fetching page for ${url}`, err);
      run(data, page, currentIndex + 1);
    }
  } else {
    run(data, page, currentIndex + 1);
  }
};

async function main() {
  browser = await puppeteer.launch();
  const page = await browser.newPage();

  run(data, page, 0)
}

main();

module.exports = main;