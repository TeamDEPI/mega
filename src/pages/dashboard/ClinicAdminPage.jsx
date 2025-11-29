/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { API_BASE_URL } from "../../config.json";
const BASE_URL = API_BASE_URL + "/Clinic";

export default function ClinicAdminPage() {
  const { id: clinicId } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const [clinic, setClinic] = useState(null);
  const [admins, setAdmins] = useState([]);
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [error, setError] = useState("");

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: "",
    email: "",
  });
  const [passwords, setPasswords] = useState({});

  async function loadClinic() {
    try {
      const res = await fetch(BASE_URL + "/system-clinics", {
        headers: authHeaders,
      });

      const data = await res.json();

      if (data.statusCode !== 200 || !data.list) {
        navigate("/dashboard/clinics");
        return;
      }

      const matched = data.list.find((c) => c.id === clinicId);

      if (!matched) {
        navigate("/dashboard/clinics");
        return;
      }

      const address = [
        matched.addresscountry,
        matched.addressgovernrate,
        matched.addresscity,
        matched.addresslocation,
      ]
        .filter(Boolean)
        .join(", ");

      setClinic({
        id: matched.id,
        name: matched.name,
        specialty: matched.medicalspecialtyname,
        email: matched.email,
        phone: matched.phone,
        address,
      });
    } catch (err) {
      console.error(err);
      navigate("/dashboard/clinics");
    }
  }

  async function fetchAdmins() {
    setLoadingAdmins(true);
    try {
      const res = await fetch(
        `${BASE_URL}/clinic-adminusers?ClinicId=${clinicId}`,
        { headers: authHeaders }
      );

      const data = await res.json();

      if (data.statusCode === 200) {
        const mapped = data.value.map((a) => ({
          id: a.userid,
          name: a.fullname,
          email: "—",
        }));
        setAdmins(mapped);
      } else if (data.statusCode === 404) {
        setAdmins([]);
      } else {
        setError("Failed to load admins");
      }
    } catch (err) {
      console.error(err);
      setError("Error loading admins");
    }

    setLoadingAdmins(false);
  }

  async function createAdmin(fullname, email) {
    const body = {
      clincid: clinicId,
      email,
      fullname,
    };

    try {
      const res = await fetch(`${BASE_URL}/create-clinicadmin`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.statusCode === 200) {
        return {
          id: data.userid || Math.random().toString(),
          name: fullname,
          email,
        };
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function resetPassword(adminId, newpassword) {
    const body = {
      adminid: adminId,
      newpassword,
    };

    const res = await fetch(`${BASE_URL}/resetpassword-foruser`, {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.statusCode !== 200) {
      throw new Error(data.message);
    }
  }

  useEffect(() => {
    async function load() {
      await loadClinic();
      await fetchAdmins();
    }
    load();
  }, [clinicId]);

  async function handleCreateAdmin(e) {
    e.preventDefault();

    if (!newAdmin.name || !newAdmin.email) {
      setError("Name & Email are required");
      return;
    }

    try {
      const created = await createAdmin(newAdmin.name, newAdmin.email);

      setAdmins((prev) => [...prev, created]);
      setNewAdmin({ name: "", email: "" });
      setShowCreateForm(false);
      setError("");
    } catch (err) {
      setError("Failed: " + err.message);
    }
  }

  async function handleResetPassword(admin) {
    const pwd = passwords[admin.id];

    if (!pwd) {
      setError("Enter a password");
      return;
    }

    if (pwd.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    try {
      await resetPassword(admin.id, pwd);

      alert("Password reset successfully");
      setPasswords((prev) => ({
        ...prev,
        [admin.id]: "",
      }));

      setError("");
    } catch (err) {
      setError("Failed: " + err.message);
    }
  }

  if (!clinic)
    return <div className="p-6 text-gray-500">Loading clinic...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold">{clinic.name}</h2>
            <p className="text-sm text-gray-500">
              Manage admin users for this clinic.
            </p>
          </div>

          <button
            onClick={() => {
              if (showCreateForm) setError("");
              setShowCreateForm((s) => !s);
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {showCreateForm ? "Close" : "Create Admin"}
          </button>
        </div>

        {/* ERROR MESSAGE */}
        {error && <p className="mt-3 text-red-600">{error}</p>}

        {/* CREATE ADMIN FORM */}
        {showCreateForm && (
          <form
            onSubmit={handleCreateAdmin}
            className="mt-6 bg-gray-50 p-4 rounded-lg border"
          >
            <h3 className="font-medium mb-3">Create new admin</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                placeholder="Full name"
                className="p-2 border rounded"
                value={newAdmin.name}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, name: e.target.value })
                }
              />
              <input
                placeholder="Email"
                type="email"
                className="p-2 border rounded"
                value={newAdmin.email}
                onChange={(e) =>
                  setNewAdmin({ ...newAdmin, email: e.target.value })
                }
              />
            </div>

            <button
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              type="submit"
            >
              Create
            </button>
          </form>
        )}

        {/* ADMIN LIST */}
        <div className="mt-8">
          <h3 className="font-medium mb-3">Admins</h3>

          {loadingAdmins ? (
            <p className="text-gray-600">Loading admins...</p>
          ) : admins.length === 0 ? (
            <p className="text-gray-600">No admins found for this clinic.</p>
          ) : (
            <div className="w-full overflow-x-auto">
              <table className="min-w-[600px] w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Reset Password</th>
                  </tr>
                </thead>

                <tbody>
                  {admins.map((a) => (
                    <tr key={a.id} className="border-b">
                      <td className="p-2">{a.name}</td>
                      <td className="p-2">{a.email}</td>

                      <td className="p-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="password"
                            placeholder="New password"
                            className="p-2 border rounded"
                            value={passwords[a.id] || ""}
                            onChange={(e) =>
                              setPasswords((prev) => ({
                                ...prev,
                                [a.id]: e.target.value,
                              }))
                            }
                          />

                          <button
                            onClick={() => handleResetPassword(a)}
                            className="px-3 py-1 bg-indigo-600 text-white rounded"
                          >
                            Reset
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* BACK BUTTON */}
        <div className="mt-10 flex justify-end">
          <Link
            to="/dashboard/clinics"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
