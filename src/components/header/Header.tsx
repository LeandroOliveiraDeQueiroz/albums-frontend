import { NavLink } from 'react-router';
import { useAuthContext } from '../../context/auth/auth';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import type { IAlbum, IUser } from '../../types';

const API = 'http://localhost:3000';

const Header = () => {
  const { login, user, isAuthenticated } = useAuthContext();
  const getLoggedUser = useCallback(async () => {
    try {
      const response = await axios.get(`${API}/users/login`);
      const user: IUser | null = response.data;
      let album: IAlbum[] | undefined;

      if (user) {
        const { data } = await axios.get(`${API}/albums/user/${user.id}`);
        album = data as IAlbum[];
      }

      login(user, album);
    } catch (error) {
      console.error(error);
      login(null);
    }
  }, [login]);

  useEffect(() => {
    getLoggedUser();
  }, [getLoggedUser]);

  return (
    <header className="bg-[#0d9fb53b] flex gap-4 p-3 pr-4 justify-between">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div className="flex justify-between">
        {isAuthenticated ? (
          <>
            <NavLink
              to={`/users/${user?.id}/albums`}
              state={{ user }}
              className="mr-8 cursor-pointer"
            >
              My albums
            </NavLink>
            <p>{user?.name}</p>
          </>
        ) : (
          <>
            <p>Photo Albums App</p>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
