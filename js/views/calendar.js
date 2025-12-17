window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.calendar = function () {
    // Fetch Data
    const campaigns = window.Store.getCampaigns();
    const customEvents = window.Store.getEvents();
    const currentDate = window.Store.getCurrentDate();

    // Build Events
    let calendarEvents = [];
    campaigns.forEach(c => {
        if (c.due && c.due !== 'TBD') {
            const day = parseInt(c.due.split('-')[2]);
            if (!isNaN(day)) calendarEvents.push({ day: day, title: 'End: ' + c.title, type: c.type });
        }
    });
    customEvents.forEach(e => {
        const day = parseInt(e.date.split('-')[2]);
        if (!isNaN(day)) calendarEvents.push({ day: day, title: e.title, type: 'event' });
    });

    // Calendar Grid Logic
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const totalDays = 31;
    const offset = 3;

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const currentMonthName = monthNames[currentDate.getMonth()];
    const currentYear = currentDate.getFullYear();

    let calendarGrid = '';
    for (let i = 0; i < offset; i++) {
        calendarGrid += `<div style="background:var(--bg-body); border-right:1px solid var(--border-light); border-bottom:1px solid var(--border-light); height:120px;"></div>`;
    }

    for (let d = 1; d <= totalDays; d++) {
        const dayEvents = calendarEvents.filter(e => e.day === d);
        const eventHTML = dayEvents.map(e => `
            <div class="badge ${getEventColor(e.type)}" style="display:block; margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; cursor:pointer; font-size:0.75rem;">
                ${e.title}
            </div>
        `).join('');

        // Highlight Today
        const isToday = d === 16; // Simulated Today
        const bg = isToday ? '#f0fdf4' : 'white';

        calendarGrid += `
            <div style="background:${bg}; border-right:1px solid var(--border-light); border-bottom:1px solid var(--border-light); height:120px; padding:8px; position:relative;">
                <span style="font-weight:600; font-size:0.9rem; color:${isToday ? 'var(--accent-green)' : 'var(--text-secondary)'};">${d}</span>
                <div style="margin-top: 4px;">${eventHTML}</div>
            </div>
        `;
    }

    return `
        <!-- Calendar Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6);">
            <div style="display: flex; align-items: center; gap: var(--space-4);">
                <h2 style="font-weight: 600; font-size: 1.5rem;">${currentMonthName} ${currentYear}</h2>
                <div style="display: flex; gap: 4px;">
                    <button class="btn btn-ghost" onclick="changeMonth(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                    <button class="btn btn-ghost" onclick="changeMonth(1)"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                <button class="btn btn-ghost text-sm">Today</button>
            </div>
            
            <div style="display: flex; gap: var(--space-4);">
                <button class="btn btn-primary" onclick="openAImodal()"><i class="fa-solid fa-wand-magic-sparkles"></i> AI Plan</button>
            </div>
        </div>

        <!-- Calendar Grid -->
        <div class="card" style="padding: 0; overflow: hidden; border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); background: var(--bg-body); border-bottom: 1px solid var(--border-light);">
                ${days.map(d => `<div style="padding: 12px; text-align: center; font-weight: 600; color: var(--text-secondary); font-size: 0.9rem;">${d}</div>`).join('')}
            </div>
            <div style="display: grid; grid-template-columns: repeat(7, 1fr); background: var(--border-light); gap: 1px;">
                ${calendarGrid}
            </div>
        </div>
    `;
};

window.changeMonth = function (offset) {
    window.Store.setMonth(offset);
    document.getElementById('main-content').innerHTML = window.MarketingOS.views.calendar();
};

function getEventColor(type) {
    const map = { 'webinar': 'badge-blue', 'launch': 'badge-purple', 'content': 'badge-orange', 'event': 'badge-green' };
    return map[type] || 'badge-blue';
}
