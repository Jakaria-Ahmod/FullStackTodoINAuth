import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import ForgetPassword from './commponets/ForgetPassword';
import GetAllUser from './commponets/GetAllUser';
import Login from './commponets/Login';
import Register from './commponets/Registion';
import ResetPassword from './commponets/ResetPassword';
import VerifyEmail from './commponets/VerifyEmail';
import Welcome from './commponets/Welcom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Register></Register>,
  },
  {
    path: '/login',
    element: <Login></Login>,
  },
  {
    path: '/verify/:token',
    element: <VerifyEmail></VerifyEmail>,
  },
  {
    path: '/welcome',
    element: <Welcome></Welcome>,
  },
  {
    path: '/reset-password',
    element: <ResetPassword></ResetPassword>,
  },
  {
    path: '/reset-password/:token',
    element: <ForgetPassword></ForgetPassword>,
  },
  {
    path: '/alluser',
    element: <GetAllUser></GetAllUser>,
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
