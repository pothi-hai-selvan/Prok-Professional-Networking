import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  InputField, 
  TextAreaField, 
  SkillsInput, 
  ImageUpload, 
  FormSection 
} from './FormComponents';
import { profileApi } from './api';
import { mockProfile, mockUser, validationRules } from './mockData';
import type { Profile, User, ProfileFormData, ValidationError } from '../../types';

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
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
        // For now, using mock data. Replace with actual API call
        // const profileData = await profileApi.getProfile();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Populate form with mock data
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
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const validateField = (field: string, value: any): string | null => {
    const rules = validationRules[field as keyof typeof validationRules];
    if (!rules) return null;

    if (rules.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    if (typeof value === 'string') {
      if (rules.minLength && value.length < rules.minLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rules.minLength} characters`;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        return `${field.charAt(0).toUpperCase() + field.slice(1)} must be no more than ${rules.maxLength} characters`;
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        return `Please enter a valid ${field}`;
      }
    }

    if (Array.isArray(value) && rules.maxItems && value.length > rules.maxItems) {
      return `You can only add up to ${rules.maxItems} ${field}`;
    }

    return null;
  };

  const validateForm = (): boolean => {
    const errors: ValidationError[] = [];
    
    // Validate each field
    Object.keys(formData).forEach(field => {
      const value = formData[field as keyof ProfileFormData];
      const error = validateField(field, value);
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
        ...prev[parent as keyof ProfileFormData],
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
      
      // For now, simulate API call
      // const response = await profileApi.updateProfile(formData);
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSuccess('Profile updated successfully!');
      setTimeout(() => {
        navigate('/app/profile');
      }, 1500);
    } catch (err) {
      setError('Failed to update profile. Please try again.');
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
    <div className="max-w-4xl mx-auto p-4 pt-8">
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
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
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
              currentImage={imagePreview}
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
                value={formData.contact_info.phone}
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
                value={formData.social_links.linkedin}
                onChange={(value) => handleNestedChange('social_links', 'linkedin', value)}
                placeholder="https://linkedin.com/in/yourprofile"
                error={getFieldError('social_links.linkedin')}
              />
              <InputField
                label="Twitter"
                type="url"
                value={formData.social_links.twitter}
                onChange={(value) => handleNestedChange('social_links', 'twitter', value)}
                placeholder="https://twitter.com/yourhandle"
                error={getFieldError('social_links.twitter')}
              />
              <InputField
                label="GitHub"
                type="url"
                value={formData.social_links.github}
                onChange={(value) => handleNestedChange('social_links', 'github', value)}
                placeholder="https://github.com/yourusername"
                error={getFieldError('social_links.github')}
              />
              <InputField
                label="Website"
                type="url"
                value={formData.social_links.website}
                onChange={(value) => handleNestedChange('social_links', 'website', value)}
                placeholder="https://yourwebsite.com"
                error={getFieldError('social_links.website')}
              />
            </div>
          </FormSection>

          {/* Experience and Education sections would go here */}
          {/* For brevity, I'm focusing on the core functionality */}
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit; 