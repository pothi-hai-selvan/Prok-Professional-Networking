import { useState, useEffect } from 'react';

export interface ProfileData {
  name: string;
  email: string;
  bio: string;
  title: string;
  location: string;
  skills: string[];
  experience: Array<{
    company: string;
    position: string;
    start_date: string;
    end_date: string;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field_of_study: string;
    graduation_year: string;
  }>;
  social_links: {
    linkedin: string;
    twitter: string;
    github: string;
    website: string;
  };
  contact_info: {
    email: string;
    phone: string;
    location: string;
  };
  avatar_url?: string;
  updated_at?: string;
}

const defaultProfileData: ProfileData = {
  name: 'John Doe',
  email: 'john@example.com',
  bio: 'Experienced software engineer with a passion for building scalable web applications and working with cross-functional teams. Skilled in React, Node.js, Python, and cloud technologies. Always eager to learn and take on new challenges.',
  title: 'Senior Software Engineer at TechCorp',
  location: 'San Francisco, CA',
  skills: ['React', 'Node.js', 'Python', 'AWS'],
  experience: [
    {
      company: 'TechCorp',
      position: 'Senior Software Engineer',
      start_date: '2022-01-01',
      end_date: '',
      description: 'Leading development of scalable web applications using React and Node.js.'
    }
  ],
  education: [
    {
      institution: 'University of Technology',
      degree: 'Bachelor of Science',
      field_of_study: 'Computer Science',
      graduation_year: '2020'
    }
  ],
  social_links: {
    linkedin: '',
    twitter: '',
    github: '',
    website: ''
  },
  contact_info: {
    email: 'john@example.com',
    phone: '',
    location: 'San Francisco, CA'
  }
};

export const useProfileData = () => {
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfileData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load profile data from localStorage
    const savedProfile = localStorage.getItem('profileData');
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setProfileData({ ...defaultProfileData, ...parsedProfile });
      } catch (error) {
        console.error('Error parsing saved profile data:', error);
        setProfileData(defaultProfileData);
      }
    } else {
      setProfileData(defaultProfileData);
    }
    setLoading(false);
  }, []);

  const updateProfileData = (newData: Partial<ProfileData>) => {
    const updatedData = { ...profileData, ...newData, updated_at: new Date().toISOString() };
    setProfileData(updatedData);
    localStorage.setItem('profileData', JSON.stringify(updatedData));
    localStorage.setItem('userProfile', JSON.stringify(updatedData));
  };

  const saveProfileData = (data: ProfileData) => {
    const dataToSave = { ...data, updated_at: new Date().toISOString() };
    setProfileData(dataToSave);
    localStorage.setItem('profileData', JSON.stringify(dataToSave));
    localStorage.setItem('userProfile', JSON.stringify(dataToSave));
  };

  return {
    profileData,
    loading,
    updateProfileData,
    saveProfileData
  };
}; 