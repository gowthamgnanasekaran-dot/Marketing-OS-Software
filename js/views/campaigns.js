window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.campaigns = function () {
    const campaigns = window.Store.getCampaigns();

    // Attach click handlers post-render
    setTimeout(() => {
        document.querySelectorAll('.campaign-card').forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent if clicking badge or btn
                if (e.target.closest('.badge') || e.target.closest('.btn')) return;
                const id = card.getAttribute('data-id');
                window.openCampaignDetail(id);
            });
        });
    }, 100);

    return `
        <!-- Toolbar -->
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--space-6);">
            <div style="display: flex; gap: var(--space-4);">
                <div class="card" style="padding: 8px 16px; display: flex; align-items: center; gap: 8px; cursor: pointer;">
                    <i class="fa-solid fa-filter" style="color: var(--text-light);"></i>
                    <span style="font-size: 0.9rem;">Filter By: All</span>
                </div>
            </div>
            <div style="display: flex; gap: 12px;">
                <button class="btn btn-ghost" onclick="promptCreateCampaign()"><i class="fa-solid fa-plus"></i> Manual Create</button>
                <div style="display: flex; background: var(--border-light); padding: 4px; border-radius: var(--radius-md);">
                    <button class="btn" style="background: white; box-shadow: var(--shadow-sm); padding: 4px 12px;"><i class="fa-solid fa-border-all"></i></button>
                    <button class="btn" style="padding: 4px 12px; color: var(--text-secondary);"><i class="fa-solid fa-list"></i></button>
                </div>
            </div>
        </div>

        <!-- Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: var(--space-6);">
            <!-- AI Trigger Card -->
            <button class="card" onclick="openAImodal()" style="display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(99, 102, 241, 0.05); border: 2px dashed #6366f1; cursor: pointer; min-height: 250px; transition: var(--trans-med);">
                <div style="width: 48px; height: 48px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm); margin-bottom: 12px;">
                    <i class="fa-solid fa-wand-magic-sparkles" style="color: var(--primary);"></i>
                </div>
                <div style="font-weight: 600; color: var(--primary);">AI Campaign Generator</div>
                <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 4px;">Describe it, we build it.</div>
            </button>

            ${campaigns.map(c => `
                <div class="card campaign-card" data-id="${c.id}" style="display: flex; flex-direction: column; cursor: pointer; transition: transform 0.1s;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <span class="badge ${getBadgeColor(c.type)}" onclick="cycleCampaignStatus(${c.id})" style="cursor: pointer; user-select: none;">${capitalize(c.type)}</span>
                        <div class="dropdown" style="position:relative;">
                             <button class="btn btn-ghost" style="padding: 4px;" onclick="event.stopPropagation(); deleteCampaign(${c.id})"><i class="fa-regular fa-trash-can" style="color:var(--text-light)"></i></button>
                        </div>
                    </div>
                    <h3 style="font-size: 1.1rem; font-weight: 600; margin-bottom: 8px;">${c.title}</h3>
                    <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: auto; min-height: 40px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${c.description}</p>
                    
                    <div style="margin: 1rem 0;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 6px;">
                            <span>Status: <strong>${capitalize(c.status)}</strong></span>
                            <span>${c.progress}%</span>
                        </div>
                         <div style="width: 100%; height: 6px; background: var(--bg-body); border-radius: 3px; overflow: hidden;">
                            <div style="width: ${c.progress}%; height: 100%; background: ${c.status === 'planning' ? 'var(--accent-blue)' : 'var(--accent-green)'};"></div>
                        </div>
                    </div>

                    <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-light); padding-top: 12px;">
                        <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; border: 2px solid white; display:flex; align-items:center; justify-content:center; color:white; font-size:10px;">${c.owner ? c.owner[0] : 'U'}</div>
                        <div style="font-size: 0.85rem; color: var(--text-light);"><i class="fa-regular fa-clock"></i> Due ${c.due || 'TBD'}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};

window.deleteCampaign = function (id) {
    if (confirm('Delete this campaign?')) {
        window.Store.deleteCampaign(id);
        refreshView();
    }
};

// ... existing utils ...
