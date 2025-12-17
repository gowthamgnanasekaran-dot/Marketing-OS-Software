const db = require('../config/db');

exports.getPosts = async (req, res) => {
    try {
        const result = await db.query(`
            SELECT s.*, u.name as author_name 
            FROM social_posts s
            LEFT JOIN users u ON s.author_id = u.id
            ORDER BY s.created_at DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPost = async (req, res) => {
    const { channel, content, scheduled_time, campaign_id } = req.body;
    try {
        const result = await db.query(
            `INSERT INTO social_posts (channel, content, scheduled_time, campaign_id, author_id, status)
             VALUES ($1, $2, $3, $4, $5, 'draft') RETURNING *`,
            [channel, content, scheduled_time, campaign_id, req.user.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.approvePost = async (req, res) => {
    try {
        const result = await db.query(
            "UPDATE social_posts SET status = 'approved', updated_at = NOW() WHERE id = $1 RETURNING *",
            [req.params.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await db.query('DELETE FROM social_posts WHERE id = $1', [req.params.id]);
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
