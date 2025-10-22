import { useTheme } from '../context/ThemeContext';
import { MdLightMode } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";

export default function ThemeButton() {
  const { isDarkMode, toggleTheme } = useTheme();
  
  // Using CSS variable for button background color
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded "
      style={{ backgroundColor: "var(--button)" }}
    >
      {isDarkMode ?  <MdLightMode />  :  <FaMoon />  }
    </button>
  );
}