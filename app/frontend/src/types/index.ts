export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
}

export interface Profile {
  id: number;
  user_id: number;
  bio: string;
  location: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  avatar_url?: string;
  title?: string;
  social_links?: SocialLinks;
  contact_info?: ContactInfo;
  connections_count?: number;
  mutual_connections?: number;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  website?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  start_date: string;
  end_date: string;
  description: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
}

export interface Activity {
  id: number;
  type: 'post' | 'comment' | 'connection' | 'like';
  content: string;
  created_at: string;
  related_user?: User;
  related_post?: Post;
}

export interface Post {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  created_at: string;
}

export interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
  created_at: string;
  read: boolean;
}

export interface ProfileFormData {
  name: string;
  email: string;
  bio: string;
  title: string;
  location: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  social_links: SocialLinks;
  contact_info: ContactInfo;
}

export interface ValidationError {
  field: string;
  message: string;
} 