export default function UserDetailsModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          User Details
        </h2>

        <div className="flex flex-col items-center mb-4">
          <img
            src={user.image}
            className="w-20 h-20 rounded-full border-2 border-gray-300 mb-3"
          />
          <h3 className="text-xl font-bold">{user.name}</h3>
          <p className="text-gray-600">{user.role}</p>
          <div
            className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
              user.isActive
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {user.isActive ? "Active" : "Inactive"}
          </div>
        </div>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
        </div>

        <div className="flex justify-end mt-6">
          <button
            className="px-4 py-2 rounded-lg bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
