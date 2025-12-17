const db = require('../config/db');

exports.getEvents = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM events ORDER BY date ASC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEvent = async (req, res) => {
    const { title, type, date, location, registrants_goal, campaign_id } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO events (title, type, date, location, registrants_goal, campaign_id, status)
             VALUES ($1, $2, $3, $4, $5, $6, 'planning') RETURNING *`,
            [title, type, date, location, registrants_goal, campaign_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEvent = async (req, res) => {
    const { title, date, status, registrants_count } = req.body;
    try {
        const result = await db.query(
            `UPDATE events SET title = COALESCE($1, title), date = COALESCE($2, date), 
             status = COALESCE($3, status), registrants_count = COALESCE($4, registrants_count)
             WHERE id = $5 RETURNING *`,
            [title, date, status, registrants_count, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        await db.query('DELETE FROM events WHERE id = $1', [req.params.id]);
        res.json({ message: 'Event deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
