import { useEffect } from "react";
import { useThemeStore } from "@tableflow/ui-library";
import useSearchParams from "../hooks/useSearchParams";
import useEmbedStore from "../stores/embed";
import { EmbedProps } from "./types";

export default function Embed({ children }: EmbedProps) {
  const { importerId, darkMode: darkModeString, primaryColor, metadata, isOpen, onComplete, styles } = useSearchParams();

  // Set importerId & metadata in embed store
  const setEmbedParams = useEmbedStore((state) => state.setEmbedParams);
  useEffect(() => {
    setEmbedParams({
      importerId,
      metadata,
      isOpen: isOpen !== "false" && isOpen !== "0",
      onComplete: !!onComplete && onComplete !== "false" && onComplete !== "0",
    });
  }, [importerId, metadata]);

  // Set Light/Dark mode
  const darkMode = darkModeString === "true";
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  // Set primary color
  useEffect(() => {
    if (primaryColor) {
      const root = document.documentElement;
      root.style.setProperty("--color-primary", primaryColor);
    }
  }, [primaryColor]);

  useEffect(() => {
    const parsedStyles = styles && JSON.parse(styles);

    styles &&
      Object.keys(parsedStyles).forEach((key) => {
        if (key.indexOf("--") === 0) {
          const root = document.documentElement;
          const value = parsedStyles?.[key as any];
          root.style.setProperty(key, value);
        }
      });
  }, [styles]);

  return <>{children}</>;
}
