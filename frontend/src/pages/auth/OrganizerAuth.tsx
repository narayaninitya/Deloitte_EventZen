import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserPlus, LogIn, ArrowLeft } from 'lucide-react';

interface AuthForm {
  email: string;
  password: string;
  name?: string;
}

function OrganizerAuth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState<AuthForm>({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin
        ? 'http://localhost:5000/api/auth/organizer/login'
        : 'http://localhost:5000/api/auth/organizer/signup';

      const response = await axios.post(endpoint, formData);

      if (!isLogin) {
        // After signup, switch to login mode
        toast.success('Account created successfully!');
        setIsLogin(true); // Switch to login form
        return; // Stop further execution
      }

      // Handle login
      localStorage.setItem('organizerToken', response.data.token);
      localStorage.setItem('organizerId', response.data.organizerId);
      toast.success('Login successful!');
      navigate('/organizer'); // Redirect to organizer dashboard
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Authentication failed';
      toast.error(errorMessage);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="flex justify-center mb-8">
            {isLogin ? (
              <LogIn className="w-12 h-12 text-indigo-600" />
            ) : (
              <UserPlus className="w-12 h-12 text-indigo-600" />
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {isLogin ? 'Organizer Login' : 'Create Organizer Account'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
              />
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizerAuth;