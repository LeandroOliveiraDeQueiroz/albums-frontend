import { useCallback, useEffect, useState } from 'react';
import Dialog from '../dialog/Dialog';
import AlbumForm from '../albumForm/AlbumForm';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useAuthContext } from '../../context/auth/auth';
import type { IAlbum } from '../../types';
import InternalButton from '../dialog/InternalButton';

const API = 'http://localhost:3000';

const EditAlbumModal = ({
  album,
  onOpen,
  open,
}: {
  album: IAlbum;
  open: boolean;
  onOpen: (open: boolean) => void;
}) => {
  const [title, setTitle] = useState(album.title);
  const [loading, setLoading] = useState(false);
  const { editAlbum, deleteAlbum } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTitle(album.title);
  }, [album.title]);

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (loading) return;

      if (!open) setTitle(album.title);
      onOpen(open);
    },
    [album.title, onOpen, loading],
  );

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handleEditAlbum = async () => {
    setLoading(true);
    try {
      const response = await axios.put(`${API}/albums/${album.id}`, {
        ...album,
        title,
      });

      const editedAlbum: Partial<IAlbum> = response.data;
      editAlbum({ albumId: album.id, newAlbum: editedAlbum });
      handleOpenChange(false);
      enqueueSnackbar('Success! Album updated!', { variant: 'success' });
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Error: try again later', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`${API}/albums/${album.id}`);

      const { id } = response.data;
      deleteAlbum(id as number);
      handleOpenChange(false);
      enqueueSnackbar('Success! Album deleted!', { variant: 'success' });
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
      title="Edit album"
      loading={loading}
      actionButtons={
        <>
          <InternalButton
            disabled={loading || !title}
            danger
            onClick={handleDeleteAlbum}
          >
            Delete
          </InternalButton>
          <InternalButton
            disabled={loading || !title}
            onClick={handleEditAlbum}
          >
            Save
          </InternalButton>
        </>
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

export default EditAlbumModal;
