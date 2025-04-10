import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/utils/utils";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ring-2 ring-offset-2 ring-blue-500 cursor-pointer",
        theme === "dark" ? "bg-blue-500/20" : "bg-white/50"
      )}
    >
      {/* Ícone do Sol (Light Mode) */}
      <Sun
        className={`h-4 w-4 text-yellow-500 transition-transform duration-200 ${
          theme === "light" ? "scale-100 rotate-0" : "scale-0 -rotate-90"
        }`}
      />

      {/* Ícone da Lua (Dark Mode) */}
      <Moon
        className={`absolute top-2 left-2 h-4 w-4 transition-transform duration-200 ${
          theme === "dark" ? "scale-100 rotate-0" : "scale-0 rotate-90"
        }`}
      />
    </button>
  );
}
