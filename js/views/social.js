window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.social = function () {
    // Fetch store posts
    const posts = window.Store.getSocialPosts();

    return `
       <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6);">
            
            <!-- Feed / Planner -->
            <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                 <div class="card" style="display: flex; gap: var(--space-4); align-items: center;">
                    <div style="width: 40px; height: 40px; background: var(--border-light); border-radius: 50%;"></div>
                    <input type="text" id="social-post-input" placeholder="Draft a new post..." style="flex: 1; border: none; background: transparent; font-size: 1rem; outline: none;">
                    <button class="btn btn-primary" onclick="window.createPost()">Create Post</button>
                 </div>

                 <!-- Posts Feed -->
                 ${posts.map(p => `
                     <div class="card">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
                            <div style="display: flex; gap: 8px; align-items: center;">
                                 <i class="fa-brands fa-${p.channel}" style="color: ${p.channel === 'linkedin' ? '#0077b5' : '#1da1f2'}; font-size: 20px;"></i>
                                 <span style="font-weight: 600; font-size: 0.9rem;">${capitalize(p.channel)}</span>
                                 <span style="color: var(--text-light);">•</span>
                                 <span style="font-size: 0.8rem; color: var(--text-secondary);">${p.time}</span>
                            </div>
                            <span class="badge ${p.status === 'approved' ? 'badge-green' : 'badge-orange'}">${capitalize(p.status)}</span>
                        </div>
                        <p style="margin-bottom: 1rem; color: var(--text-main);">${p.content}</p>
                        
                        <div style="display: flex; gap: 16px; margin-top: 1rem; border-top: 1px solid var(--border-light); padding-top: 12px;">
                             ${p.status === 'draft' ?
            `<button class="btn btn-primary" style="padding: 4px 12px;" onclick="window.approvePost(${p.id})">Approve</button>` :
            `<span style="font-size: 0.8rem; color: var(--accent-green);"><i class="fa-solid fa-check"></i> Approved</span>`
        }
                             <div style="font-size: 0.8rem; color: var(--text-secondary); margin-left:auto;"><i class="fa-regular fa-eye"></i> Preview</div>
                        </div>
                     </div>
                 `).join('')}

            </div>

            <!-- Stats Column (Static for now) -->
             <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                <div class="card">
                    <div class="card-header">
                        <h3>Channel Growth</h3>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                             <div style="display: flex; gap: 8px; align-items: center;"><i class="fa-brands fa-linkedin" style="color: #0077b5;"></i> Linked In</div>
                             <div style="font-weight: 600;">14.2k <span style="color: var(--accent-green); font-size: 0.75rem;">(+5%)</span></div>
                        </div>
                    </div>
                </div>
            </div>
       </div>
    `;
};

window.createPost = function () {
    const input = document.getElementById('social-post-input');
    if (input && input.value) {
        window.Store.addSocialPost(input.value);
        input.value = ''; // clear
    }
};

window.approvePost = function (id) {
    window.Store.approvePost(id);
};

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }
