import type { IPhoto } from '../../../types';

export interface IPhotoProps {
  photo: IPhoto;
  onDelete: () => void;
  canDelete: boolean;
  onDeleteLoading?: boolean;
}
