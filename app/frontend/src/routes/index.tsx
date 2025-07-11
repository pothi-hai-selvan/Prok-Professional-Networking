import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/dashboard/Dashboard';
import ProfileView from '../components/profile/ProfileView';
import ProfileEdit from '../components/profile/ProfileEdit';
import PostCreate from '../components/posts/PostCreate';
import PostList from '../components/posts/PostList';
import Feed from '../components/feed/Feed';
import JobList from '../components/job-board/JobList';
import MessageList from '../components/messaging/MessageList';
import EditProfile from '../components/profile/EditProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/edit-profile',
    element: <EditProfile />,
  },
  {
    path: '/app',
    element: <Layout />,
    children: [
      {
        path: '/app/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/app/profile',
        element: <ProfileView />,
      },
      {
        path: '/app/profile/:userId',
        element: <ProfileView />,
      },
      {
        path: '/app/profile/edit',
        element: <ProfileEdit />,
      },
      {
        path: '/app/posts/create',
        element: <PostCreate />,
      },
      {
        path: '/app/posts',
        element: <PostList />,
      },
      {
        path: '/app/jobs',
        element: <JobList />,
      },
      {
        path: '/app/messages',
        element: <MessageList />,
      },
    ],
  },
]); 