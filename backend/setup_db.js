const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const config = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'your_password',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
};

async function setup() {
    // 1. Connect to default 'postgres' database to create new DB
    console.log('Connecting to PostgreSQL...');
    const client = new Client({ ...config, database: 'postgres' });

    try {
        await client.connect();

        // Check if DB exists
        const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'marketing_os'");
        if (res.rows.length === 0) {
            console.log('Creating database marketing_os...');
            await client.query('CREATE DATABASE marketing_os');
        } else {
            console.log('Database marketing_os already exists.');
        }
        await client.end();

        // 2. Connect to 'marketing_os' to run Schema
        console.log('Applying Schema...');
        const dbClient = new Client({ ...config, database: 'marketing_os' });
        await dbClient.connect();

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');

        await dbClient.query(schemaSql);
        console.log('Schema applied successfully.');

        await dbClient.end();
        console.log('Setup Complete.');

    } catch (err) {
        console.error('Setup Failed:', err);
        if (err.code === '28P01') {
            console.error('\nERROR: Password authentication failed. Please update backend/.env with the password you set during PostgreSQL installation.');
        }
        process.exit(1);
    }
}

setup();
