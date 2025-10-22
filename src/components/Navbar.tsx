import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeButton from "./ThemeButton";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY >= 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-24 flex items-center justify-center z-10 py-5">
      <motion.div
        className={`flex items-center px-12 justify-between py-2 ${
          !scrolled
            ? "bg-transparent w-full"
            : "border border-gray-200 w-[60%] rounded-2xl bg-[var(--bg-primary)]"
        }`}
        animate={{
          scale: scrolled ? 0.95 : 1,
          y: scrolled ? -4 : 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <a>
          <motion.span
            className="text-3xl font-bold text-[var(--accent)]"
            animate={{ scale: scrolled ? 0.9 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            Web Tools
          </motion.span>
        </a>

        <div className="flex gap-2">
          <div className="flex gap-4 mr-12 text-[var(--text-primary)]">
            <a href="#">Home</a>
            <a href="#">Tools</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <ThemeButton />
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
