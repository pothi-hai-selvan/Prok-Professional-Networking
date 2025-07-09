import type { Profile, Activity, User, Post } from '../../types';

export const mockUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  created_at: '2024-01-15T10:30:00Z'
};

export const mockProfile: Profile = {
  id: 1,
  user_id: 1,
  bio: 'Passionate software engineer with 5+ years of experience in full-stack development. I love building scalable applications and contributing to open-source projects.',
  title: 'Senior Software Engineer',
  location: 'San Francisco, CA',
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'],
  experience: [
    {
      id: 1,
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      start_date: '2022-01-01',
      end_date: '2024-12-31',
      description: 'Led development of microservices architecture, mentored junior developers, and improved system performance by 40%.'
    },
    {
      id: 2,
      title: 'Software Engineer',
      company: 'StartupXYZ',
      start_date: '2020-03-01',
      end_date: '2021-12-31',
      description: 'Built and maintained React-based frontend applications, implemented CI/CD pipelines, and collaborated with cross-functional teams.'
    }
  ],
  education: [
    {
      id: 1,
      school: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      start_date: '2016-09-01',
      end_date: '2020-06-01'
    }
  ],
  social_links: {
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
    website: 'https://johndoe.dev'
  },
  contact_info: {
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  },
  connections_count: 342,
  mutual_connections: 15
};

export const mockActivities: Activity[] = [
  {
    id: 1,
    type: 'post',
    content: 'Just published a new article about React performance optimization techniques. Check it out!',
    created_at: '2024-01-20T14:30:00Z',
    related_post: {
      id: 1,
      user_id: 1,
      content: 'Just published a new article about React performance optimization techniques. Check it out!',
      created_at: '2024-01-20T14:30:00Z',
      likes: 24,
      comments: []
    }
  },
  {
    id: 2,
    type: 'comment',
    content: 'Great insights on microservices architecture!',
    created_at: '2024-01-19T16:45:00Z',
    related_user: {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      created_at: '2024-01-10T09:15:00Z'
    }
  },
  {
    id: 3,
    type: 'connection',
    content: 'Connected with Sarah Johnson',
    created_at: '2024-01-18T11:20:00Z',
    related_user: {
      id: 3,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      created_at: '2024-01-05T13:45:00Z'
    }
  },
  {
    id: 4,
    type: 'like',
    content: 'Liked a post about TypeScript best practices',
    created_at: '2024-01-17T09:15:00Z'
  }
];

export const mockPosts: Post[] = [
  {
    id: 1,
    user_id: 1,
    content: 'Just published a new article about React performance optimization techniques. Check it out!',
    created_at: '2024-01-20T14:30:00Z',
    likes: 24,
    comments: [
      {
        id: 1,
        user_id: 2,
        content: 'Great insights on microservices architecture!',
        created_at: '2024-01-19T16:45:00Z'
      }
    ]
  },
  {
    id: 2,
    user_id: 1,
    content: 'Excited to share that I\'ll be speaking at the upcoming React Conference in San Francisco!',
    created_at: '2024-01-15T10:30:00Z',
    likes: 18,
    comments: []
  }
];

export const validationRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  bio: {
    maxLength: 500
  },
  title: {
    maxLength: 100
  },
  location: {
    maxLength: 100
  },
  skills: {
    maxItems: 10
  }
}; 