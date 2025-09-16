import { useNavigate, useParams } from 'react-router';
import { useVerifyEmailQuery } from '../service/api';

const VerifyEmail = () => {
  const { token } = useParams();
  const { data, error, isLoading } = useVerifyEmailQuery(token);
  const navitet = useNavigate();
  navitet('/login');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-center mb-4">
          Email Verification
        </h2>

        {isLoading && <p className="text-blue-600 text-center">Verifying...</p>}
        {data && (
          <p className="text-green-600 text-center">
            ✅ {data.msg || 'Email verified successfully!'}
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center">
            ❌ Verification failed or link expired.
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
