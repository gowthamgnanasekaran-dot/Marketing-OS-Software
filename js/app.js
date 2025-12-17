window.MarketingOS = window.MarketingOS || { views: {} };

const routes = {
    '/': { title: 'Dashboard', view: 'dashboard' },
    '/campaigns': { title: 'Campaigns', view: 'campaigns' },
    '/calendar': { title: 'Calendar', view: 'calendar' },
    '/tasks': { title: 'Tasks', view: 'tasks' },
    '/creative': { title: 'Creative Studio', view: 'creative' },
    '/mops': { title: 'MOPs Hub', view: 'mops' },
    '/reports': { title: 'Reports & Analytics', view: 'reports' },
    '/events': { title: 'Events & Webinars', view: 'events' },
    '/social': { title: 'Social Media', view: 'social' },
};

const navItems = [
    { label: 'Dashboard', icon: 'fa-solid fa-chart-pie', path: '/' },
    { label: 'Campaigns', icon: 'fa-solid fa-bullhorn', path: '/campaigns' },
    { label: 'Calendar', icon: 'fa-regular fa-calendar', path: '/calendar' },
    { label: 'Tasks', icon: 'fa-solid fa-list-check', path: '/tasks' },
    { label: 'Creative', icon: 'fa-solid fa-palette', path: '/creative' },
    { label: 'Events', icon: 'fa-solid fa-ticket', path: '/events' },
    { label: 'Social', icon: 'fa-brands fa-twitter', path: '/social' },
    { label: 'MOPs Hub', icon: 'fa-solid fa-gears', path: '/mops' },
    { label: 'Reports', icon: 'fa-solid fa-chart-line', path: '/reports' },
];

function init() {
    renderSidebar();

    // Initial Route
    handleNavigation(window.location.hash || '/');

    // Hash Change Listener
    window.addEventListener('hashchange', () => {
        handleNavigation(window.location.hash.slice(1) || '/');
    });
}

function renderSidebar() {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    navContainer.innerHTML = navItems.map(item => `
        <a href="#${item.path}" class="nav-item ${isRouteActive(item.path) ? 'active' : ''}" data-path="${item.path}">
            <i class="${item.icon}"></i>
            <span>${item.label}</span>
        </a>
    `).join('');
}

function isRouteActive(path) {
    const currentHash = window.location.hash || '/';
    const targetHash = '#' + path;
    const isRoot = path === '/' && (currentHash === '' || currentHash === '#/');
    return currentHash === targetHash || isRoot;
}

function handleNavigation(path) {
    // Normalize path (handle #)
    let routePath = path.startsWith('#') ? path.slice(1) : path;
    if (routePath === '' || routePath === '/') routePath = '/';

    const route = routes[routePath];

    if (!route) {
        // 404
        document.getElementById('page-title').textContent = 'Not Found';
        document.getElementById('main-content').innerHTML = '<h2>404 - Page Not Found</h2>';
        return;
    }

    // Update Title
    document.getElementById('page-title').textContent = route.title;

    // Update Active Nav State
    document.querySelectorAll('.nav-item').forEach(el => {
        el.classList.remove('active');
        if (el.getAttribute('data-path') === routePath) {
            el.classList.add('active');
        }
    });

    // Render Content
    const contentContainer = document.getElementById('main-content');
    const viewRenderFn = window.MarketingOS.views[route.view];

    if (viewRenderFn) {
        contentContainer.innerHTML = viewRenderFn();
    } else {
        contentContainer.innerHTML = `
            <div style="text-align: center; padding: 4rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-med);"><i class="fa-solid fa-hammer"></i></div>
                <h3>Coming Soon</h3>
                <p style="color: var(--text-secondary);">The ${route.title} module is currently under development.</p>
            </div>
        `;
    }
}

// Ensure init runs after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
