export interface PhotoFormProps {
  title: string;
  isLoading?: boolean;
  onTitleChange: (newTitle: string) => void;
  //   photoFile: File | null;
  onPhotoFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
