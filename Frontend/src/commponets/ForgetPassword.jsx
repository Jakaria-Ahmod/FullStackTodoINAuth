import { useState } from 'react';
import { useParams } from 'react-router';
import { useResetPasswordMutation } from '../service/api';

const ForgetPassword = () => {
  const { token } = useParams();
  const [resetPassword, { isLoading, isError, isSuccess }] =
    useResetPasswordMutation();
  const [formData, setFormData] = useState({
    password: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (!formData.password) {
        return alert('password not provide');
      }
      const res = await resetPassword({
        token,
        password: formData.password,
      }).unwrap();
      console.log('reset sucessully:', res);
      alert('reset sucessully ✅');
    } catch (error) {
      console.error('reset Failed:', error);
      alert('reset  Failed ❌');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="password"
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
            {isLoading ? 'reseting...' : 'reset'}
          </button>
        </form>

        {isSuccess && (
          <p className="text-green-600 text-center mt-4">
            reset successfully ✅
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

export default ForgetPassword;
