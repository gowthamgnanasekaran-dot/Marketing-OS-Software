window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.tasks = function () {
    // 1. Fetch Real Data
    const tasks = window.Store.getTasks();
    const columns = [
        { id: 'todo', title: 'To Do', color: 'var(--text-secondary)' },
        { id: 'progress', title: 'In Progress', color: 'var(--accent-blue)' },
        { id: 'review', title: 'In Review', color: 'var(--accent-orange)' },
        { id: 'done', title: 'Done', color: 'var(--accent-green)' }
    ];

    // Helper for HTML injection (since we can't use React)
    setTimeout(() => {
        // Attach Drag Events after render
        document.querySelectorAll('.card-draggable').forEach(card => {
            card.addEventListener('dragstart', handleDragStart);
            card.addEventListener('dragend', handleDragEnd);
            // Click to Edit
            card.addEventListener('click', (e) => {
                const id = card.getAttribute('data-id');
                window.openTaskDetail(id);
            });
        });
        document.querySelectorAll('.kanban-col').forEach(col => {
            col.addEventListener('dragover', handleDragOver);
            col.addEventListener('dragleave', handleDragLeave);
            col.addEventListener('drop', handleDrop);
        });
    }, 100);

    return `
        <div style="display: flex; gap: var(--space-4); height: calc(100vh - 180px); overflow-x: auto; padding-bottom: 20px;">
            ${columns.map(col => `
                <div style="min-width: 300px; background: var(--bg-body); border-radius: var(--radius-lg); display: flex; flex-direction: column; height: 100%;">
                    <div style="padding: 16px; font-weight: 600; display: flex; justify-content: space-between; align-items: center;">
                         <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="width: 8px; height: 8px; border-radius: 50%; background: ${col.color};"></div>
                            ${col.title} <span class="count-badge">${tasks.filter(t => t.col === col.id).length}</span>
                        </div>
                        <button class="btn btn-ghost" onclick="promptAddTask('${col.id}')"><i class="fa-solid fa-plus"></i></button>
                    </div>
                    
                    <div class="kanban-col" data-col="${col.id}" style="padding: 0 16px 16px 16px; display: flex; flex-direction: column; gap: 12px; overflow-y: auto; flex: 1;">
                        ${tasks.filter(t => t.col === col.id).map(task => `
                            <div class="card card-draggable" draggable="true" data-id="${task.id}" style="padding: 16px; box-shadow: var(--shadow-sm); cursor: pointer; border-left: 3px solid ${getPriorityColor(task.priority)}; transition: transform 0.1s;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span class="badge" style="background: #f1f5f9; color: var(--text-secondary); font-size: 10px;">${task.tag}</span>
                                    <i class="fa-solid fa-pencil" style="font-size: 0.8rem; color: var(--text-light); opacity: 0.5;"></i>
                                </div>
                                <h4 style="font-size: 0.95rem; font-weight: 500; margin-bottom: 12px; color: var(--text-main);">${task.title}</h4>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                                    <div style="display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-light);">
                                        <i class="fa-regular fa-clock"></i> ${task.due}
                                    </div>
                                    <div style="width: 24px; height: 24px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px;">${task.user}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};

function getPriorityColor(p) {
    if (p === 'urgent') return 'var(--accent-red)';
    if (p === 'high') return 'var(--accent-orange)';
    if (p === 'medium') return 'var(--accent-blue)';
    return 'gray';
}
