const db = require('../config/db');

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT t.*, u.name as assignee_name, c.title as campaign_title
            FROM tasks t
            LEFT JOIN users u ON t.assignee_id = u.id
            LEFT JOIN campaigns c ON t.campaign_id = c.id
            ORDER BY t.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create task
exports.createTask = async (req, res) => {
    const { title, campaign_id, column_id, priority, due_date, assignee_id, tags } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO tasks (title, campaign_id, column_id, priority, due_date, assignee_id, tags)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [title, campaign_id, column_id || 1, priority, due_date, assignee_id, tags]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Move task (Drag & Drop persistence)
exports.moveTask = async (req, res) => {
    const { column_id } = req.body;
    try {
        const result = await db.query(
            'UPDATE tasks SET column_id = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [column_id, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
