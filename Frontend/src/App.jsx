import Register from './commponets/Registion';
import { useGetAllUserQuery } from './service/api';

const App = () => {
  // useEffect(() => {
  //   api
  //     .get('/posts')
  //     .then(data => {
  //       console.log(data);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
  // }, []);

  const res = useGetAllUserQuery();
  console.log(res);

  return (
    <div>
      <div>
        <Register></Register>
      </div>
    </div>
  );
};

export default App;
