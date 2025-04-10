import { NavLink } from "react-router-dom";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme"; // Importe o useTheme

type NavLinksProps = {
  className?: string;
  onClick?: () => void;
};

const links = [
  { to: "/", label: "Home"},
  { to: "/listing", label: "Shop" },
  { to: "/about", label: "About"},
];

export function NavLinks({ className, onClick }: NavLinksProps) {
  const { theme } = useTheme(); // Use o hook useTheme

  return (
    <div className={cn("flex", className)}>
      {links.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            cn(
              "relative flex items-center gap-2 text-sm font-medium transition-all duration-300 sm:px-0 md:px-0 lg:px-5 xl:px-5 py-2 rounded-lg",
              theme === "dark"
                ? "text-black hover:text-gray-600"
                : "text-gray-700 hover:text-black",
              isActive
                ? theme === "dark"
                  ? "bg-blue-500/30 text-blue-100 shadow-lg"
                  : "text-black"
                : theme === "dark"
                ? "text-gray-200"
                : "text-gray-600"
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
