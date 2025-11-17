const fs = require('fs');
const dir = './data';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const file = './data/blockchains.json';
if (!fs.existsSync(file)) fs.writeFileSync(file, '{}');

function loadBlockchains() {
    return JSON.parse(fs.readFileSync(file));
}

function saveBlockchains(data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = { loadBlockchains, saveBlockchains };
