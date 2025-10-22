import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeButton from "./ThemeButton";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-20 py-5">
      <motion.div
        className={`flex items-center justify-between px-6 md:px-12 py-2 ${
          !scrolled
            ? "bg-transparent"
            : "border border-gray-200 rounded-2xl bg-[var(--bg-primary)] mx-4 md:mx-auto md:w-[60%]"
        }`}
        animate={{
          scale: scrolled ? 0.95 : 1,
          y: scrolled ? -4 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <a>
          <motion.span
            className="text-2xl md:text-3xl font-bold text-[var(--accent)]"
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Web Tools
          </motion.span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-4 text-[var(--text-primary)]">
            <a href="#">Home</a>
            <a href="#">Tools</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <ThemeButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeButton />
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </motion.div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[var(--bg-primary)] border border-gray-200 rounded-2xl mx-4 mt-2 overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-4 text-[var(--text-primary)]">
              <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="#" onClick={() => setMenuOpen(false)}>Tools</a>
              <a href="#" onClick={() => setMenuOpen(false)}>About</a>
              <a href="#" onClick={() => setMenuOpen(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
