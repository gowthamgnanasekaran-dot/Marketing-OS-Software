window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.creative = function () {
    return `
        <!-- Toolbar -->
        <div style="margin-bottom: var(--space-6); display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: 1rem;">
                <button class="btn btn-primary"><i class="fa-solid fa-cloud-arrow-up"></i> Upload Asset</button>
                <div style="position: relative;">
                    <input type="text" placeholder="Search assets..." style="padding: 0.5rem 1rem 0.5rem 2rem; border-radius: var(--radius-md); border: 1px solid var(--border-light); font-size: 0.9rem;">
                    <i class="fa-solid fa-search" style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: var(--text-light); font-size: 0.8rem;"></i>
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn btn-ghost"><i class="fa-solid fa-folder"></i> Folders</button>
                <button class="btn btn-ghost"><i class="fa-solid fa-filter"></i> Filter</button>
            </div>
        </div>

        <!-- Asset Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: var(--space-6);">
            ${[1, 2, 3, 4, 5, 6, 7, 8].map((i) => `
                <div class="card" style="padding: 0; overflow: hidden; border: none; box-shadow: var(--shadow-sm); cursor: pointer;">
                    <div style="height: 140px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; position: relative;">
                        <i class="fa-regular fa-image" style="font-size: 3rem; color: #cbd5e1;"></i>
                        <span style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.5); color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px;">JPG</span>
                    </div>
                    <div style="padding: 12px; border-top: 1px solid var(--border-light);">
                        <div style="font-weight: 500; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Campaign_Hero_v${i}.jpg</div>
                        <div style="display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.8rem; color: var(--text-light);">
                            <span>2.4 MB</span>
                            <span>Just now</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};
