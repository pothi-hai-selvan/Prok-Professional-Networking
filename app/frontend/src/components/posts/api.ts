const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

interface FilterOptions {
  search?: string;
  category?: string;
  visibility?: string;
  tags?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export const postApi = {
  // Create a new post
  createPost: async (formData: FormData) => {
    const response = await fetch(`${API_URL}/api/posts`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create post');
    }

    return response.json();
  },

  // Get all posts with advanced filtering and pagination
  getPosts: async (page = 1, perPage = 10, filters?: FilterOptions) => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (filters) {
      if (filters.search) params.append('search', filters.search);
      if (filters.category) params.append('category', filters.category);
      if (filters.visibility) params.append('visibility', filters.visibility);
      if (filters.tags && filters.tags.length > 0) {
        filters.tags.forEach(tag => params.append('tags', tag));
      }
      if (filters.sortBy) params.append('sort_by', filters.sortBy);
      if (filters.sortOrder) params.append('sort_order', filters.sortOrder);
    }

    const response = await fetch(`${API_URL}/api/posts?${params.toString()}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch posts');
    }

    return response.json();
  },

  // Get a specific post by ID
  getPost: async (postId: number) => {
    const response = await fetch(`${API_URL}/api/posts/${postId}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch post');
    }

    return response.json();
  },

  // Delete a post
  deletePost: async (postId: number) => {
    const response = await fetch(`${API_URL}/api/posts/${postId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete post');
    }

    return response.json();
  },

  // Get post categories
  getCategories: async () => {
    const response = await fetch(`${API_URL}/api/posts/categories`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch categories');
    }

    return response.json();
  },

  // Get popular tags
  getPopularTags: async () => {
    const response = await fetch(`${API_URL}/api/posts/popular-tags`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch popular tags');
    }

    return response.json();
  },

  // Like a post (placeholder for future implementation)
  likePost: async (postId: number) => {
    const response = await fetch(`${API_URL}/api/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to like post');
    }

    return response.json();
  },

  // Unlike a post (placeholder for future implementation)
  unlikePost: async (postId: number) => {
    const response = await fetch(`${API_URL}/api/posts/${postId}/unlike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to unlike post');
    }

    return response.json();
  },
}; 