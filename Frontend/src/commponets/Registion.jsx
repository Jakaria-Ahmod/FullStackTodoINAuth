import { useState } from 'react';
import { useCreateUserMutation } from '../service/api';
// import { useCreateUserMutation } from '../service/api/usersApi'; // নিশ্চিত করুন path সঠিক আছে

function Register() {
  const [createUser, { isLoading, isError, isSuccess }] =
    useCreateUserMutation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBrith: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await createUser(formData).unwrap();
      console.log('User Registered:', res);
      alert('Registration Successful ✅');
    } catch (error) {
      console.error('Registration Failed:', error);
      alert('Registration Failed ❌');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />

        <input
          type="text"
          name="dateOfBrith"
          placeholder="dateOfBrith"
          value={formData.dateOfBrith}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

      {isSuccess && (
        <p style={{ color: 'green' }}>User registered successfully ✅</p>
      )}
      {isError && <p style={{ color: 'red' }}>Something went wrong ❌</p>}
    </div>
  );
}

export default Register;
