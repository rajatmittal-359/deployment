// src/hooks/useDarkMode.js
import { useEffect, useState } from "react";

const UseDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Load theme from localStorage or default to false (light mode)
    const savedTheme = localStorage.getItem("dark-mode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("dark-mode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return { isDarkMode, toggleDarkMode };
};

export default UseDarkMode;
