import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useLoginUserMutation } from '../service/api';

const Login = () => {
  const [loginUser, { isLoading, isSuccess, isError }] = useLoginUserMutation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const naviget = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await loginUser(formData).unwrap();
      console.log('User Login:', res.message);
      naviget('/welcome');
      alert('Login Successful ✅');
    } catch (error) {
      console.error('Login Failed:', error);
      alert('Login Failed ❌');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 font-semibold text-white rounded-lg transition ${
              isLoading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {isSuccess && (
          <p className="text-green-600 text-center mt-4">
            User registered successfully ✅
          </p>
        )}
        {isError && (
          <p className="text-red-600 text-center mt-4">
            Something went wrong ❌
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
