import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { postApi } from './api';

interface Post {
  id: number;
  user_id: number;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'video';
  created_at: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface PostLike {
  [postId: number]: {
    liked: boolean;
    count: number;
  };
}

const PostList: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [deletingPost, setDeletingPost] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [postLikes, setPostLikes] = useState<PostLike>({});

  useEffect(() => {
    loadPosts();
  }, [page]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-menu') && !target.closest('.menu-button')) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await postApi.getPosts(page, 10);
      const newPosts = page === 1 ? response.posts : [...posts, ...response.posts];
      setPosts(newPosts);
      setHasMore(response.pagination.has_next);
      
      // Initialize likes for new posts
      const newLikes: PostLike = { ...postLikes };
      newPosts.forEach((post: Post) => {
        if (!newLikes[post.id]) {
          newLikes[post.id] = {
            liked: false,
            count: Math.floor(Math.random() * 50) + 1 // Random initial count for demo
          };
        }
      });
      setPostLikes(newLikes);
    } catch (err: any) {
      setError(err.message || 'Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!window.confirm('Are you sure you want to delete this post?')) {
      return;
    }

    setDeletingPost(postId);
    setOpenMenu(null); // Close menu after action
    try {
      await postApi.deletePost(postId);
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      // Remove likes data for deleted post
      const newLikes = { ...postLikes };
      delete newLikes[postId];
      setPostLikes(newLikes);
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    } finally {
      setDeletingPost(null);
    }
  };

  const toggleMenu = (postId: number) => {
    setOpenMenu(openMenu === postId ? null : postId);
  };

  const handleLike = (postId: number) => {
    setPostLikes(prev => {
      const currentLike = prev[postId] || { liked: false, count: 0 };
      return {
        ...prev,
        [postId]: {
          liked: !currentLike.liked,
          count: currentLike.liked ? currentLike.count - 1 : currentLike.count + 1
        }
      };
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  const getMediaUrl = (mediaUrl: string) => {
    if (mediaUrl.startsWith('http')) return mediaUrl;
    return `http://localhost:5000${mediaUrl}`;
  };

  if (loading && page === 1) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-pulse">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full mr-3"></div>
                <div>
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-32 mb-2"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black dark:text-white">Posts</h1>
        <Link
          to="/app/posts/create"
          className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Post
        </Link>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="flex">
            <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-6">
        {posts.length === 0 && !loading ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-black dark:text-white mb-2">No posts yet</h3>
            <p className="text-black dark:text-white mb-4">Be the first to share something with your network!</p>
            <Link
              to="/app/posts/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        ) : (
          posts.map((post) => {
            const likeData = postLikes[post.id] || { liked: false, count: 0 };
            
            return (
              <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {/* Post Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-bold text-sm">
                          {post.user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-black dark:text-white">{post.user.name}</h3>
                        <p className="text-sm text-black dark:text-white">{formatDate(post.created_at)}</p>
                      </div>
                    </div>
                    
                    {/* Post Actions Menu */}
                    {currentUser?.id === post.user_id && (
                      <div className="relative">
                        <button 
                          onClick={() => toggleMenu(post.id)}
                          className="menu-button text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                        
                        {/* Dropdown Menu */}
                        {openMenu === post.id && (
                          <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              disabled={deletingPost === post.id}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50 flex items-center"
                            >
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              {deletingPost === post.id ? 'Deleting...' : 'Delete Post'}
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit Post
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                              </svg>
                              Share Post
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-4">
                  <div className="text-black dark:text-white whitespace-pre-wrap mb-4">
                    {post.content}
                  </div>

                  {/* Media Content */}
                  {post.media_url && (
                    <div className="mb-4">
                      {post.media_type === 'image' ? (
                        <img
                          src={getMediaUrl(post.media_url)}
                          alt="Post media"
                          className="w-full h-auto rounded-lg"
                        />
                      ) : (
                        <video
                          src={getMediaUrl(post.media_url)}
                          controls
                          className="w-full h-auto rounded-lg"
                        />
                      )}
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-6">
                      <button 
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center transition-colors ${
                          likeData.liked 
                            ? 'text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300' 
                            : 'text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                      >
                        <svg 
                          className={`w-5 h-5 mr-1 ${likeData.liked ? 'fill-current' : 'fill-none'}`} 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="font-medium">{likeData.count}</span>
                      </button>
                      <button className="flex items-center text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Comment
                      </button>
                      <button className="flex items-center text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                        </svg>
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage(prev => prev + 1)}
            disabled={loading}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList; 