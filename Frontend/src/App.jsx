import { useEffect } from 'react';
import api from './axios/api';

const App = () => {
  useEffect(() => {
    api
      .get('/posts')
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err.message);
      });
  }, []);
  return <div>App</div>;
};

export default App;
