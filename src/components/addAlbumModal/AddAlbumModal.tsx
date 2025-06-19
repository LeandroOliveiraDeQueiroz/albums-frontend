import { useCallback, useState } from 'react';
import Dialog from '../dialog/Dialog';
import AlbumForm from '../albumForm/AlbumForm';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useAuthContext } from '../../context/auth/auth';
import type { IAlbum } from '../../types';
import OpenButton from '../dialog/OpenButton';
import InternalButton from '../dialog/InternalButton';

const API = 'http://localhost:3000';

const AddAlbumModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const { addAlbum } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (loading) return;

      if (!open) setTitle('');
      setOpen(open);
    },
    [loading],
  );

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handleAddAlbum = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API}/albums/`, {
        title,
      });

      const album: IAlbum = response.data;
      addAlbum(album);
      handleOpenChange(false);
      enqueueSnackbar('Success! Add as the last album', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error: try again later', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      openButton={
        <div className="flex justify-end mr-4 mb-4">
          <OpenButton disabled={loading}>Add Album</OpenButton>
        </div>
      }
      title="Add album"
      loading={loading}
      actionButtons={
        <InternalButton disabled={loading || !title} onClick={handleAddAlbum}>
          Save
        </InternalButton>
      }
      content={
        <AlbumForm
          title={title}
          isLoading={loading}
          onTitleChange={handleTitleChange}
        />
      }
    />
  );
};

export default AddAlbumModal;
