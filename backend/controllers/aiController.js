const db = require('../config/db');

// Mock AI Logic (In real world, this would call OpenAI/Gemini API)
exports.generatePlan = async (req, res) => {
    const { prompt } = req.body;

    // Simulate Processing time
    // setTimeout(() => {}, 1000);

    // Simple Rule-Based AI Logic for Demo
    const isLaunch = prompt.toLowerCase().includes('launch');
    const isWebinar = prompt.toLowerCase().includes('webinar');

    const generatedTitle = isLaunch ? 'New Product Launch Campaign' : (isWebinar ? 'Industry Trends Webinar' : 'Demand Gen Campaign');
    const generatedType = isLaunch ? 'launch' : (isWebinar ? 'webinar' : 'content');

    // 1. Create Campaign in DB
    try {
        const campResult = await db.query(
            `INSERT INTO campaigns (title, description, type, status, owner_id)
             VALUES ($1, $2, $3, 'planning', $4) RETURNING *`,
            [generatedTitle, `AI Generated plan for: ${prompt}`, generatedType, req.user.id]
        );
        const newCamp = campResult.rows[0];

        // 2. Generate Standard Tasks based on Type
        let tasks = [];
        if (isLaunch) {
            tasks = ['Define Target Audience', 'Draft Messaging', 'Design Assets', 'Setup Landing Page', 'Launch Email Sequence'];
        } else {
            tasks = ['Topic Research', 'Speaker Invite', 'Promo Graphics', 'Social Posts', 'Follow-up Email'];
        }

        // 3. Insert Tasks
        for (const title of tasks) {
            await db.query(
                `INSERT INTO tasks (title, campaign_id, column_id, assignee_id) VALUES ($1, $2, 1, $3)`,
                [title, newCamp.id, req.user.id]
            );
        }

        res.json({
            status: 'success',
            campaign: newCamp,
            tasks_created: tasks.length
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'AI Generation Failed' });
    }
};
