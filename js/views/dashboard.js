window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.dashboard = function () {
    // 1. Get Real Stats from Store
    const stats = window.Store.getStats(); // { pipeline, activeCampaigns, budgetSpent, taskVelocity }
    const recentApprovals = window.Store.state.notifications || [];

    return `
        <div class="stat-grid">
            <div class="card stat-card">
                <h3>Pipeline Influenced</h3>
                <div class="value">${stats.pipeline}</div>
                <div class="trend up"><i class="fa-solid fa-arrow-trend-up"></i> 12% vs last month</div>
            </div>
            <div class="card stat-card">
                <h3>Active Campaigns</h3>
                <div class="value">${stats.activeCampaigns}</div>
                <div class="trend"><span style="color:var(--text-secondary)">Running now</span></div>
            </div>
            <div class="card stat-card">
                <h3>Budget Spent</h3>
                <div class="value">${stats.budgetSpent}%</div>
                <div class="trend down"><i class="fa-solid fa-chart-pie"></i> of Q3 Budget</div>
            </div>
            <div class="card stat-card">
                <h3>Task Velocity</h3>
                <div class="value">${stats.taskVelocity}</div>
                <div class="trend up"><i class="fa-solid fa-bolt"></i> 0.3 Faster</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6);">
            
            <!-- Main Chart Area -->
            <div class="card">
                <div class="card-header">
                    <h3>Performance Overview</h3>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-ghost text-xs">Leads</button>
                        <button class="btn btn-ghost text-xs" style="background:var(--bg-body); font-weight:600;">MQLs</button>
                    </div>
                </div>
                <!-- CSS Chart (Static Visual for now) -->
                <div style="display: flex; align-items: flex-end; justify-content: space-between; height: 240px; padding-top: 20px;">
                    ${[35, 50, 45, 60, 55, 80, 70, 90, 85, 100, 95, 110].map((h, i) => `
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 6px; width: 6%;">
                             <div style="width: 100%; height: ${h}%; background: linear-gradient(180deg, var(--primary) 0%, var(--primary-light) 100%); border-radius: 4px; position: relative; transition: height 1s ease;"></div>
                             <div style="font-size: 10px; color: var(--text-light);">W${i + 1}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Approvals & Notifications -->
            <div class="card">
                <div class="card-header">
                    <h3>Approvals & Alerts</h3>
                </div>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    ${recentApprovals.map(n => `
                         <div style="display: flex; gap: 1rem; align-items: flex-start; padding-bottom: 1rem; border-bottom: 1px solid var(--border-light);">
                            <div style="width: 36px; height: 36px; background: ${n.type === 'alert' ? '#fee2e2' : '#e0e7ff'}; color: ${n.type === 'alert' ? 'var(--accent-red)' : 'var(--primary)'}; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                <i class="fa-solid ${n.type === 'alert' ? 'fa-triangle-exclamation' : 'fa-file-pen'}"></i>
                            </div>
                            <div>
                                <div style="font-size: 0.9rem; font-weight: 600;">${n.title}</div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">${n.msg}</div>
                                <button class="btn btn-${n.type === 'alert' ? 'ghost' : 'primary'}" style="padding: 4px 12px; font-size: 0.75rem;">${n.type === 'alert' ? 'Details' : 'Approve'}</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <!-- Campaigns Table Preview -->
        <div class="card" style="margin-top: var(--space-6);">
             <div class="card-header">
                <h3>Recent Active Campaigns</h3>
                <button class="btn btn-ghost text-xs" onclick="window.location.hash='/campaigns'">View All</button>
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                <thead>
                    <tr style="text-align: left; color: var(--text-light); border-bottom: 1px solid var(--border-light);">
                        <th style="padding: 12px 0; font-weight: 500;">Campaign Name</th>
                        <th style="font-weight: 500;">Status</th>
                        <th style="font-weight: 500;">Owner</th>
                        <th style="font-weight: 500;">Progress</th>
                        <th style="font-weight: 500;">Due Date</th>
                    </tr>
                </thead>
                <tbody>
                    ${window.Store.getCampaigns().slice(0, 5).map(c => `
                        <tr style="border-bottom: 1px solid var(--border-light);">
                            <td style="padding: 16px 0; font-weight: 500;">${c.title}</td>
                            <td><span class="badge ${c.status === 'planning' ? 'badge-blue' : 'badge-green'}">${capitalize(c.status)}</span></td>
                            <td>${c.owner || 'AI'}</td>
                            <td>
                                <div style="width: 100px; height: 6px; background: var(--border-light); border-radius: 3px; overflow: hidden;">
                                    <div style="width: ${c.progress}%; height: 100%; background: ${c.status === 'planning' ? 'var(--accent-blue)' : 'var(--accent-green)'};"></div>
                                </div>
                            </td>
                            <td style="color: var(--text-secondary);">${c.due}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

// Utils (Duplicated for now, optimal to move to shared utils)
function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
