import type { IPhoto } from '../../../types';

export interface IPhotoGridProps {
  photos: IPhoto[];
  onDelete?: (photoId: number) => void;
  onDeleteLoading?: boolean;
}
