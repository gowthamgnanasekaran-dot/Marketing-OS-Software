// Quick Create Modal - Simplified Version
window.QuickCreate = {
    open() {
        if (!document.getElementById('quick-create-modal')) {
            this.injectModal();
        }
        document.getElementById('quick-create-modal').style.display = 'flex';
        this.showTypeSelector();
    },

    close() {
        document.getElementById('quick-create-modal').style.display = 'none';
    },

    injectModal() {
        const modalHTML = `
            <div id="quick-create-modal" class="modal-overlay" style="display: none;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2 id="qc-title">Quick Create</h2>
                        <button onclick="QuickCreate.close()" class="btn-icon">
                            <i class="fa-solid fa-times"></i>
                        </button>
                    </div>
                    <div id="qc-body" class="modal-body"></div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    },

    showTypeSelector() {
        document.getElementById('qc-title').textContent = 'Quick Create';
        document.getElementById('qc-body').innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
                <button onclick="QuickCreate.showCampaignForm()" class="qc-type-card">
                    <i class="fa-solid fa-bullhorn" style="font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem;"></i>
                    <div style="font-weight: 600;">Campaign</div>
                </button>
                <button onclick="QuickCreate.showTaskForm()" class="qc-type-card">
                    <i class="fa-solid fa-list-check" style="font-size: 2rem; color: var(--primary); margin-bottom: 0.5rem;"></i>
                    <div style="font-weight: 600;">Task</div>
                </button>
            </div>
        `;
    },

    showCampaignForm() {
        document.getElementById('qc-title').textContent = 'Create Campaign';
        document.getElementById('qc-body').innerHTML = `
            <form onsubmit="QuickCreate.submitCampaign(event)">
                <div class="form-group">
                    <label>Campaign Title *</label>
                    <input type="text" name="title" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" rows="3"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" onclick="QuickCreate.close()" class="btn btn-ghost">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
        `;
    },

    showTaskForm() {
        document.getElementById('qc-title').textContent = 'Create Task';
        document.getElementById('qc-body').innerHTML = `
            <form onsubmit="QuickCreate.submitTask(event)">
                <div class="form-group">
                    <label>Task Title *</label>
                    <input type="text" name="title" required>
                </div>
                <div class="form-group">
                    <label>Description</label>
                    <textarea name="description" rows="3"></textarea>
                </div>
                <div class="modal-footer">
                    <button type="button" onclick="QuickCreate.close()" class="btn btn-ghost">Cancel</button>
                    <button type="submit" class="btn btn-primary">Create</button>
                </div>
            </form>
        `;
    },

    async submitCampaign(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        try {
            await window.api.post('/campaigns', data);
            await window.Store.initData();
            this.close();
            window.location.hash = '/campaigns';
            this.showSuccess('Campaign created!');
        } catch (err) {
            this.showError('Failed to create campaign');
        }
    },

    async submitTask(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        data.column_id = 1;

        try {
            await window.api.post('/tasks', data);
            await window.Store.initData();
            this.close();
            window.location.hash = '/tasks';
            this.showSuccess('Task created!');
        } catch (err) {
            this.showError('Failed to create task');
        }
    },

    showSuccess(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-success';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast toast-error';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};
