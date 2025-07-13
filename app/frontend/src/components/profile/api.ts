const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const profileApi = {
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_URL}/api/profile`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profile');
    }

    return response.json();
  },

  // Update user profile with optional image upload
  updateProfile: async (formData: FormData) => {
    const response = await fetch(`${API_URL}/api/profile`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update profile');
    }

    return response.json();
  },

  // Upload avatar image only
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);

    const response = await fetch(`${API_URL}/api/profile/avatar`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to upload avatar');
    }

    return response.json();
  },
}; 