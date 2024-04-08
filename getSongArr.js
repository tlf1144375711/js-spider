const fs = require('fs')
const batchDownload = require('./getMusic');



const arr = []

const data = fs.readFileSync('songs.txt', 'UTF-8');

// split the contents by new line
const lines = data.split(/\r?\n/);

// print all lines
lines.forEach((line) => {
    arr.push(line)
});
// console.log(arr)
module.exports = arr