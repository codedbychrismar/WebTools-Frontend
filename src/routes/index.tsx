import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import UserPage from "../pages/userPage";
import AdminDashboard from "@/pages/admin/AdminDashboard";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <UserPage /> },
      { index: false, element: <AdminDashboard /> },
    ],
  },
]);
