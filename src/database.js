const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('socialmarket.db');

module.exports = {
    db: db,
};


