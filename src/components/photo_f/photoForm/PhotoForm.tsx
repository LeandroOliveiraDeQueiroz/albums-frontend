import type { PhotoFormProps } from './types';

const PhotoForm = ({
  title,
  onTitleChange,
  isLoading,
  // photoFile,
  onPhotoFileChange,
}: PhotoFormProps) => {
  return (
    <form className="p-2 mb-2 mt-1">
      <label
        htmlFor="image-title"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        Title
      </label>
      <input
        id="image-title"
        // defaultValue={title}
        value={title}
        onChange={(e) => {
          onTitleChange(e.target.value);
        }}
        disabled={isLoading}
        name="title"
        className="text-base border border-gray-400 p-2 rounded-md w-full"
      />

      <label
        htmlFor="image-file"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        Image
      </label>
      <input
        type="file"
        accept="image/png, image/jpeg"
        id="image-file"
        // value={photoFile?.name}
        onChange={onPhotoFileChange}
        disabled={isLoading}
        name="image"
        className="text-base border border-gray-400  rounded-md w-full file:bg-gray-400 file:p-2"
      />
    </form>
  );
};

export default PhotoForm;
