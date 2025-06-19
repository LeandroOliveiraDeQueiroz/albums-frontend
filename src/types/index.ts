export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  albums?: IAlbum[];
}

export interface IAlbum {
  id: number;
  userId: number;
  title: string;
  photos?: IPhoto[];
}

export interface IPhoto {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
