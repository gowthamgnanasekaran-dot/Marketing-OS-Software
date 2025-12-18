const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

// Create/Open the database file
const dbPath = path.resolve(__dirname, '../marketing_os.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error('Error opening database:', err);
    else console.log('Connected to SQLite database at', dbPath);
});

// Helper to sanitize queries ($1 -> ?)
function convertQuery(text) {
    let index = 1;
    return text.replace(/\$\d+/g, () => '?');
}

module.exports = {
    query: (text, params = []) => {
        const sql = convertQuery(text);
        return new Promise((resolve, reject) => {
            // Determine if it's a SELECT or a WRITE
            const method = text.trim().toUpperCase().startsWith('SELECT') ? 'all' : 'run';

            db[method](sql, params, function (err, rows) {
                if (err) {
                    console.error('SQL Error:', err.message, 'Query:', text);
                    return reject(err);
                }
                // emulate pg response. 'this' contains changes/lastID for run()
                if (method === 'run') {
                    resolve({ rows: [], rowCount: this.changes, command: 'CMD' });
                } else {
                    resolve({ rows: rows || [], rowCount: (rows || []).length });
                }
            });
        });
    },
    client: db
};
