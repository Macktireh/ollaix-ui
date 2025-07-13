import { useEffect, useState } from "react";

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    const detectTheme = () => {
      const htmlElement = document.documentElement;
      const currentTheme = htmlElement.getAttribute("data-theme") || "";

      // List of DaisyUI dark themes
      const darkThemes = [
        "dark",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "sunset",
      ];

      const isDark =
        darkThemes.includes(currentTheme) ||
        (!currentTheme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      setIsDarkMode(isDark);
    };

    // Detecting the initial theme
    detectTheme();

    // Observe theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          detectTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Observe changes in system preferences
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => detectTheme();
    mediaQuery.addEventListener("change", handleChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isDarkMode;
};
