window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.reports = function () {
    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-6);">
            <!-- Report 1 -->
            <div class="card">
                <div class="card-header">
                    <h3>Revenue Attribution</h3>
                    <select style="border: 1px solid var(--border-light); padding: 4px; border-radius: 4px; font-size: 0.8rem;">
                        <option>This Quarter</option>
                        <option>Last Quarter</option>
                    </select>
                </div>
                 <div style="height: 200px; display: flex; align-items: flex-end; justify-content: space-around; padding-bottom: 20px;">
                    ${[
            { label: 'Org. Search', h: 60, c: '#3b82f6' },
            { label: 'Paid Social', h: 80, c: '#8b5cf6' },
            { label: 'Email', h: 40, c: '#10b981' },
            { label: 'Events', h: 90, c: '#f59e0b' },
            { label: 'Referral', h: 30, c: '#64748b' }
        ].map(d => `
                        <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; width: 100%;">
                            <div style="width: 40px; height: ${d.h}%; background: ${d.c}; border-radius: 4px 4px 0 0;"></div>
                            <div style="font-size: 0.7rem; color: var(--text-secondary);">${d.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

             <!-- Report 2 -->
             <div class="card">
                <div class="card-header">
                    <h3>Budget Utilization</h3>
                     <span class="badge badge-red">Overspending</span>
                </div>
                <div style="display: flex; align-items: center; justify-content: center; height: 200px; position: relative;">
                    <div style="width: 160px; height: 160px; border-radius: 50%; background: conic-gradient(var(--primary) 0% 65%, var(--accent-orange) 65% 85%, var(--border-light) 85% 100%); position: relative;">
                         <div style="position: absolute; inset: 20px; background: white; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                             <span style="font-size: 2rem; font-weight: 700;">85%</span>
                             <span style="font-size: 0.8rem; color: var(--text-secondary);">Used</span>
                         </div>
                    </div>
                </div>
                <div style="display: flex; justify-content: center; gap: 16px; margin-top: -10px;">
                    <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem;"><span style="width:8px; height:8px; background:var(--primary); border-radius:50%;"></span> Programs</div>
                    <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem;"><span style="width:8px; height:8px; background:var(--accent-orange); border-radius:50%;"></span> Headcount</div>
                </div>
            </div>

            <!-- Report Table -->
            <div class="card" style="grid-column: span 2;">
                 <div class="card-header">
                    <h3>Campaign ROI Analysis</h3>
                    <button class="btn btn-ghost text-sm"><i class="fa-solid fa-download"></i> Export CSV</button>
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                    <thead>
                        <tr style="text-align: left; color: var(--text-light); border-bottom: 2px solid var(--border-light);">
                            <th style="padding: 12px 0;">Campaign</th>
                            <th>Cost</th>
                            <th>Impressions</th>
                            <th>Clicks</th>
                            <th>Conv. Rate</th>
                            <th>Pipeline</th>
                            <th>ROI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border-light);">
                            <td style="padding: 12px 0; font-weight: 500;">Q3 Demand Gen</td>
                            <td>$45,000</td>
                            <td>1.2M</td>
                            <td>14,500</td>
                            <td>2.4%</td>
                            <td>$340k</td>
                            <td style="color: var(--accent-green);">7.5x</td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-light);">
                            <td style="padding: 12px 0; font-weight: 500;">Enterprise Launch V2</td>
                            <td>$120,000</td>
                            <td>3.5M</td>
                            <td>45,000</td>
                            <td>1.8%</td>
                            <td>$2.1M</td>
                            <td style="color: var(--accent-green);">17.5x</td>
                        </tr>
                         <tr>
                            <td style="padding: 12px 0; font-weight: 500;">LinkedIn Brand Safe</td>
                            <td>$12,000</td>
                            <td>500k</td>
                            <td>2,100</td>
                            <td>0.9%</td>
                            <td>$15k</td>
                            <td style="color: var(--accent-red);">1.2x</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
};
