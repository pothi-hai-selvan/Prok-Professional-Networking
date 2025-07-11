import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
      navigate('/app/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-xl w-full space-y-10 p-12 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">P</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900">Welcome to Prok</h2>
          <p className="mt-3 text-lg text-gray-600">Sign in to your professional network</p>
        </div>
        
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-lg">Email</label>
            <input
              type="email"
              className="mt-2 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring text-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ color: 'black' }}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="mt-2 w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 text-base shadow-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                style={{ fontWeight: 400, background: '#fff', color: 'black' }}
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 -translate-y-1/2 bg-transparent focus:outline-none cursor-pointer text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={{ lineHeight: 0, padding: 0 }}
              >
                {!showPassword ? (
                  // Eye-off icon (closed by default)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12.001C3.226 15.885 7.24 19.5 12 19.5c1.658 0 3.237-.322 4.646-.9m3.374-2.13A10.45 10.45 0 0022.066 12c-1.292-3.884-5.306-7.499-10.066-7.499-1.13 0-2.22.186-3.24.523M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6.364 6.364l12-12" />
                  </svg>
                ) : (
                  // Eye icon (open)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 4.5 12 4.5c4.477 0 8.268 3.443 9.542 7.5-1.274 4.057-5.065 7.5-9.542 7.5-4.477 0-8.268-3.443-9.542-7.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <div className="text-red-500 text-base">{error}</div>}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 font-semibold"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        
        <div className="text-center text-base text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </div>
        
        {/* Demo login button */}
        <div className="text-center">
          <button
            onClick={async () => {
              try {
                await login('demo@example.com', 'password');
                navigate('/app/dashboard');
              } catch (err: any) {
                setError(err.message || 'Demo login failed');
              }
            }}
            className="text-base text-gray-500 hover:text-gray-700 underline"
          >
            Demo: Login with demo credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login; 