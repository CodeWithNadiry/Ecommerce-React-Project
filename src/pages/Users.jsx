import useAuthStore from "../store/AuthStore";

const Users = () => {
  const {users} = useAuthStore();
  return (
    <div className="my-6 bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">All Users</h2>

      <div className="overflow-x-hidden">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm text-gray-600">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                </tr>
              ))
            ): (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">No Users Yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;