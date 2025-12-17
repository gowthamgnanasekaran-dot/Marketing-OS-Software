-- MarketingOS Database Schema (PostgreSQL)

-- Users & Roles
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'viewer', -- admin, manager, creator, ops, viewer
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Campaigns
CREATE TABLE campaigns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'planning', -- planning, active, paused, completed
    type VARCHAR(50), -- launch, demand_gen, webinar, content, event
    start_date DATE,
    end_date DATE,
    budget DECIMAL(12, 2) DEFAULT 0.00,
    owner_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task Management
CREATE TABLE kanban_columns (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    position INT NOT NULL,
    color VARCHAR(20)
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    campaign_id INT REFERENCES campaigns(id),
    column_id INT REFERENCES kanban_columns(id),
    priority VARCHAR(20) DEFAULT 'medium', -- low, medium, high, urgent
    due_date DATE,
    assignee_id INT REFERENCES users(id),
    tags TEXT[], -- Array of strings
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subtasks (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE
);

-- Events & Webinars
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    campaign_id INT REFERENCES campaigns(id),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- conference, webinar, dinner, booth
    date TIMESTAMP NOT NULL,
    location VARCHAR(255),
    registrants_count INT DEFAULT 0,
    registrants_goal INT DEFAULT 0,
    status VARCHAR(50) DEFAULT 'planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE speakers (
    id SERIAL PRIMARY KEY,
    event_id INT REFERENCES events(id),
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    company VARCHAR(255),
    is_confirmed BOOLEAN DEFAULT FALSE
);

-- Creative Studio
CREATE TABLE creative_assets (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(500) NOT NULL,
    file_type VARCHAR(50),
    file_size_mb DECIMAL(5, 2),
    folder_path VARCHAR(255) DEFAULT '/',
    uploaded_by INT REFERENCES users(id),
    version INT DEFAULT 1,
    status VARCHAR(50) DEFAULT 'draft', -- draft, review, approved
    campaign_id INT REFERENCES campaigns(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social Media
CREATE TABLE social_posts (
    id SERIAL PRIMARY KEY,
    campaign_id INT REFERENCES campaigns(id),
    channel VARCHAR(50), -- linkedin, twitter, instagram, facebook
    content TEXT,
    media_asset_id INT REFERENCES creative_assets(id),
    scheduled_time TIMESTAMP,
    status VARCHAR(50) DEFAULT 'draft',
    author_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MOPs Hub
CREATE TABLE mop_integrations (
    id SERIAL PRIMARY KEY,
    provider VARCHAR(50) NOT NULL, -- hubspot, salesforce, marketo
    status VARCHAR(50) DEFAULT 'active',
    last_sync TIMESTAMP,
    api_key_ref VARCHAR(255) -- Reference to secure vault
);

CREATE TABLE utm_links (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    source VARCHAR(100),
    medium VARCHAR(100),
    campaign_name VARCHAR(100),
    final_url TEXT NOT NULL,
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reports & Analytics
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(50), -- pipeline, budget, activity
    config JSONB, -- Stores chart configuration
    created_by INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Global
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    title VARCHAR(255),
    message TEXT,
    link VARCHAR(255),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    action VARCHAR(50),
    entity_type VARCHAR(50),
    entity_id INT,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
