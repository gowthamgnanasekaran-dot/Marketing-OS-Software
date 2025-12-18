const db = require('./config/db');
const bcrypt = require('bcryptjs');

async function seed() {
    try {
        const hashedPassword = await bcrypt.hash('password123', 10);

        // Check if user exists
        const check = await db.query("SELECT * FROM users WHERE email = 'demo@marketingos.com'");
        if (check.rows.length > 0) {
            console.log('User already exists');
            process.exit(0);
        }

        const result = await db.query(
            "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
            ['Demo Admin', 'demo@marketingos.com', hashedPassword, 'admin']
        );
        console.log('User Created:', result.rows[0]);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

seed();
