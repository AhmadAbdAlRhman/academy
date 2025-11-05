// utils/hash.js
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hash(text) {
    return await bcrypt.hash(text, saltRounds);
}

async function compare(text, hash) {
    return await bcrypt.compare(text, hash);
}

module.exports = {
    hash,
    compare
};