const AlbumForm = ({
  title,
  onTitleChange,
  isLoading,
}: {
  title: string;
  isLoading?: boolean;
  onTitleChange: (newTitle: string) => void;
}) => {
  return (
    <form className="p-2 mb-2 mt-1">
      <label
        htmlFor="album-title"
        className="block text-sm font-medium text-gray-700 mb-1.5"
      >
        Title
      </label>
      <input
        id="album-title"
        defaultValue={title}
        onChange={(e) => {
          onTitleChange(e.target.value);
        }}
        disabled={isLoading}
        name="title"
        className="text-base border border-gray-400 p-2 rounded-md w-full"
      />
    </form>
  );
};

export default AlbumForm;
