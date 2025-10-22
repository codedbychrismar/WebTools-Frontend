import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

interface MainLayoutProps {
  children?: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const showNavbar = !children; // Show navbar only if no children are passed

  return (
    <div className="w-full min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {showNavbar && <Navbar />}
      <main className="flex-1 px-8">
        {children || <Outlet />}
      </main>
    </div>
  );
}
