const db = require('../config/db');

exports.getIntegrations = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM mop_integrations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createUTM = async (req, res) => {
    const { original_url, source, medium, campaign_name } = req.body;
    const final_url = `${original_url}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign_name}`;

    try {
        const result = await db.query(
            `INSERT INTO utm_links (original_url, source, medium, campaign_name, final_url, created_by)
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
            [original_url, source, medium, campaign_name, final_url, req.user.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUTMHistory = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM utm_links ORDER BY created_at DESC LIMIT 50');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
