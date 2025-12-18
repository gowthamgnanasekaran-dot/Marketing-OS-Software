window.MarketingOS = window.MarketingOS || { views: {} };

window.MarketingOS.views.auth = function () {
    return `
        <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #f8fafc;">
            <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); width: 100%; max-width: 400px;">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <div style="width: 48px; height: 48px; background: var(--primary); border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                        <i class="fa-solid fa-bolt" style="color: white; font-size: 24px;"></i>
                    </div>
                    <h2 style="font-size: 1.5rem; font-weight: 600; color: var(--text-primary);">Welcome Back</h2>
                    <p style="color: var(--text-secondary);">Sign in to MarketingOS</p>
                </div>

                <form id="login-form" onsubmit="handleLogin(event)">
                    <div style="margin-bottom: 1rem;">
                        <label style="display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 0.5rem;">Email</label>
                        <input type="email" id="email" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-light); border-radius: 6px;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <label style="display: block; font-size: 0.9rem; font-weight: 500; margin-bottom: 0.5rem;">Password</label>
                        <input type="password" id="password" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-light); border-radius: 6px;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; padding: 0.75rem;">Sign In</button>
                    <p id="auth-error" style="color: #ef4444; font-size: 0.9rem; text-align: center; margin-top: 1rem; display: none;"></p>
                </form>
                
                <div style="margin-top: 1.5rem; text-align: center; font-size: 0.9rem; color: var(--text-secondary);">
                    Don't have an account? <a href="#" onclick="toggleRegister()" style="color: var(--primary); text-decoration: none; font-weight: 500;">Create one</a>
                </div>
            </div>
        </div>
    `;
};

window.handleLogin = async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorEl = document.getElementById('auth-error');

    try {
        errorEl.style.display = 'none';
        await window.api.login(email, password);
        window.location.reload(); // Reload to initialize full app
    } catch (err) {
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
    }
};

window.toggleRegister = function () {
    alert("In this demo, please use specific credentials or I can add a register view. For now, try creating a user via API manually/Postman or just tell the agent to create a seed user.");
};
