import { MdDashboard } from "react-icons/md";
import { FaUserMd, FaCalendarAlt, FaClinicMedical } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";

export const dashboardRoutes = [
  {
    name: "Dashboard",
    icon: <IoSettingsOutline className="w-5 h-5" />,
    path: "/dashboard/",
    roles: [
      {
        role: "ClinicDoctor",
        element: "DoctorDashboard",
      },
      {
        role: "SystemAdmin",
        element: "MainContent",
      },
      {
        role: "ClinicAdmin",
        element: "ClinicDashboard",
      },
      {
        role: "ClinicReceptionist",
        element: "ClinicDashboard",
      },
      {
        role: "User",
        element: "PatientAppointments",
      },
    ],
    element: "DoctorDashboard",
  },
  {
    name: "Clinic Requests",
    icon: <FaUserMd className="w-5 h-5" />,
    path: "/dashboard/clinic-requests",
    roles: ["SystemAdmin"],
    element: "ClinicRequests",
  },
  {
    name: "Clinics",
    icon: <FaUserMd className="w-5 h-5" />,
    path: "/dashboard/clinics",
    roles: ["SystemAdmin"],
    element: "Clinics",
  },
  {
    name: "Clinic Users",
    icon: <FaUserMd className="w-5 h-5" />,
    path: "/dashboard/clinic-users",
    roles: ["ClinicAdmin"],
    element: "ClinicUsers",
  },
  {
    name: "Add Clinic User",
    icon: <FaUserMd className="w-5 h-5" />,
    path: "/dashboard/create-doctor-account",
    roles: ["ClinicAdmin"],
    element: "CreateDoctorAccount",
  },
  {
    name: "Clinic Doctors",
    icon: <FaUserMd className="w-5 h-5" />,
    path: "/dashboard/clinic-doctors",
    roles: ["ClinicAdmin"],
    element: "ClinicDoctors",
  },
  {
    name: "Doctor Schedules",
    icon: <FaCalendarAlt className="w-5 h-5" />,
    path: "/dashboard/doctor-schedules",
    roles: ["ClinicAdmin"],
    element: "DoctorSchedules",
  },
  {
    name: "Clinic Configuration",
    icon: <FaClinicMedical className="w-5 h-5" />,
    path: "/dashboard/clinic-settings",
    roles: ["ClinicAdmin"],
    element: "ConfigPage",
  },
  {
    name: "Clinic admins",
    icon: <FaClinicMedical className="w-5 h-5" />,
    path: "/dashboard/clinics/:id/admins",
    roles: ["SystemAdmin"],
    element: "ClinicAdminPage",
    sidebar: false,
  },

  {
    name: "Doctors",
    icon: <IoSettingsOutline className="w-5 h-5" />,
    path: "/dashboard/doctors",
    roles: ["ClinicReceptionist"],
    element: "ReceptionDoctorsPage",
  },

  {
    name: "Appointments",
    icon: <IoSettingsOutline className="w-5 h-5" />,
    path: "/dashboard/appointments",
    roles: [
      {
        role: "ClinicDoctor",
        element: "DoctorAppointmentsPage",
      },
      // {
      //   role: "User",
      //   element: "PatientAppointments",
      // },
      {
        role: "ClinicReceptionist",
        element: "ReceptionAppointments",
      },
    ],
    // element: "DoctorAppointmentsPage",
  },
  {
    name: "Change Password",
    icon: <IoSettingsOutline className="w-5 h-5" />,
    path: "/dashboard/change-password",
    roles: [
      "SystemAdmin",
      "ClinicAdmin",
      "ClinicDoctor",
      "ClinicReceptionist",
      "User",
    ],
    element: "ChangePassword",
  },
  {
    name: "2FA Settings",
    icon: <IoSettingsOutline className="w-5 h-5" />,
    path: "/dashboard/2fa",
    roles: [
      "SystemAdmin",
      "ClinicAdmin",
      "ClinicDoctor",
      "ClinicReceptionist",
      "User",
    ],
    element: "TwoFactorAuth",
  },
  {
    name: "Edit Profile",
    icon: <IoSettingsOutline className="w-5 h-5" />,
    path: "/dashboard/edit",
    roles: [
      "SystemAdmin",
      "ClinicAdmin",
      "ClinicDoctor",
      "ClinicReceptionist",
      "User",
    ],
    element: "EditUserPage",
  },
];
