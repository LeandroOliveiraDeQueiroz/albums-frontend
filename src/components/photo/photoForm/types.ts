export interface PhotoFormProps {
  title: string;
  isLoading?: boolean;
  onTitleChange: (newTitle: string) => void;
  onPhotoFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
