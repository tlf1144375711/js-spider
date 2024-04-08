globalThis.pre = 'https://www.hifini.com/get_music.php?';
const puppeteer = require('puppeteer');
const fs = require('node:fs')
const axios = require('axios')
const arr = require('./getSongArr')

async function getMusicUrl(url) {
    const browser = await puppeteer.launch({ headless: true, slowMo: 0, })
    const page = await browser.newPage()
    await page.goto(url)
    await page.waitForSelector('.aplayer-title')
    const title = await page.$eval('.aplayer-title', res => res.innerHTML)
    // console.log(title)
    let musicUrl = await page.$eval('html', res => res.innerHTML)
    musicUrl = pre + musicUrl.slice(musicUrl.indexOf('key='), musicUrl.indexOf("pic: '")).trimEnd().slice(0, - 2)
    // console.log(musicUrl)
    await browser.close()
    const music = {}
    music.title = title
    music.url = musicUrl
    return music
};

// ; (async function () {
//     const url = process.argv[2]
//     const music = await getMusicUrl(url)
//     axios({
//         method: 'get',
//         url: music.url,
//         responseType: 'stream'
//     })
//         .then(function (response) {
//             response.data.pipe(fs.createWriteStream(music.title + '.mp3'))
//         });
// })();

async function batchDownload(url) {
    const music = await getMusicUrl(url)
    axios({
        method: 'get',
        url: music.url,
        responseType: 'stream'
    })
        .then(function (response) {
            response.data.pipe(fs.createWriteStream(music.title + '.mp3'))
        });
}


; (async function () {
    for (url of arr) {
        batchDownload(url)
    }
})();


