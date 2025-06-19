import type { IAlbum, IPhoto, IUser } from '../../types';

export interface AuthContextData {
  isAuthenticated: boolean;
  loading: boolean;
  user: IUser | null;
  albums?: IAlbum[];
  login: (user: IUser | null, albums?: IAlbum[]) => void;
  editAlbum: (props: EditAlbumProps) => void;
  addAlbum: (album: IAlbum) => void;
  deleteAlbum: (albumId: number) => void;
}

export interface EditAlbumProps {
  albumId: number;
  photos?: IPhoto[];
  newAlbum?: Partial<IAlbum>;
}
