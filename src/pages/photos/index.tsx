import { useCallback, useEffect, useMemo, useState } from 'react';
import type { IAlbum, IPhoto } from '../../types';
import axios from 'axios';
import { useLocation } from 'react-router';
import PhotoGrid from '../../components/photo/photoGrid/PhotoGrid';
import Loading from '../../components/loading/Loading';
import { useAuthContext } from '../../context/auth/auth';
import { useSnackbar } from 'notistack';
import AddPhotoModal from '../../components/photo/addPhotoModal/AddPhotoModal';

const API = 'http://localhost:3000';

const Photos = () => {
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(false);
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const { editAlbum, user, isAuthenticated, albums } = useAuthContext();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const selectedAlbum = location.state.album as IAlbum;
  const isUserAlbum = useMemo(
    () => isAuthenticated && user?.id === selectedAlbum.userId,
    [isAuthenticated, user?.id, selectedAlbum.userId],
  );
  const savedAlbum = useMemo(
    () => albums?.find((album) => selectedAlbum.id === album.id),
    [selectedAlbum.id, albums],
  );

  const showPhotos =
    isUserAlbum && savedAlbum ? savedAlbum.photos || [] : photos;

  const getPhotosByAlbum = useCallback(async () => {
    try {
      if (savedAlbum && savedAlbum?.photos) return;
      if (!selectedAlbum) throw new Error('No album');

      const response = await axios.get(
        `${API}/photos/album/${selectedAlbum.id}`,
      );
      const photos: IPhoto[] = response.data;

      if (selectedAlbum.userId === user?.id) {
        editAlbum({ albumId: selectedAlbum.id, photos });
      }

      setPhotos(photos);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [selectedAlbum, editAlbum, user?.id, savedAlbum]);

  useEffect(() => {
    getPhotosByAlbum();
  }, [getPhotosByAlbum]);

  const handleOnDelete = async (photoId: number) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`${API}/photos/${photoId}`);

      const deletedAlbum: Partial<IAlbum> = response.data;

      const copyAlbum: IAlbum = {
        ...(savedAlbum as IAlbum),
        photos: savedAlbum?.photos?.filter(
          (photo) => photo.id !== deletedAlbum?.id,
        ),
      };

      editAlbum({ albumId: copyAlbum.id, newAlbum: copyAlbum });
      enqueueSnackbar('Success! Photo deleted!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error: try again later', { variant: 'error' });
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (error) return <div>Error</div>;

  return (
    <div>
      <h1 className="text-2xl m-3 text-center">Photos of the Album:</h1>
      <h2 className="text-2xl m-3 text-center">{selectedAlbum.title}</h2>
      {isUserAlbum && savedAlbum && <AddPhotoModal album={savedAlbum} />}
      <PhotoGrid
        photos={showPhotos}
        onDelete={isUserAlbum ? handleOnDelete : undefined}
        onDeleteLoading={deleteLoading}
      />
    </div>
  );
};

export default Photos;
