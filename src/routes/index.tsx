import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import UserPage from "../pages/userPage";
import AdminPage from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { index: true, element: <UserPage /> },
      { index: false, element: <AdminPage /> },
    ],
  },
]);
