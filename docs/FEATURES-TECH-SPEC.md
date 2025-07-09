# Features Technical Specification (Tutorial Version)

## Overview

This document provides technical guidance for building a tutorial-based, fullstack professional networking app. The focus is on helping students learn core concepts, not on production-level architecture or optimizations.

## 1. User Authentication & Profile Management

### Authentication

- Simple JWT-based login/register endpoints (Flask backend)
- Store user info in a basic SQL table

### Profile

- CRUD endpoints for profile (name, headline, bio, skills)
- Optional: profile picture upload

## 2. Feed & Content

- Endpoints to create, list, and like posts
- Simple data models for posts and comments

## 3. Connections

- Endpoints to send/accept connection requests
- List connections for a user

## 4. Job Board

- Endpoints to list jobs, apply to jobs, and view applications
- Simple job and application models

## 5. Messaging

- Endpoints to send and view messages (no real-time required)

## 6. Responsive UI

- Use React + Tailwind CSS
- Layouts adapt to mobile, tablet, desktop
- Navigation changes based on device size

## 7. Success Metrics (Student Learning)

- Students can:
  - Build and connect frontend and backend for each feature
  - Make the UI responsive
  - Explain how data flows between client and server

## 8. Out of Scope

- Advanced security, image optimization, accessibility, analytics, admin dashboards, real-time features, or production deployment

---

This technical spec is simplified for tutorial and learning purposes. Ignore advanced/production requirements from previous versions.
