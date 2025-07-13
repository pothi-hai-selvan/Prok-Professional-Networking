import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/dashboard/Dashboard';
import ProfileView from '../components/profile/ProfileView';
import ProfileEdit from '../components/profile/ProfileEdit';
import PostList from '../components/posts/PostList';
import PostCreate from '../components/posts/PostCreate';
import JobList from '../components/job-board/JobList';
import MessageList from '../components/messaging/MessageList';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/app" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<ProfileView />} />
        <Route path="profile/edit" element={<ProfileEdit />} />
        <Route path="posts" element={<PostList />} />
        <Route path="posts/create" element={<PostCreate />} />
        <Route path="jobs" element={<JobList />} />
        <Route path="messages" element={<MessageList />} />
        <Route index element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes; 