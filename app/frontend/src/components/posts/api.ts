const API_URL = 'http://localhost:5000';

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

  // Get all posts with pagination
  getPosts: async (page = 1, perPage = 10) => {
    const response = await fetch(
      `${API_URL}/api/posts?page=${page}&per_page=${perPage}`
    );

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