import { MdDelete } from 'react-icons/md';
import type { IPhotoProps } from './types';

const Photo = ({
  photo,
  onDelete,
  onDeleteLoading,
  canDelete,
}: IPhotoProps) => {
  const handleOnDelete = () => {
    if (!onDeleteLoading) onDelete();
  };

  return (
    <div
      className={`relative shadow-sm p-1 bg-white border border-gray-200 rounded-lg ${onDeleteLoading ? 'animate-pulse' : ''}`}
    >
      {canDelete && (
        <div className="absolute right-1 top-1">
          <MdDelete
            onClick={handleOnDelete}
            size={20}
            color={onDeleteLoading ? 'gray' : 'black'}
          />
        </div>
      )}

      <div className="h-80 flex justify-center mt-2 mb-1">
        <img
          className="max-w-full max-h-full m-auto"
          src={photo.url}
          alt={photo.title}
        />
      </div>
    </div>
  );
};

export default Photo;
