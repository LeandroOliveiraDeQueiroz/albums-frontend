import Photo from '../photo/Photo';
import type { IPhotoGridProps } from './types';

const PhotoGrid = ({ photos, onDelete, onDeleteLoading }: IPhotoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 mr-4 ml-4">
      {photos.map((photo) => {
        return (
          <Photo
            key={photo.id}
            photo={photo}
            onDeleteLoading={onDeleteLoading}
            onDelete={() => {
              if (onDelete) onDelete(photo.id);
            }}
            canDelete={!!onDelete}
          />
        );
      })}
    </div>
  );
};

export default PhotoGrid;
