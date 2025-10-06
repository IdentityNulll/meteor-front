import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../../context/ThemeContext";
import "./ThemeSwitcher.css";

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <FontAwesomeIcon
        icon={theme === "light" ? faMoon : faSun}
        className="theme-icon"
      />
    </button>
  );
};

export default ThemeSwitcher;
