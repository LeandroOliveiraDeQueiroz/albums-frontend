import type { IUser } from '../../types';

const UsersTable = ({
  users,
  onRowClick,
}: {
  users: IUser[];
  onRowClick: (user: IUser) => void;
}) => {
  return (
    <div>
      <table className="table-auto w-full text-sm text-left text-gray-50">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr
                key={user.id}
                id="user-row"
                className="bg-white border-b border-gray-200 text-black cursor-pointer"
                onClick={() => {
                  onRowClick(user);
                }}
              >
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
