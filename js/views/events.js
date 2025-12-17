window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.events = function () {
    return `
        <div style="display: grid; grid-template-columns: 3fr 1fr; gap: var(--space-6);">
            
            <!-- Left: Active Events List -->
            <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                <div class="card">
                     <div class="card-header">
                        <h3>Upcoming Events</h3>
                        <div style="display: flex; gap: 8px;">
                            <button class="btn btn-primary text-xs"><i class="fa-solid fa-plus"></i> New Event</button>
                        </div>
                    </div>
                    
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                         <thead>
                            <tr style="text-align: left; color: var(--text-light); border-bottom: 1px solid var(--border-light);">
                                <th style="padding: 12px 0; font-weight: 500;">Event Name</th>
                                <th style="font-weight: 500;">Date</th>
                                <th style="font-weight: 500;">Type</th>
                                <th style="font-weight: 500;">Registrants</th>
                                <th style="font-weight: 500;">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid var(--border-light);">
                                <td style="padding: 16px 0;">
                                    <div style="font-weight: 500;">CMO Summit New York</div>
                                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Javits Center, NYC</div>
                                </td>
                                <td>Oct 15, 2025</td>
                                <td><span class="badge" style="background: #fdf4ff; color: #a21caf;">In-Person</span></td>
                                <td>
                                    <div style="font-weight: 600;">1,240</div>
                                    <div style="font-size: 0.75rem; color: var(--accent-green);">+12% vs Goal</div>
                                </td>
                                <td><span class="badge badge-green">Ready</span></td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-light);">
                                <td style="padding: 16px 0;">
                                    <div style="font-weight: 500;">Webinar: The Future of B2B</div>
                                    <div style="font-size: 0.8rem; color: var(--text-secondary);">Online - Zoom</div>
                                </td>
                                <td>Nov 02, 2025</td>
                                <td><span class="badge" style="background: #eff6ff; color: #1d4ed8;">Virtual</span></td>
                                <td>
                                    <div style="font-weight: 600;">450</div>
                                    <div style="font-size: 0.75rem; color: var(--text-light);">50% of Goal</div>
                                </td>
                                <td><span class="badge badge-orange">Promoting</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Event Checklist Detailed View (Mocked) -->
                <div class="card">
                     <div class="card-header">
                        <h3>Checklist: CMO Summit NYC</h3>
                        <div style="font-size: 0.8rem; color: var(--text-secondary);">74% Complete</div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                         <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" checked style="accent-color: var(--primary);">
                            <span style="text-decoration: line-through; color: var(--text-light);">Book Venue & Catering</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" checked style="accent-color: var(--primary);">
                            <span style="text-decoration: line-through; color: var(--text-light);">Finalize Keynote Speaker</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" style="accent-color: var(--primary);">
                            <span>Print Badges & Swag</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <input type="checkbox" style="accent-color: var(--primary);">
                            <span>Send "Know Before You Go" Email</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right: Speaker & Asset Tracker -->
            <div style="display: flex; flex-direction: column; gap: var(--space-6);">
                <div class="card">
                    <div class="card-header">
                        <h3>Confirmed Speakers</h3>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 16px;">
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; overflow:hidden;"></div>
                            <div>
                                <div style="font-weight: 500; font-size: 0.9rem;">Elaine C.</div>
                                <div style="font-size: 0.75rem; color: var(--text-secondary);">VP Marketing</div>
                            </div>
                        </div>
                         <div style="display: flex; align-items: center; gap: 12px;">
                            <div style="width: 40px; height: 40px; background: #e2e8f0; border-radius: 50%; overflow:hidden;"></div>
                            <div>
                                <div style="font-weight: 500; font-size: 0.9rem;">David K.</div>
                                <div style="font-size: 0.75rem; color: var(--text-secondary);">Guest Keynote</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                         <h3>Registration Pace</h3>
                    </div>
                    <div style="height: 120px; display: flex; align-items: flex-end; gap: 4px;">
                        ${[20, 35, 40, 45, 60, 55, 75, 80, 95, 100].map(h => `
                            <div style="flex:1; background: var(--accent-blue); height: ${h}%; border-radius: 2px;"></div>
                        `).join('')}
                    </div>
                </div>
            </div>

        </div>
    `;
};
