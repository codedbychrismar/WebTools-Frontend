import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />
      <main className="flex-1 px-8">
        {children || <Outlet />}
      </main>
    </div>
  );
}

