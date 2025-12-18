const db = require('../config/db');

exports.getAssets = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM creative_assets ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAsset = async (req, res) => {
    const { title, file_url, file_type, file_size_mb, folder_path, campaign_id, status } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO creative_assets 
            (title, file_url, file_type, file_size_mb, folder_path, campaign_id, status, uploaded_by) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`,
            [title, file_url, file_type, file_size_mb, folder_path || '/', campaign_id, status || 'draft', req.user.id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAsset = async (req, res) => {
    const { id } = req.params;
    const { title, status, version } = req.body;
    try {
        const result = await db.query(
            'UPDATE creative_assets SET title = COALESCE($1, title), status = COALESCE($2, status), version = COALESCE($3, version) WHERE id = $4 RETURNING *',
            [title, status, version, id]
        );
        if (result.rows.length === 0) return res.status(404).json({ error: 'Asset not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAsset = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM creative_assets WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Asset not found' });
        res.json({ message: 'Asset deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
