const sqlite3 = require('sqlite3').verbose();
const bd = new sqlite3.Database('YouSNP.db');


bd.serialize(() => {
    bd.run("PRAGMA foreign_keys=ON");
});

process.on('SIGINT', () =>
    bd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

module.exports = bd;