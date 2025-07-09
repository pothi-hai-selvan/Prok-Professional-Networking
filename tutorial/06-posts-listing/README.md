# Day 6: Posts Listing UI

## 🎯 Goal

Implement Posts Listing UI (frontend) and integrate with the backend API to fetch existing posts with advanced filtering, sorting, and infinite scroll capabilities.

## 📚 Learning Outcomes

- Create responsive post listing components with modern UI/UX patterns.
- Implement infinite scrolling using Intersection Observer API.
- Handle post data fetching with advanced filtering and sorting.
- Create comprehensive post filtering system (search, category, visibility, tags).
- Implement post sorting with multiple criteria (date, engagement metrics).
- Design efficient data loading with debouncing and lazy loading.
- Implement caching strategies for improved performance.

## 🚀 Getting Started

Ensure your Day 5 Post Creation is complete and tested. You should understand React hooks, API integration, and modern web development patterns. The backend and frontend should be set up and running.

## 🛠️ Tasks

1.  **Create and Switch to a New Branch**

    > **IMPORTANT:** Always create a new branch for each distinct piece of work.

    ```bash
    # First, ensure you are on your 'master' branch and it's up-to-date
    git checkout master
    git pull origin master  # Get any potential updates from your own repository's master

    # Now, create and switch to a new branch for this day's assignment/feature
    git checkout -b day-6-posts-listing
    ```

    > **What's happening?** You're creating an independent line of development for this day's tasks.

2.  **Set Up Development Environment**

    - **Backend Virtual Environment (if not already active):**
      ```bash
      cd backend
      source venv/bin/activate  # On Windows use: venv\Scripts\activate
      ```
    - **Install Additional Dependencies:**
      ```bash
      pip install Flask Flask-SQLAlchemy Flask-Migrate
      ```
    - **Frontend (already set up from previous days):**
      - Ensure your frontend directory has all Node.js dependencies installed via:
        ```bash
        npm install
        ```

3.  **Frontend Implementation**

    - **Create Post List Component:**

      - Design a responsive list component for displaying posts with modern card-based layout.
      - Implement infinite scroll functionality using Intersection Observer API.
      - Add comprehensive UI elements for post filtering (search, category, visibility, tags).
      - Implement sorting options with visual indicators.
      - Add appropriate loading states, error handling, and empty states.
      - Implement lazy loading for images to improve performance.

    - **Create Custom Hooks:**

      - Implement `useDebounce` hook for search input debouncing.
      - Implement `useInfiniteScroll` hook for seamless pagination.
      - Create reusable components for common UI patterns.

    - **Performance Optimizations:**
      - Implement request debouncing (500ms delay) for search and filter inputs.
      - Add lazy loading for images using Intersection Observer.
      - Optimize React component re-renders with proper state management.
      - Implement efficient data fetching with proper error boundaries.

4.  **Backend Integration**

    - **Create Post Listing Endpoints:**

      - Implement the `GET /api/posts` endpoint with advanced filtering and sorting.
      - Support pagination using `page` and `per_page` query parameters.
      - Add filtering by category, visibility, search terms, and tags.
      - Implement sorting by multiple criteria (created_at, likes_count, views_count, etc.).
      - Optimize database queries using SQLAlchemy with proper indexing.
      - Implement data caching for frequently accessed data (categories, popular tags).

    - **Additional Endpoints:**
      - `GET /api/posts/categories` - Get all available categories.
      - `GET /api/posts/popular-tags` - Get most popular tags.
      - Implement cache invalidation when posts are modified.

5.  **Performance Optimization**

    - Implement lazy loading for images and data within the post list.
    - Add request debouncing for filters and search inputs (500ms delay).
    - Utilize infinite scrolling with Intersection Observer for efficient rendering.
    - Optimize API calls with proper caching strategies.
    - Implement efficient React component re-renders with proper state management.
    - Add loading indicators and skeleton screens for better UX.

6.  **Run the Application**

    ```bash
    # Start the backend server (in one terminal)
    cd backend
    source venv/bin/activate
    flask run

    # Start the frontend development server (in another terminal)
    cd frontend
    npm run dev
    ```

    The application will be available at:

    - Frontend: `http://localhost:3000/posts`
    - Backend API: `http://localhost:5000`

7.  **Testing**

    - Test infinite scroll functionality with large data sets.
    - Test filtering and sorting functionality with various criteria.
    - Test search functionality with different query terms.
    - Test loading and error states are displayed correctly during data fetching.
    - Test lazy loading of images and media content.
    - Test debouncing behavior for search inputs.
    - Test overall performance and responsiveness of the post listing UI.
    - Test cache functionality and invalidation.

## 🔄 Git Workflow

1.  **Develop and Save Your Progress**

    ```bash
    git add .
    git commit -m "Day 6: Implement posts listing UI with advanced filtering, sorting, and infinite scroll"
    ```

2.  **Push Your Changes to Your Repository**

    ```bash
    git push -u origin day-6-posts-listing
    ```

3.  **Merge After Completion**

    ```bash
    git checkout master
    git pull origin master
    git merge day-6-posts-listing
    git push origin master
    ```

## 📸 Preview

<img src="posts-listing.png" alt="Posts Listing UI" width="120"/>

![Posts Listing Desktop View](post-listing-desk.png)
![Posts Listing Mobile View](post-listing-mobile.png)

## 🏗️ Architecture Overview

This implementation includes:

- **Frontend Components:**

  - `PostList.tsx` - Main listing component with infinite scroll
  - `PostFilters.tsx` - Comprehensive filtering interface
  - `LazyImage.tsx` - Lazy loading image component
  - Custom hooks for debouncing and infinite scroll

- **Backend Features:**

  - Advanced filtering and sorting API endpoints
  - In-memory caching for performance
  - Optimized database queries
  - Cache invalidation strategies

- **Performance Features:**
  - Request debouncing (500ms)
  - Lazy loading with Intersection Observer
  - Infinite scroll pagination
  - Efficient state management

## ✅ Deliverable

A performant and responsive post listing system with:

- ✅ Infinite scrolling with smooth UX.
- ✅ Comprehensive filtering (search, category, visibility, tags).
- ✅ Advanced sorting options (date, engagement metrics).
- ✅ Efficient data loading with debouncing.
- ✅ Lazy loading for images and media.
- ✅ Proper error handling and loading states.
- ✅ Caching strategies for improved performance.
- ✅ Clean, documented, and maintainable code.
- ✅ All tests passing and responsive design.

## 🚀 Next Steps

After completing this module, you'll have a robust posts listing system that can handle:

- Large datasets with efficient pagination
- Complex filtering and sorting requirements
- High-performance image loading
- Modern UX patterns with smooth interactions

This foundation will be essential for building more advanced features like real-time updates, advanced search, and social interactions.
