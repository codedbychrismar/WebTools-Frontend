import { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index"; // adjust path
import MainLayout from "./layout/MainLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => {
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "F12") {
        e.preventDefault();
        setIsAdminView((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {isAdminView ? (
        <MainLayout>
          <AdminDashboard />
        </MainLayout>
      ) : (
        <RouterProvider router={router} />
      )}
    </>
  );
};

export default App;
