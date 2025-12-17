const db = require('../config/db');

// Get all campaigns
exports.getCampaigns = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT c.*, u.name as owner_name 
            FROM campaigns c 
            LEFT JOIN users u ON c.owner_id = u.id 
            ORDER BY c.updated_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create campaign
exports.createCampaign = async (req, res) => {
    const { title, description, status, type, start_date, end_date, budget } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO campaigns (title, description, status, type, start_date, end_date, budget, owner_id) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [title, description, status || 'planning', type, start_date, end_date, budget, req.user.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get single campaign Details (with tasks)
exports.getCampaignById = async (req, res) => {
    try {
        const campResult = await db.query('SELECT * FROM campaigns WHERE id = $1', [req.params.id]);
        if (campResult.rows.length === 0) return res.status(404).json({ msg: 'Campaign not found' });

        const tasksResult = await db.query('SELECT * FROM tasks WHERE campaign_id = $1', [req.params.id]);

        res.json({ ...campResult.rows[0], tasks: tasksResult.rows });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateCampaign = async (req, res) => {
    // Basic update logic implementation
    // For full implementation, would dynamically build update query based on body fields
    const { title, status, progress } = req.body;
    try {
        const result = await db.query(
            'UPDATE campaigns SET title = $1, status = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
            [title, status, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
