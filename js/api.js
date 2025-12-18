const API_URL = 'http://localhost:5000/api';

window.api = {
    token: localStorage.getItem('auth_token'),
    user: JSON.parse(localStorage.getItem('auth_user') || 'null'),

    headers() {
        return {
            'Content-Type': 'application/json',
            'x-auth-token': this.token
        };
    },

    async login(email, password) {
        try {
            const res = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            this.setSession(data.token, data.user);
            return data;
        } catch (err) {
            throw err;
        }
    },

    async register(name, email, password) {
        try {
            const res = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            return data;
        } catch (err) {
            throw err;
        }
    },

    setSession(token, user) {
        this.token = token;
        this.user = user;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(user));
    },

    logout() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        window.location.reload();
    },

    // Generic Fetch Wrapper
    async get(endpoint) {
        const res = await fetch(`${API_URL}${endpoint}`, { headers: this.headers() });
        if (res.status === 401) this.logout();
        return res.json();
    },

    async post(endpoint, body) {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: this.headers(),
            body: JSON.stringify(body)
        });
        if (res.status === 401) this.logout();
        return res.json();
    }
};
