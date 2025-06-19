import { useCallback, useEffect, useState } from 'react';
import type { IAlbum, IUser } from '../../types';
import axios from 'axios';
import AlbumsTable from '../../components/album/albumsTable/AlbumsTable';
import { useLocation, useNavigate } from 'react-router';
import Loading from '../../components/loading/Loading';
import { useAuthContext } from '../../context/auth/auth';
import AddAlbumModal from '../../components/album/addAlbumModal/AddAlbumModal';
import EditAlbumModal from '../../components/album/editAlbumModal/EditAlbumModal';

const API = 'http://localhost:3000';

const Albums = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum>();
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state.user as IUser;
  const auth = useAuthContext();
  const isUserAlbums = auth.isAuthenticated && user.id === auth.user?.id;
  const showAlbums = isUserAlbums ? auth.albums || [] : albums;

  const getAlbumsByUser = useCallback(async () => {
    try {
      if (isUserAlbums) {
        return;
      }

      if (!user) throw new Error('No user');

      const response = await axios.get(`${API}/albums/user/${user.id}`);
      const albums: IAlbum[] = response.data;

      setAlbums(albums);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [user, isUserAlbums]);

  useEffect(() => {
    getAlbumsByUser();
  }, [getAlbumsByUser]);

  const handleRowClick = useCallback(
    (album: IAlbum) => {
      navigate(`/albums/${album.id}/photos`, { state: { album } });
    },
    [navigate],
  );

  const handleOpenEditModalChange = useCallback((open: boolean) => {
    setOpenEditModal(open);
  }, []);

  const handleSelectedAlbumChange = useCallback((album: IAlbum) => {
    setSelectedAlbum(album);
    setOpenEditModal(true);
  }, []);

  if (loading) return <Loading />;

  if (error) return <div>Error</div>;

  return (
    <div>
      <h1 className="text-2xl m-3 text-center">
        {isUserAlbums ? 'My Albums' : `${user.name}'s Albums`}
      </h1>
      {isUserAlbums && <AddAlbumModal />}
      {selectedAlbum && (
        <EditAlbumModal
          album={selectedAlbum}
          open={openEditModal}
          onOpen={handleOpenEditModalChange}
        />
      )}
      <AlbumsTable
        albums={showAlbums}
        onRowClick={handleRowClick}
        hasExpansion={isUserAlbums}
        onExpansionClick={handleSelectedAlbumChange}
      />
    </div>
  );
};

export default Albums;
