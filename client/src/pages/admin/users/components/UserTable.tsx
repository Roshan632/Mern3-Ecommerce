import { deleteUserById, type IUser } from "../../../../store/adminUserSlice";
import { useAppDispatch } from "../../../../store/hooks";

interface UserTableProps {
  users: IUser[];
}

function UserTable({ users }: UserTableProps) {
  const dispatch = useAppDispatch();

  return (
    <div className="rounded bg-white p-4 shadow">
      <h1 className="mb-4 text-xl font-semibold text-gray-900">Users</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-4 py-3 font-semibold">Username</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-0">
                <td className="px-4 py-3">{user.username}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => dispatch(deleteUserById(user.id))}
                    className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={3}>
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
