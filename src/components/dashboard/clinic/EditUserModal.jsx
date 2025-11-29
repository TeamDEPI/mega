import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function EditUserModal({
  user,
  onClose,
  onSave,
  onResetPassword,
}) {
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone,
  });

  const generateRandomPassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let pass = "";
    for (let i = 0; i < 12; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewPassword(pass);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {resetPasswordMode ? "Reset Password" : "Edit User"}
        </h2>

        {!resetPasswordMode ? (
          <>
            {/* EDIT FORM */}
            <div className="space-y-4">
              {["name", "email", "role"].map((field) => (
                <div key={field}>
                  <label className="block mb-2 font-semibold capitalize text-gray-700">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    className="w-full p-2 rounded-lg border border-gray-300"
                    value={editForm[field]}
                    onChange={(e) =>
                      setEditForm({ ...editForm, [field]: e.target.value })
                    }
                  />
                </div>
              ))}
            </div>

            {/* EDIT ACTION BUTTONS */}
            <div className="flex gap-3 mt-6">
              <button
                className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white"
                onClick={() => onSave(editForm)}
              >
                Save
              </button>

              <button
                className="px-4 py-2 rounded-lg border border-red-500 text-red-600"
                onClick={() => setResetPasswordMode(true)}
              >
                Reset Password
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* RESET PASSWORD */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full p-2 rounded-lg border border-gray-300 pr-10"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              className="w-full mb-3 px-4 py-2 rounded-lg bg-green-500 text-white"
              onClick={generateRandomPassword}
            >
              Generate Random Password
            </button>

            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white"
                onClick={() => onResetPassword(newPassword)}
              >
                Reset
              </button>

              <button
                className="flex-1 px-4 py-2 rounded-lg bg-gray-300"
                onClick={() => {
                  setResetPasswordMode(false);
                  setNewPassword("");
                }}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
