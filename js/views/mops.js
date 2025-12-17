window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.mops = function () {
    const links = window.Store.state.mopsLinks || [];

    return `
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: var(--space-6);">
            
            <!-- Tools Column -->
            <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                <div class="card">
                     <div class="card-header">
                        <h3><i class="fa-solid fa-link" style="color: var(--primary);"></i> UTM Generator</h3>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                        <div>
                            <label style="display:block; font-size:0.8rem; margin-bottom:4px;">Website URL</label>
                            <input type="text" id="utm-url" class="form-input" placeholder="https://example.com/landing-page">
                        </div>
                         <div>
                            <label style="display:block; font-size:0.8rem; margin-bottom:4px;">Campaign Source</label>
                             <select id="utm-source" class="form-input" style="height: 35px;">
                                <option value="linkedin">LinkedIn</option>
                                <option value="google">Google Ads</option>
                                <option value="newsletter">Newsletter</option>
                            </select>
                        </div>
                        <div>
                            <label style="display:block; font-size:0.8rem; margin-bottom:4px;">Medium</label>
                            <select id="utm-medium" class="form-input" style="height: 35px;">
                                <option value="social">Social</option>
                                <option value="cpc">CPC</option>
                                <option value="email">Email</option>
                            </select>
                        </div>
                         <div>
                            <label style="display:block; font-size:0.8rem; margin-bottom:4px;">Campaign Name</label>
                            <input type="text" id="utm-camp" class="form-input" placeholder="e.g. q4_launch">
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="window.generateUTM()">Generate & Save Link</button>

                    <div id="utm-result" style="margin-top: 16px; padding: 12px; background: #f8fafc; border: 1px dashed var(--border-med); border-radius: 6px; font-family: monospace; font-size: 0.85rem; word-break: break-all; display: none;"></div>
                </div>

                <!-- Recent Links -->
                <div class="card">
                    <div class="card-header">
                        <h3>Recent Created Links</h3>
                    </div>
                    <table style="width:100%; font-size: 0.9rem;">
                        <thead style="text-align:left; color:var(--text-light); border-bottom:1px solid var(--border-light);">
                            <tr><th style="padding:8px 0;">Campaign</th><th>Source</th></tr>
                        </thead>
                        <tbody>
                             ${links.map(l => `
                                <tr style="border-bottom: 1px solid var(--border-light);">
                                    <td style="padding:12px 0;">${l.params.campaign}<br><span style="font-size:0.75rem; color:var(--text-light);">${l.original.substring(0, 30)}...</span></td>
                                    <td><span class="badge badge-purple">${l.params.source}</span></td>
                                </tr>
                             `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Health Column -->
            <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                <div class="card">
                    <div class="card-header"><h3>Integration Health</h3></div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; align-items:center; gap:8px;"><i class="fa-brands fa-hubspot" style="color: #ff7a59;"></i> HubSpot</div>
                            <span class="badge badge-green">Connected</span>
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                             <div style="display:flex; align-items:center; gap:8px;"><i class="fa-brands fa-salesforce" style="color: #00a1e0;"></i> Salesforce</div>
                            <span class="badge badge-green">Connected</span>
                        </div>
                         <div style="display:flex; justify-content:space-between; align-items:center;">
                             <div style="display:flex; align-items:center; gap:8px;"><i class="fa-regular fa-snowflake" style="color: #29b5e8;"></i> Snowflake</div>
                            <span class="badge badge-orange">Sync Delay</span>
                        </div>
                    </div>
                    <button class="btn btn-ghost" style="width:100%; margin-top:16px;">Run Diagnostics</button>
                </div>
            </div>

        </div>
    `;
};

window.generateUTM = function () {
    const url = document.getElementById('utm-url').value;
    const source = document.getElementById('utm-source').value;
    const medium = document.getElementById('utm-medium').value;
    const camp = document.getElementById('utm-camp').value;

    if (url && camp) {
        const final = window.Store.addUTM(url, source, medium, camp);

        const resEl = document.getElementById('utm-result');
        resEl.style.display = 'block';
        resEl.textContent = final;

        // Force re-render to show table row (hacky but works for this level)
        // Ideally we would just append the row
        const main = document.getElementById('main-content');
        main.innerHTML = window.MarketingOS.views.mops();
        // Restore result
        document.getElementById('utm-result').style.display = 'block';
        document.getElementById('utm-result').textContent = final;
    }
};
