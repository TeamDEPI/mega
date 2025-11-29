import { useState, useEffect } from "react";
import { FaSearch, FaEye, FaEyeSlash } from "react-icons/fa";
import { API_BASE_URL } from "../../config.json";
import EditUserModal from "../../components/dashboard/clinic/EditUserModal";
import UserDetailsModal from "../../components/dashboard/clinic/UserDetailsModal";
export default function ClinicUsersPage() {
  const [usersList, setUsersList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
  });

  const usersPerPage = 9;
  const TOKEN = localStorage.getItem("token");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          API_BASE_URL + "/ClinicManagement/clinic-users",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        const formatted =
          data?.value?.map((u) => ({
            id: u.userid,
            email: u.email,
            name: u.fullname,
            role: u.usertype,
            phone: "—",
            image: `https://placehold.co/80?text=${u.fullname[0] || "U"}`,
            isActive: u.status === "active",
          })) || [];

        setUsersList(formatted);
      } catch (err) {
        console.error("Error fetching clinic users:", err);
      }
    };

    fetchUsers();
    const urlParams = new URLSearchParams(window.location.search);
    const savedPage = Number(urlParams.get("page"));
    if (savedPage) setPage(savedPage);
  }, []);
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", page);
    window.history.replaceState(null, "", "?" + urlParams.toString());
  }, [page]);
  const roles = ["All", ...new Set(usersList.map((u) => u.role))];

  const filteredUsers = usersList.filter((user) => {
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Active" && user.isActive) ||
      (statusFilter === "Inactive" && !user.isActive);

    return matchesRole && matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  const handleToggleActive = async (userId, currentStatus) => {
    const endpoint =
      API_BASE_URL +
      `/clinicmanagement/${
        currentStatus ? "deactivate" : "activate"
      }-user?userId=${userId}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setUsersList((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, isActive: !currentStatus } : user
          )
        );
      } else {
        console.error("Failed to toggle user status");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetPassword = async (userId) => {
    if (!newPassword) {
      alert("Please enter a new password");
      return;
    }

    try {
      const response = await fetch(
        API_BASE_URL + `/ClinicManagement/clinicuser-resetpassword`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userid: userId, newpassword: newPassword }),
        }
      );

      if (response.ok) {
        alert("Password reset successfully");
        setResetPasswordMode(false);
        setNewPassword("");
        setEditUser(null);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Error resetting password");
    }
  };

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(password);
  };

  const handleEditSave = () => {
    setUsersList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editUser.id ? { ...user, ...editForm } : user
      )
    );
    alert("User information updated successfully");
    setEditUser(null);
    setResetPasswordMode(false);
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Clinic Users</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 flex-wrap">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            autoComplete="off"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <div className="flex gap-3 mb-4 flex-wrap">
          {["All", "Active", "Inactive"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setStatusFilter(tab);
                setPage(1);
              }}
              className={`px-4 py-2 rounded-lg border ${
                statusFilter === tab
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <select
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
            setPage(1);
          }}
          className="w-full md:w-1/3 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {paginatedUsers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div className="absolute top-4 right-4">
                <div
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    user.isActive
                      ? "bg-green-200 text-green-700 border border-green-300"
                      : "bg-red-200 text-red-700 border border-red-300"
                  }`}
                >
                  {user.isActive ? "Active" : "Inactive"}
                </div>
              </div>

              {/* User Information */}
              <div className="flex flex-col items-center text-center">
                <img
                  src={user.image}
                  alt={user.name}
                  className="rounded-full w-16 h-16 border-2 border-gray-300 mb-3"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {user.name}
                </h3>
                <p className="text-gray-600 text-sm">{user.role}</p>
                <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              </div>

              {/* ACTION BUTTONS SECTION */}
              <div className="flex flex-col gap-2 mt-4 flex-wrap">
                {/* EDIT and DETAILS buttons - First row */}
                <div className="flex gap-2">
                  {/* EDIT BUTTON - Opens edit modal */}
                  <button
                    className="flex-1 px-4 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 text-sm font-medium"
                    onClick={() => {
                      setEditUser(user);
                      setEditForm({
                        name: user.name,
                        role: user.role,
                        email: user.email,
                        phone: user.phone,
                      });
                      setResetPasswordMode(false);
                    }}
                  >
                    Edit
                  </button>

                  {/* DETAILS BUTTON  */}
                  <button
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-500 text-gray-600 hover:bg-gray-50 text-sm font-medium"
                    onClick={() => setSelectedUser(user)}
                  >
                    Details
                  </button>
                </div>

                {/* ACTIVATE/DEACTIVATE BUTTON */}
                <button
                  onClick={() => handleToggleActive(user.id, user.isActive)}
                  className={`w-full px-4 py-2 rounded-lg text-sm font-medium ${
                    user.isActive
                      ? "bg-red-600 text-white border border-red-200 hover:bg-red-700"
                      : "bg-green-600 text-white border border-green-200 hover:bg-green-700"
                  }`}
                >
                  {user.isActive ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-10">
          No Users found.
        </p>
      )}
      {/* Pagination Controls */}
      <div className="flex justify-center mt-8 gap-2">
        <button
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 border border-gray-300"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-lg border border-gray-300 ${
              page === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-40 border border-gray-300"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>

      {/* USER DETAILS MODAL - Shows when selectedUser is set */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              User Details
            </h2>

            <div className="flex flex-col items-center mb-4">
              <img
                src={selectedUser.image}
                className="w-20 h-20 rounded-full border-2 border-gray-300 mb-3"
              />
              <h3 className="text-xl font-bold text-gray-800">
                {selectedUser.name}
              </h3>
              <p className="text-gray-600">{selectedUser.role}</p>
              <div
                className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedUser.isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {selectedUser.isActive ? "Active" : "Inactive"}
              </div>
            </div>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Phone:</strong> {selectedUser.phone}
              </p>
            </div>

            <div className="flex justify-end mt-6">
              <button
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
                onClick={() => setSelectedUser(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL - Shows when editUser is set */}
      {editUser && (
        <div className="fixed inset-0 bg-slate-900/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
              {resetPasswordMode ? "Reset Password" : "Edit User"}
            </h2>

            {/* EDIT MODE - Show user edit form */}
            {!resetPasswordMode ? (
              <>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm({ ...editForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editForm.email}
                      onChange={(e) =>
                        setEditForm({ ...editForm, email: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">
                      Role
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editForm.role}
                      onChange={(e) =>
                        setEditForm({ ...editForm, role: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* EDIT MODAL ACTION BUTTONS */}
                <div className="flex gap-3 mt-6 flex-wrap">
                  {/* SAVE CHANGES BUTTON */}
                  <button
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-medium"
                    onClick={handleEditSave}
                  >
                    Save Changes
                  </button>

                  {/* RESET PASSWORD BUTTON  */}
                  <button
                    className="px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 font-medium"
                    onClick={() => setResetPasswordMode(true)}
                  >
                    Reset Password
                  </button>

                  {/* CANCEL BUTTON - Closes modal */}
                  <button
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
                    onClick={() => {
                      setEditUser(null);
                      setResetPasswordMode(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              /* PASSWORD RESET MODE */
              <>
                <div className="mb-4" autoComplete="off">
                  <label className="block mb-2 font-semibold text-gray-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      name="reset_password_field"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* GENERATE RANDOM PASSWORD BUTTON */}
                <button
                  className="w-full mb-3 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 font-medium"
                  onClick={generateRandomPassword}
                >
                  Generate Random Password
                </button>

                {/* PASSWORD RESET ACTION BUTTONS */}
                <div className="flex gap-3 mt-4 flex-wrap">
                  {/* CONFIRM RESET BUTTON */}
                  <button
                    className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 font-medium"
                    onClick={() => handleResetPassword(editUser.id)}
                  >
                    Reset Password
                  </button>

                  {/* BACK TO EDIT BUTTON - Returns to edit mode */}
                  <button
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium"
                    onClick={() => {
                      setResetPasswordMode(false);
                      setNewPassword("");
                    }}
                  >
                    Back to Edit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
