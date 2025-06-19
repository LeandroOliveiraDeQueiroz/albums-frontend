import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';
import type { AuthContextData, EditAlbumProps } from './types';
import type { IAlbum, IUser } from '../../types';

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  login: () => {},
  loading: true,
  user: null,
  editAlbum: () => {},
  addAlbum: () => {},
  deleteAlbum: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState<IAlbum[] | undefined>();

  const login = useCallback((user: IUser | null, albums?: IAlbum[]) => {
    setLoading(false);
    setUser(user);
    setAlbums(albums);
    setIsAuthenticated(!!user);
  }, []);

  const editAlbum = useCallback(
    ({ albumId, newAlbum, photos }: EditAlbumProps) => {
      setAlbums((prevAlbums) => {
        if (!prevAlbums) return;

        const index = prevAlbums.findIndex((album) => album.id === albumId);

        if (index === -1) return prevAlbums;

        const albumCopy = { ...prevAlbums[index], ...newAlbum };

        if (photos) albumCopy.photos = photos;

        return [
          ...prevAlbums.slice(0, index),
          albumCopy,
          ...prevAlbums.slice(index + 1),
        ];
      });
    },
    [],
  );

  const addAlbum = useCallback((album: IAlbum) => {
    setAlbums((prevAlbums) => {
      return [...(prevAlbums || []), album];
    });
  }, []);

  const deleteAlbum = useCallback((albumId: number) => {
    setAlbums((prevAlbums) => {
      if (!prevAlbums) return;

      return prevAlbums.filter((album) => album.id !== albumId);
    });
  }, []);

  console.log('album', albums);

  const value = useMemo(
    () => ({
      login,
      user,
      isAuthenticated,
      loading,
      albums,
      editAlbum,
      addAlbum,
      deleteAlbum,
    }),
    [
      login,
      user,
      isAuthenticated,
      loading,
      albums,
      editAlbum,
      addAlbum,
      deleteAlbum,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
