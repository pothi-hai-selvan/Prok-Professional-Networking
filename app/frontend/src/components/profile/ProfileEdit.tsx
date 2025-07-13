import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProfileFormData, ValidationError } from '../../types';
import { InputField, TextAreaField, SkillsInput, ImageUpload, FormSection } from './FormComponents';

// Mock data for development
const mockUser = {
  name: 'Demo User',
  email: 'demo@example.com'
};

const mockProfile = {
  bio: 'Experienced software engineer with a passion for building scalable web applications.',
  title: 'Senior Software Engineer',
  location: 'San Francisco, CA',
  skills: ['React', 'Node.js', 'Python', 'AWS'],
  experience: [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp',
      start_date: '2022-01-01',
      end_date: '',
      description: 'Leading development of scalable web applications.'
    }
  ],
  education: [
    {
      id: 1,
      school: 'University of Technology',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      start_date: '2016-09-01',
      end_date: '2020-05-01'
    }
  ],
  social_links: {
    linkedin: '',
    twitter: '',
    github: '',
    website: ''
  },
  contact_info: {
    email: 'demo@example.com',
    phone: '',
    location: 'San Francisco, CA'
  },
  avatar_url: null
};

// Mock API for development
const profileApi = {
  getProfile: async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      user: mockUser,
      ...mockProfile
    };
  },
  updateProfile: async (data: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Profile updated:', data);
    return { success: true };
  }
};

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);

  // Form state
  const [formData, setFormData] = useState<ProfileFormData>({
    name: '',
    email: '',
    bio: '',
    title: '',
    location: '',
    skills: [],
    experience: [],
    education: [],
    social_links: {
      linkedin: '',
      twitter: '',
      github: '',
      website: ''
    },
    contact_info: {
      email: '',
      phone: '',
      location: ''
    }
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Try to load from backend API first
        try {
          const profileData = await profileApi.getProfile();
          setFormData({
            name: profileData.user?.name || mockUser.name,
            email: profileData.user?.email || mockUser.email,
            bio: profileData.bio || '',
            title: profileData.title || '',
            location: profileData.location || '',
            skills: profileData.skills || [],
            experience: profileData.experience || [],
            education: profileData.education || [],
            social_links: profileData.social_links || {
              linkedin: '',
              twitter: '',
              github: '',
              website: ''
            },
            contact_info: profileData.contact_info || {
              email: profileData.user?.email || mockUser.email,
              phone: '',
              location: ''
            }
          });

          if (profileData.avatar_url) {
            setImagePreview(profileData.avatar_url);
          }
        } catch (apiError) {
          console.log('API not available, using localStorage fallback');
          // Fall back to localStorage if API fails
          const savedProfile = localStorage.getItem('userProfile');
          if (savedProfile) {
            const parsedProfile = JSON.parse(savedProfile);
            setFormData(parsedProfile);
            if (parsedProfile.avatar_url) {
              setImagePreview(parsedProfile.avatar_url);
            }
          } else {
            // Use mock data as final fallback
            setFormData({
              name: mockUser.name,
              email: mockUser.email,
              bio: mockProfile.bio || '',
              title: mockProfile.title || '',
              location: mockProfile.location || '',
              skills: mockProfile.skills || [],
              experience: mockProfile.experience || [],
              education: mockProfile.education || [],
              social_links: mockProfile.social_links || {
                linkedin: '',
                twitter: '',
                github: '',
                website: ''
              },
              contact_info: mockProfile.contact_info || {
                email: mockUser.email,
                phone: '',
                location: ''
              }
            });

            if (mockProfile.avatar_url) {
              setImagePreview(mockProfile.avatar_url);
            }
          }
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const validateField = (field: string, value: any, rules: any): string | null => {
    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (typeof value === 'string' && value.trim() !== '') {
      if ('minLength' in rules && rules.minLength && value.length < rules.minLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`;
      }
      if ('maxLength' in rules && rules.maxLength && value.length > rules.maxLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${rules.maxLength} characters`;
      }
      if ('pattern' in rules && rules.pattern && !rules.pattern.test(value)) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} format is invalid`;
      }
    }

    if (Array.isArray(value) && 'maxItems' in rules && rules.maxItems && value.length > rules.maxItems) {
      return `You can only add up to ${rules.maxItems} ${field}`;
    }

    return null;
  };

  const validationRules = {
    name: { required: true, minLength: 2, maxLength: 50 },
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    bio: { maxLength: 500 },
    title: { maxLength: 100 },
    location: { maxLength: 100 },
    skills: { maxItems: 10 },
    phone: { pattern: /^[\+]?[1-9][\d]{0,15}$/ },
    linkedin: { pattern: /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/ },
    twitter: { pattern: /^https?:\/\/(www\.)?twitter\.com\/[a-zA-Z0-9_]+\/?$/ },
    github: { pattern: /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+\/?$/ },
    website: { pattern: /^https?:\/\/.+/ }
  };

  const validateForm = (): boolean => {
    const errors: ValidationError[] = [];
    
    // Validate each field
    Object.keys(formData).forEach(field => {
      const value = formData[field as keyof ProfileFormData];
      const error = validateField(field, value, validationRules[field as keyof typeof validationRules]);
      if (error) {
        errors.push({ field, message: error });
      }
    });

    // Validate nested objects
    Object.keys(formData.social_links).forEach(field => {
      const value = formData.social_links[field as keyof typeof formData.social_links];
      if (value && !value.startsWith('http')) {
        errors.push({ 
          field: `social_links.${field}`, 
          message: 'Please enter a valid URL starting with http:// or https://' 
        });
      }
    });

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const getFieldError = (field: string): string | undefined => {
    return validationErrors.find(error => error.field === field)?.message;
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear validation error for this field
    setValidationErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof ProfileFormData] as any,
        [field]: value
      }
    }));

    // Clear validation error for this field
    setValidationErrors(prev => prev.filter(error => error.field !== `${parent}.${field}`));
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);
      
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all form fields
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('skills', JSON.stringify(formData.skills));
      formDataToSend.append('experience', JSON.stringify(formData.experience));
      formDataToSend.append('education', JSON.stringify(formData.education));
      formDataToSend.append('social_links', JSON.stringify(formData.social_links));
      formDataToSend.append('contact_info', JSON.stringify(formData.contact_info));
      
      // Add image if selected
      if (selectedImage) {
        formDataToSend.append('avatar', selectedImage);
      }
      
      // Try to save to backend API first
      try {
        await profileApi.updateProfile(formDataToSend);
        setSuccess('Profile updated successfully!');
      } catch (apiError) {
        console.log('API not available, saving to localStorage');
        // Fall back to localStorage if API fails
        const profileDataToSave = {
          ...formData,
          avatar_url: imagePreview,
          updated_at: new Date().toISOString()
        };
        
        localStorage.setItem('userProfile', JSON.stringify(profileDataToSave));
        localStorage.setItem('profileData', JSON.stringify(profileDataToSave));
        setSuccess('Profile updated successfully! (Saved locally)');
      }
      
      setTimeout(() => {
        navigate('/app/profile');
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/app/profile');
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="animate-pulse">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-8 mb-6"></div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto p-4 pt-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
            <div className="flex space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors flex items-center"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-md p-4">
              <div className="flex">
                <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-green-800">{success}</p>
              </div>
            </div>
          )}

          {/* Basic Information */}
          <FormSection title="Basic Information">
            <ImageUpload
              currentImage={imagePreview || undefined}
              onImageChange={handleImageChange}
              error={getFieldError('avatar')}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Full Name"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                required
                error={getFieldError('name')}
                maxLength={50}
              />
              <InputField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                required
                error={getFieldError('email')}
              />
            </div>

            <InputField
              label="Professional Title"
              value={formData.title}
              onChange={(value) => handleInputChange('title', value)}
              placeholder="e.g., Senior Software Engineer"
              error={getFieldError('title')}
              maxLength={100}
            />

            <InputField
              label="Location"
              value={formData.location}
              onChange={(value) => handleInputChange('location', value)}
              placeholder="e.g., San Francisco, CA"
              error={getFieldError('location')}
              maxLength={100}
            />

            <TextAreaField
              label="Bio"
              value={formData.bio}
              onChange={(value) => handleInputChange('bio', value)}
              placeholder="Tell us about yourself..."
              error={getFieldError('bio')}
              maxLength={500}
              rows={4}
            />

            <SkillsInput
              skills={formData.skills}
              onChange={(skills) => handleInputChange('skills', skills)}
              error={getFieldError('skills')}
              maxSkills={10}
            />
          </FormSection>

          {/* Contact Information */}
          <FormSection title="Contact Information" collapsible defaultOpen={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="Email"
                type="email"
                value={formData.contact_info.email}
                onChange={(value) => handleNestedChange('contact_info', 'email', value)}
                required
                error={getFieldError('contact_info.email')}
              />
              <InputField
                label="Phone"
                type="tel"
                value={formData.contact_info.phone || ''}
                onChange={(value) => handleNestedChange('contact_info', 'phone', value)}
                placeholder="+1 (555) 123-4567"
                error={getFieldError('contact_info.phone')}
              />
            </div>
            <InputField
              label="Location"
              value={formData.contact_info.location}
              onChange={(value) => handleNestedChange('contact_info', 'location', value)}
              placeholder="e.g., San Francisco, CA"
              error={getFieldError('contact_info.location')}
            />
          </FormSection>

          {/* Social Links */}
          <FormSection title="Social Links" collapsible defaultOpen={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="LinkedIn"
                type="url"
                value={formData.social_links.linkedin || ''}
                onChange={(value) => handleNestedChange('social_links', 'linkedin', value)}
                placeholder="https://linkedin.com/in/yourprofile"
                error={getFieldError('social_links.linkedin')}
              />
              <InputField
                label="Twitter"
                type="url"
                value={formData.social_links.twitter || ''}
                onChange={(value) => handleNestedChange('social_links', 'twitter', value)}
                placeholder="https://twitter.com/yourhandle"
                error={getFieldError('social_links.twitter')}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField
                label="GitHub"
                type="url"
                value={formData.social_links.github || ''}
                onChange={(value) => handleNestedChange('social_links', 'github', value)}
                placeholder="https://github.com/yourusername"
                error={getFieldError('social_links.github')}
              />
              <InputField
                label="Website"
                type="url"
                value={formData.social_links.website || ''}
                onChange={(value) => handleNestedChange('social_links', 'website', value)}
                placeholder="https://yourwebsite.com"
                error={getFieldError('social_links.website')}
              />
            </div>
          </FormSection>

          {/* Experience */}
          <FormSection title="Experience" collapsible defaultOpen={false}>
            <div className="space-y-4">
              {formData.experience.map((exp, index) => (
                <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Company"
                      value={exp.company}
                      onChange={(value) => {
                        const newExperience = [...formData.experience];
                        newExperience[index] = { ...exp, company: value };
                        handleInputChange('experience', newExperience);
                      }}
                    />
                    <InputField
                      label="Position"
                      value={exp.title || ''}
                      onChange={(value) => {
                        const newExperience = [...formData.experience];
                        newExperience[index] = { ...exp, title: value } as any;
                        handleInputChange('experience', newExperience);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InputField
                      label="Start Date"
                      type="date"
                      value={exp.start_date}
                      onChange={(value) => {
                        const newExperience = [...formData.experience];
                        newExperience[index] = { ...exp, start_date: value };
                        handleInputChange('experience', newExperience);
                      }}
                    />
                    <InputField
                      label="End Date"
                      type="date"
                      value={exp.end_date || ''}
                      onChange={(value) => {
                        const newExperience = [...formData.experience];
                        newExperience[index] = { ...exp, end_date: value } as any;
                        handleInputChange('experience', newExperience);
                      }}
                    />
                  </div>
                  <TextAreaField
                    label="Description"
                    value={exp.description}
                    onChange={(value) => {
                      const newExperience = [...formData.experience];
                      newExperience[index] = { ...exp, description: value };
                      handleInputChange('experience', newExperience);
                    }}
                    rows={3}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newExperience = formData.experience.filter((_, i) => i !== index);
                      handleInputChange('experience', newExperience);
                    }}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Experience
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newExperience = [...formData.experience, {
                    id: Date.now(), // Assign a unique ID
                    company: '',
                    title: '',
                    start_date: '',
                    end_date: '',
                    description: ''
                  }];
                  handleInputChange('experience', newExperience);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
              >
                + Add Experience
              </button>
            </div>
          </FormSection>

          {/* Education */}
          <FormSection title="Education" collapsible defaultOpen={false}>
            <div className="space-y-4">
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      label="Institution"
                      value={edu.school || ''}
                      onChange={(value) => {
                        const newEducation = [...formData.education];
                        newEducation[index] = { ...edu, school: value } as any;
                        handleInputChange('education', newEducation);
                      }}
                    />
                    <InputField
                      label="Degree"
                      value={edu.degree}
                      onChange={(value) => {
                        const newEducation = [...formData.education];
                        newEducation[index] = { ...edu, degree: value };
                        handleInputChange('education', newEducation);
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <InputField
                      label="Field of Study"
                      value={edu.field || ''}
                      onChange={(value) => {
                        const newEducation = [...formData.education];
                        newEducation[index] = { ...edu, field: value } as any;
                        handleInputChange('education', newEducation);
                      }}
                    />
                    <InputField
                      label="Graduation Year"
                      type="number"
                      value={edu.end_date || ''}
                      onChange={(value) => {
                        const newEducation = [...formData.education];
                        newEducation[index] = { ...edu, end_date: value } as any;
                        handleInputChange('education', newEducation);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newEducation = formData.education.filter((_, i) => i !== index);
                      handleInputChange('education', newEducation);
                    }}
                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove Education
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  const newEducation = [...formData.education, {
                    id: Date.now(), // Assign a unique ID
                    school: '',
                    degree: '',
                    field: '',
                    start_date: '',
                    end_date: ''
                  }];
                  handleInputChange('education', newEducation);
                }}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-800 transition-colors"
              >
                + Add Education
              </button>
            </div>
          </FormSection>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit; 