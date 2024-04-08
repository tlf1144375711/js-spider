const puppeteer = require('puppeteer');
const fs = require('fs')
globalThis.cookies = [{ name: 'bbs_sid', value: 'b26ordr6i2jm3jjgb0q9r3br88' }, { name: 'bbs_token', value: 'WN4FgOBrmaeumX10W_2Bsmm4bea_2FNvCp1B12F1K87Gt0sLMdakJP9MIH_2Fwlb5bOwFKgKuBpecMo2_2BPmUSACj_2FqvvNiXfgETOXV' }]
async function getMusicList(i) {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto('https://www.hifini.com/')
    await page.setCookie(cookies[0], cookies[1])
    await page.goto('https://www.hifini.com/my-favorite-' + i + '.htm')
    await page.waitForSelector('.card-body')
    const ids = await page.$$eval('.media', (tmp) => {
        const ids = []
        tmp.forEach(element => {
            ids.push(element.getAttribute('data-tid'))
        })
        return ids
    })
    await browser.close()
    return ids
}

; (async function () {
    fs.unlink('songs.txt', (err) => {
        if (err) return
        console.log('songs.txt removed')
    })
    const allArrlist = []
    for (let i = 1; i < 11; i++) {
        const ids = await getMusicList(i)
        for (id of ids) {
            allArrlist.push(id)
        }
    }

    for (i in allArrlist) {
        allArrlist[i] = 'https://www.hifini.com/thread-' + allArrlist[i] + '.htm'
        fs.appendFileSync('songs.txt', allArrlist[i] + '\n')
    }
})()
