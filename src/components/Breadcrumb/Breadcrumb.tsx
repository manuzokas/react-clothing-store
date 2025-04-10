import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  const { theme } = useTheme();

  return (
    <nav
      className={cn(
        "flex text-sm",
        theme === "dark" ? "text-white" : "text-gray-600"
      )}
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {item.href ? (
            <Link
              to={item.href}
              className={cn(
                "hover:text-gray-900",
                theme === "dark" ? "hover:text-gray-300" : "hover:text-gray-900"
              )}
            >
              {item.label}
            </Link>
          ) : (
            <span
              className={cn(
                "font-bold",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              {item.label}
            </span>
          )}
          {index < items.length - 1 && (
            <span
              className={cn(
                "mx-2",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )}
            >
              /
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
