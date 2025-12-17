# MarketingOS Backend Setup

The backend code is generated in the `backend/` directory.

### Prerequisites
- Node.js installed
- PostgreSQL installed and running (default port 5432)

### Setup Steps

1. **Install Dependencies**
   Navigate to the backend folder and install packages:
   ```bash
   cd backend
   npm init -y
   npm install express pg cors dotenv bcryptjs jsonwebtoken helmet morgan
   ```

2. **Initialize Database**
   Log in to PostgreSQL and create the database:
   ```sql
   CREATE DATABASE marketing_os;
   ```
   Then run the `schema.sql` file to create tables:
   ```bash
   psql -U postgres -d marketing_os -f schema.sql
   ```

3. **Configure Environment**
   Create a `.env` file in `backend/` with:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_NAME=marketing_os
   JWT_SECRET=supersecretkey
   ```

4. **Run Server**
   ```bash
   node server.js
   ```

The API will be available at `http://localhost:5000/`.
The frontend (when updated to fetch from API) will connect to this server.
