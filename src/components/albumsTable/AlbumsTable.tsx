import { FaEllipsisVertical } from 'react-icons/fa6';
import type { IAlbum } from '../../types';

const AlbumsTable = ({
  albums,
  onRowClick,
  hasExpansion,
  onExpansionClick,
}: {
  albums: IAlbum[];
  onRowClick: (album: IAlbum) => void;
  hasExpansion: boolean;
  onExpansionClick: (album: IAlbum) => void;
}) => {
  return (
    <div>
      <table className="table-auto w-full text-sm text-left text-gray-50">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Albums
            </th>
            {hasExpansion ? (
              <th scope="col" className="px-6 py-3">
                Edit/Delete
              </th>
            ) : null}
          </tr>
        </thead>
        <tbody>
          {albums.map((album) => {
            return (
              <tr
                key={album.id}
                className="bg-white border-b border-gray-200 text-black cursor-pointer"
                onClick={() => {
                  onRowClick(album);
                }}
              >
                <td className="px-6 py-4">{album.title}</td>
                {hasExpansion ? (
                  <td scope="col" className="px-6 py-3">
                    <FaEllipsisVertical
                      size={20}
                      onClick={(e) => {
                        e.stopPropagation();
                        onExpansionClick(album);
                      }}
                    />
                  </td>
                ) : null}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumsTable;
