# Technical Specification: Prok Professional Networking Platform (Tutorial Version)

## 1. Architecture Overview

### System Architecture

- Frontend: React (with Tailwind CSS)
- Backend: Flask (Python)
- Database: MySQL (or SQLite for simplicity)
- Simple REST API (no advanced security or real-time features)

## 2. Technology Stack

- React 18.x
- Tailwind CSS
- Flask (Python)
- SQLAlchemy (ORM)
- MySQL or SQLite

## 3. API Design (Sample)

### Authentication

```
POST /api/auth/register
POST /api/auth/login
```

### User Management

```
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
```

### Posts

```
GET    /api/posts
POST   /api/posts
```

### Connections

```
GET    /api/connections
POST   /api/connections
```

### Messaging

```
GET    /api/messages
POST   /api/messages
```

### Jobs

```
GET    /api/jobs
POST   /api/jobs
```

## 4. Database Schema (Sample)

### Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    headline VARCHAR(255),
    bio TEXT
);
```

### Posts Table

```sql
CREATE TABLE posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Connections Table

```sql
CREATE TABLE connections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Messages Table

```sql
CREATE TABLE messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id INTEGER NOT NULL,
    receiver_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs Table

```sql
CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 5. Security Considerations

- Basic password hashing (bcrypt)
- No advanced security or production hardening

## 6. Out of Scope

- Advanced security, image optimization, accessibility, analytics, admin dashboards, real-time features, or production deployment

---

This technical spec is simplified for tutorial and learning purposes. Ignore advanced/production requirements from previous versions.
