import { useCallback, useEffect, useState } from 'react';
import type { IUser } from '../../types';
import axios from 'axios';
import UsersTable from '../../components/usersTable/UsersTable';
import { useNavigate } from 'react-router';
import Loading from '../../components/loading/Loading';

const API = 'http://localhost:3000';

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const navigate = useNavigate();

  const getAllUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/users/all`);
      const users: IUser[] = response.data;
      setUsers(users);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleRowClick = useCallback(
    (user: IUser) => {
      navigate(`/users/${user.id}/albums`, { state: { user } });
    },
    [navigate],
  );

  if (loading) return <Loading />;

  if (error) return <div>Error</div>;

  return (
    <div>
      <h1 className="text-2xl m-3 text-center">Users</h1>
      <UsersTable users={users} onRowClick={handleRowClick} />
    </div>
  );
};

export default Users;
