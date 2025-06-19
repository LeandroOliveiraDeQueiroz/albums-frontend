import { useCallback, useState } from 'react';
import Dialog from '../../dialog/Dialog';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { useAuthContext } from '../../../context/auth/auth';
import type { IAlbum, IPhoto } from '../../../types';
import OpenButton from '../../dialog/OpenButton';
import InternalButton from '../../dialog/InternalButton';
import PhotoForm from '../photoForm/PhotoForm';

const API = 'http://localhost:3000';

const AddPhotoModal = ({ album }: { album: IAlbum }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const { editAlbum } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (loading) return;

      if (!open) {
        setTitle('');
        setImageFile(null);
      }
      setOpen(open);
    },
    [loading],
  );

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  const handleImageFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      const file = files ? files[0] : null;
      setImageFile(file);
    },
    [],
  );

  const handleAddAlbum = async () => {
    setLoading(true);

    if (!imageFile) {
      enqueueSnackbar(`Please select: couldn't read the image`, {
        variant: 'warning',
      });
      return;
    }
    const reader = new FileReader();

    reader.onload = async () => {
      const base64String = reader.result as string;
      try {
        const response = await axios.post(`${API}/photos/`, {
          albumId: album.id,
          title: title,
          url: base64String,
          thumbnailUrl: base64String,
        });

        const createdPhoto: IPhoto = response.data;
        const copyPhotos: IPhoto[] = [...(album.photos || []), createdPhoto];

        editAlbum({ albumId: album.id, photos: copyPhotos });
        handleOpenChange(false);
        enqueueSnackbar('Success! Add as the last image', {
          variant: 'success',
        });
      } catch (error) {
        console.error(error);
        enqueueSnackbar(`Error: try again later`, { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = (error) => {
      console.error('FileReader error:', error);
      enqueueSnackbar(`Error: couldn't read the image`, { variant: 'error' });
    };

    reader.readAsDataURL(imageFile);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
      openButton={
        <div className="flex justify-end mr-4 mb-4">
          <OpenButton>Add Photo</OpenButton>
        </div>
      }
      title="Add Photo"
      loading={loading}
      actionButtons={
        <InternalButton
          disabled={loading || !title || !imageFile}
          onClick={handleAddAlbum}
        >
          Save
        </InternalButton>
      }
      content={
        <PhotoForm
          title={title}
          isLoading={loading}
          onTitleChange={handleTitleChange}
          onPhotoFileChange={handleImageFileChange}
        />
      }
    />
  );
};

export default AddPhotoModal;
