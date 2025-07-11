const API_URL = '/api';

export const profileApi = {
  getProfile: async () => {
    const response = await fetch(`${API_URL}/profile`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    return response.json();
  },

  updateProfile: async (profileData: any) => {
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
      body: JSON.stringify(profileData),
    });
    return response.json();
  },

  getActivities: async (page = 1, limit = 10) => {
    const response = await fetch(`${API_URL}/profile/activities?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    return response.json();
  },

  getPosts: async (page = 1, limit = 10) => {
    const response = await fetch(`${API_URL}/profile/posts?page=${page}&limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    return response.json();
  },

  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(`${API_URL}/profile/image`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        // Do NOT set 'Content-Type' here!
      },
      credentials: 'include',
      body: formData,
    });
    return response.json();
  },

  getProfileById: async (userId: string) => {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    return response.json();
  },

  connectWithUser: async (userId: string) => {
    const response = await fetch(`${API_URL}/profile/${userId}/connect`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
    });
    return response.json();
  },

  sendMessage: async (userId: string, message: string) => {
    const response = await fetch(`${API_URL}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      credentials: 'include',
      body: JSON.stringify({
        receiver_id: userId,
        content: message,
      }),
    });
    return response.json();
  },
}; 