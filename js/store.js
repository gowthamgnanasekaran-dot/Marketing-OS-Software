window.StorageManager = {
    save(key, data) {
        localStorage.setItem('marketing_os_' + key, JSON.stringify(data));
    },
    load(key, fallback) {
        const data = localStorage.getItem('marketing_os_' + key);
        return data ? JSON.parse(data) : fallback;
    },
    clear() {
        localStorage.clear();
    }
};

/**
 * Enhanced Store with LocalStorage Persistence
 */
const Store = {
    state: {
        user: { id: 1, name: 'Gowtham G.', role: 'CMO', avatar: 'G' },

        // Load from LS or use Defaults
        campaigns: window.StorageManager.load('campaigns', [
            { id: 1, title: 'Enterprise v2.0 Global Rollout', type: 'launch', status: 'running', progress: 75, due: '2025-10-24', owner: 'Sarah J.', budget: 120000, description: 'Global launch of the new V2 platform.' },
            { id: 2, title: 'Q3 Demand Gen Webinar Series', type: 'webinar', status: 'planning', progress: 35, due: '2025-11-12', owner: 'Mike R.', budget: 45000, description: 'Series of 3 webinars on AI.' },
            { id: 3, title: 'Website Rebrand 2026', type: 'content', status: 'active', progress: 10, due: '2026-01-15', owner: 'Lisa K.', budget: 85000, description: 'Overhaul of home and pricing pages.' }
        ]),

        tasks: window.StorageManager.load('tasks', [
            { id: 1, title: 'Draft Q3 Press Release', tag: 'PR', col: 'todo', due: '2025-10-18', user: 'S', color: 'purple', priority: 'high', campaignId: 2, description: 'Draft the initial press release for the Q3 webinar series focusing on key AI features.' },
            { id: 2, title: 'Update LinkedIn Banner', tag: 'Social', col: 'todo', due: '2025-10-20', user: 'M', color: 'blue', priority: 'medium', campaignId: 1, description: 'Create new banner assets matching the V2 branding guidelines.' },
            { id: 3, title: 'Review Competitor Ads', tag: 'Strategy', col: 'progress', due: '2025-10-22', user: 'G', color: 'orange', priority: 'low', campaignId: 3, description: 'Analyze top 3 competitors ad spend and creative strategy.' },
            { id: 4, title: 'Finalize Event Budget', tag: 'Events', col: 'review', due: '2025-10-16', user: 'L', color: 'green', priority: 'urgent', campaignId: 1, description: 'Lock in the final budget numbers for the NY launch event.' },
            { id: 5, title: 'Send Newsletter', tag: 'Email', col: 'done', due: '2025-10-15', user: 'S', color: 'purple', priority: 'medium', campaignId: 2, description: 'Weekly newsletter dispatch.' }
        ]),

        socialPosts: window.StorageManager.load('socialPosts', [
            { id: 1, channel: 'linkedin', content: 'Excited to announce our new Enterprise v2.0 platform!', status: 'approved', time: 'Tomorrow 10:00 AM', likes: 0, comments: 3 },
            { id: 2, channel: 'twitter', content: 'Join us for the Q4 webinar series starting next week.', status: 'draft', time: 'TBD', likes: 0, comments: 0 }
        ]),

        events: window.StorageManager.load('events', [
            { id: 1, title: 'CMO Summit New York', date: '2025-10-15', type: 'In-Person', registrants: 1240, goal: 1100, status: 'Ready' }
        ]),

        notifications: window.StorageManager.load('notifications', [
            { id: 1, title: 'Budget Alert', msg: 'LinkedIn Ads +5% Over', type: 'alert', read: false },
            { id: 2, title: 'Approval Needed', msg: 'Q3 Webinar Deck', type: 'info', read: false }
        ]),

        // Helper State (Not Persisted)
        currentDate: new Date('2025-10-16') // Simulation Date
    },

    // --- PERSISTENCE HELPER ---
    saveState(key) {
        window.StorageManager.save(key, this.state[key]);
        this.notifyListeners(key);
    },

    // --- GETTERS ---
    getCampaigns() { return this.state.campaigns; },
    getCampaignById(id) { return this.state.campaigns.find(c => c.id == id); },
    getTasks() { return this.state.tasks; },
    getTaskById(id) { return this.state.tasks.find(t => t.id == id); },
    getSocialPosts() { return this.state.socialPosts; },
    getEvents() { return this.state.events; },
    getNotifications() { return this.state.notifications; },
    getCurrentDate() { return this.state.currentDate; },

    getStats() {
        const activeCamps = this.state.campaigns.filter(c => c.status === 'running' || c.status === 'active').length;
        const pipelineVal = 4.2 + (activeCamps * 0.1); // Dynamic simulation
        return {
            pipeline: '$' + pipelineVal.toFixed(1) + 'M',
            activeCampaigns: activeCamps,
            budgetSpent: 85,
            taskVelocity: '2.4 Days'
        };
    },

    // --- ACTIONS ---

    // 1. Dashboard Logic
    markNotificationRead(id) {
        const n = this.state.notifications.find(x => x.id == id);
        if (n) {
            n.read = true;
            this.saveState('notifications');
        }
    },

    // 2. Campaigns Logic
    addCampaign(data) {
        const newCamp = {
            id: Date.now(),
            title: data.title,
            type: data.type || 'content',
            status: 'planning',
            progress: 0,
            due: data.due || 'TBD',
            owner: 'Me',
            description: data.description || 'New Campaign',
            budget: data.budget || 0
        };
        this.state.campaigns.unshift(newCamp);
        this.saveState('campaigns');
        this.notifyListeners('dashboard');
        return newCamp;
    },

    updateCampaign(id, updates) {
        const c = this.state.campaigns.find(x => x.id == id);
        if (c) {
            Object.assign(c, updates);
            this.saveState('campaigns');
        }
    },

    deleteCampaign(id) {
        this.state.campaigns = this.state.campaigns.filter(c => c.id != id);
        this.saveState('campaigns');
    },

    // 3. Tasks Logic
    addTask(data) {
        const newTask = {
            id: Date.now(),
            title: data.title,
            tag: data.tag || 'General',
            col: 'todo',
            due: data.due || 'TBD',
            user: 'Me',
            color: 'gray',
            priority: data.priority || 'medium',
            description: data.description || '',
            campaignId: data.campaignId || null
        };
        this.state.tasks.push(newTask);
        this.saveState('tasks');
        return newTask;
    },

    updateTask(id, updates) {
        const t = this.state.tasks.find(x => x.id == id);
        if (t) {
            Object.assign(t, updates);
            this.saveState('tasks');
        }
    },

    moveTask(taskId, newColId) {
        const task = this.state.tasks.find(t => t.id == taskId);
        if (task && task.col !== newColId) {
            task.col = newColId;
            this.saveState('tasks');
        }
    },

    deleteTask(id) {
        this.state.tasks = this.state.tasks.filter(t => t.id != id);
        this.saveState('tasks');
    },

    // 4. Calendar Logic
    setMonth(offset) {
        // Simple logic just to shift date for visual demo
        const d = new Date(this.state.currentDate);
        d.setMonth(d.getMonth() + offset);
        this.state.currentDate = d;
        this.notifyListeners('calendar');
    },

    // 5. Social Logic
    addSocialPost(data) {
        const newPost = {
            id: Date.now(),
            channel: data.platform || 'linkedin',
            content: data.content,
            status: 'draft',
            time: 'Unscheduled',
            likes: 0,
            comments: 0
        };
        this.state.socialPosts.unshift(newPost);
        this.saveState('socialPosts');
    },

    approvePost(id) {
        const post = this.state.socialPosts.find(p => p.id == id);
        if (post) {
            post.status = 'approved';
            post.time = 'Tomorrow 9:00 AM';
            this.saveState('socialPosts');
        }
    },

    // 6. Events Logic
    addEvent(data) {
        const newEvent = {
            id: Date.now(),
            title: data.title,
            date: data.date,
            type: data.type || 'Webinar',
            status: 'Planning',
            registrants: 0,
            goal: 100
        };
        this.state.events.push(newEvent);
        this.saveState('events');
    },

    // --- AI SIMULATION ---
    async generateCampaignAI(prompt) {
        await new Promise(r => setTimeout(r, 1200));
        const isLaunch = prompt.toLowerCase().includes('launch');
        const generated = {
            title: isLaunch ? 'AI: Product Launch V3' : 'AI: Demand Gen Campaign',
            type: isLaunch ? 'launch' : 'content',
            budget: isLaunch ? 75000 : 20000,
            tasks: [
                { title: 'Market Research', tag: 'Strategy', priority: 'high' },
                { title: 'Brief Creative Team', tag: 'Creative', priority: 'medium' },
                { title: 'Setup Tracking', tag: 'MOPs', priority: 'medium' }
            ]
        };
        const camp = this.addCampaign({ title: generated.title, type: generated.type, budget: generated.budget });
        generated.tasks.forEach(t => this.addTask({ title: t.title, tag: t.tag, priority: t.priority, campaignId: camp.id }));
        return { ...camp, tasks: generated.tasks };
    },

    // --- OBSERVER ---
    listeners: [],
    subscribe(fn) { this.listeners.push(fn); },
    notifyListeners(key) { this.listeners.forEach(fn => fn(key)); }
};

window.Store = Store;
