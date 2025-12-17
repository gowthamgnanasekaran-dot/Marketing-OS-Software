/**
 * Global Interaction Controller
 * Handles Modals, Drawers, and Detail Views
 */

// --- 1. TASK DETAIL DRAWER ---
window.openTaskDetail = function (id) {
    const task = window.Store.getTaskById(id);
    if (!task) return;

    const drawer = document.createElement('div');
    drawer.className = 'drawer-overlay active'; // 'active' to show overlay
    drawer.innerHTML = `
        <div class="drawer" id="task-drawer">
            <div style="padding: 20px; border-bottom: 1px solid var(--border-light); display: flex; justify-content: space-between; align-items: center;">
                <h3 style="margin:0;">Task Details</h3>
                <button class="btn btn-ghost" onclick="closeDrawer()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div style="padding: 24px; flex: 1; overflow-y: auto;">
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" class="form-input" id="edit-task-title" value="${task.title}">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea class="form-textarea" id="edit-task-desc">${task.description || ''}</textarea>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div class="form-group">
                        <label class="form-label">Status</label>
                         <select class="form-select" id="edit-task-col">
                            <option value="todo" ${task.col == 'todo' ? 'selected' : ''}>To Do</option>
                            <option value="progress" ${task.col == 'progress' ? 'selected' : ''}>In Progress</option>
                            <option value="review" ${task.col == 'review' ? 'selected' : ''}>In Review</option>
                            <option value="done" ${task.col == 'done' ? 'selected' : ''}>Done</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Priority</label>
                         <select class="form-select" id="edit-task-priority">
                            <option value="low" ${task.priority == 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${task.priority == 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${task.priority == 'high' ? 'selected' : ''}>High</option>
                            <option value="urgent" ${task.priority == 'urgent' ? 'selected' : ''}>Urgent</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">Due Date</label>
                    <input type="date" class="form-input" id="edit-task-due" value="${formatDateForInput(task.due)}">
                </div>
            </div>
            <div style="padding: 20px; border-top: 1px solid var(--border-light); background: #f8fafc; display: flex; justify-content: space-between;">
                <button class="btn btn-ghost" style="color: var(--accent-red);" onclick="deleteTask(${task.id})">Delete</button>
                <button class="btn btn-primary" onclick="saveTask(${task.id})">Save Changes</button>
            </div>
        </div>
    `;

    document.body.appendChild(drawer);
    requestAnimationFrame(() => {
        document.getElementById('task-drawer').classList.add('open');
        drawer.style.display = 'block';
    });

    // Close on click outside
    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeDrawer();
    });
};

window.closeDrawer = function () {
    const drawer = document.querySelector('.drawer');
    const overlay = document.querySelector('.drawer-overlay');
    if (drawer) drawer.classList.remove('open');
    setTimeout(() => {
        if (overlay) overlay.remove();
    }, 300);
};

window.saveTask = function (id) {
    const updates = {
        title: document.getElementById('edit-task-title').value,
        description: document.getElementById('edit-task-desc').value,
        col: document.getElementById('edit-task-col').value,
        priority: document.getElementById('edit-task-priority').value,
        due: document.getElementById('edit-task-due').value
    };
    window.Store.updateTask(id, updates);
    closeDrawer();
    refreshView(); // Re-render current view
};

window.deleteTask = function (id) {
    if (confirm('Are you sure?')) {
        window.Store.deleteTask(id);
        closeDrawer();
        refreshView();
    }
};

// --- 2. CAMPAIGN DETAIL MODAL ---
window.openCampaignDetail = function (id) {
    const c = window.Store.getCampaignById(id);
    if (!c) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay open';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3 style="margin:0;">${c.title}</h3>
                <button class="btn btn-ghost" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <p style="color:var(--text-secondary); line-height:1.5;">${c.description}</p>
                </div>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:16px; margin-bottom:24px;">
                     <div class="card" style="padding:12px; background:#f8fafc; text-align:center;">
                        <div style="font-size:0.8rem; color:var(--text-light);">Status</div>
                        <div style="font-weight:600; color:var(--primary);">${c.status.toUpperCase()}</div>
                     </div>
                     <div class="card" style="padding:12px; background:#f8fafc; text-align:center;">
                        <div style="font-size:0.8rem; color:var(--text-light);">Budget</div>
                        <div style="font-weight:600;">$${c.budget.toLocaleString()}</div>
                     </div>
                     <div class="card" style="padding:12px; background:#f8fafc; text-align:center;">
                        <div style="font-size:0.8rem; color:var(--text-light);">Progress</div>
                        <div style="font-weight:600;">${c.progress}%</div>
                     </div>
                </div>

                <h4 style="margin-bottom:12px;">Related Tasks</h4>
                <div style="border: 1px solid var(--border-light); border-radius: 8px; overflow:hidden;">
                     ${window.Store.getTasks().filter(t => t.campaignId == c.id).map(t => `
                        <div style="padding:10px 16px; border-bottom:1px solid var(--border-light); display:flex; justify-content:space-between; align-items:center;">
                            <span>${t.title}</span>
                            <span class="badge badge-gray">${t.col}</span>
                        </div>
                     `).join('') || '<div style="padding:16px; color:var(--text-light); text-align:center;">No tasks linked</div>'}
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-ghost" onclick="closeModal()">Close</button>
                <button class="btn btn-primary">Edit Campaign</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.closeModal = function () {
    document.querySelectorAll('.modal-overlay').forEach(el => el.remove());
};

// Helper
function formatDateForInput(dateStr) {
    if (!dateStr || dateStr === 'TBD') return '';
    try {
        const d = new Date(dateStr);
        return d.toISOString().split('T')[0];
    } catch (e) { return ''; }
}

function refreshView() {
    // Hacky re-render of current view helper
    const hash = window.location.hash.slice(1) || '/dashboard';
    const viewName = hash === '/' ? 'dashboard' : hash.replace('/', '');
    const container = document.getElementById('main-content');
    if (window.MarketingOS.views[viewName]) {
        container.innerHTML = window.MarketingOS.views[viewName]();
        // Re-attach listeners if needed (tasks)
        if (viewName === 'tasks') {
            setTimeout(() => {
                document.querySelectorAll('.card-draggable').forEach(card => {
                    card.addEventListener('dragstart', window.handleDragStart);
                    card.addEventListener('dragend', window.handleDragEnd);
                });
                document.querySelectorAll('.kanban-col').forEach(col => {
                    col.addEventListener('dragover', window.handleDragOver);
                    col.addEventListener('dragleave', window.handleDragLeave);
                    col.addEventListener('drop', window.handleDrop);
                });
            }, 50);
        }
    }
}
