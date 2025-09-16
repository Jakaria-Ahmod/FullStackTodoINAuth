import { useGetUsersQuery } from '../service/api';

const GetAllUser = () => {
  const { data, isLoading, isError } = useGetUsersQuery(); // ❌ না, ঠিকভাবে ব্যবহার করা হচ্ছে

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users ❌</p>;
  console.log(data.allUser);

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {data.allUser.map(user => (
          <li key={user._id}>
            {user.fullName} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GetAllUser;
