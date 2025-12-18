const db = require('../config/db');

exports.getReports = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM reports ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createReport = async (req, res) => {
    const { title, type, config } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO reports (title, type, config, created_by) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, type, config, req.user.id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getReportById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM reports WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Report not found' });
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteReport = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM reports WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Report not found' });
        res.json({ message: 'Report deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
