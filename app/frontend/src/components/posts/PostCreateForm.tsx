import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface PostCreateFormProps {
  onPostCreated?: () => void;
}

const PostCreateForm: React.FC<PostCreateFormProps> = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [media, setMedia] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setMedia(file || null);
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!content || content.replace(/<(.|\n)*?>/g, '').trim() === '') {
      setError('Post content is required.');
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('content', content);
      if (media) formData.append('media', media);
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create post');
      setSuccess('Post created!');
      setContent('');
      setMedia(null);
      setPreviewUrl(null);
      if (onPostCreated) onPostCreated();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow space-y-6 mt-8">
      <h2 className="text-2xl font-bold mb-2">Create a Post</h2>
      {error && <div className="text-red-600 text-center">{error}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}
      <div>
        <label className="block font-semibold mb-1">Content</label>
        <ReactQuill value={content} onChange={setContent} theme="snow" />
      </div>
      <div>
        <label className="block font-semibold mb-1">Media (optional)</label>
        <input type="file" accept="image/*,video/*" onChange={handleMediaChange} />
        {previewUrl && (
          <div className="mt-2">
            {media && media.type.startsWith('image') ? (
              <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
            ) : (
              <video src={previewUrl} controls className="max-h-40 rounded" />
            )}
          </div>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? 'Posting...' : 'Post'}
      </button>
      {/* Preview Section */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">Preview</h3>
        <div className="bg-gray-50 p-4 rounded">
          <div dangerouslySetInnerHTML={{ __html: content }} />
          {previewUrl && (
            <div className="mt-2">
              {media && media.type.startsWith('image') ? (
                <img src={previewUrl} alt="Preview" className="max-h-40 rounded" />
              ) : (
                <video src={previewUrl} controls className="max-h-40 rounded" />
              )}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default PostCreateForm; 