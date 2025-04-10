import { AnimatePresence, motion } from "framer-motion";
import { NavLinks } from "./NavLinks";
import { useEffect } from "react";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@clerk/clerk-react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { theme } = useTheme();
  const { isSignedIn, signOut } = useAuth();

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (target.closest(".menu-button")) return;

      if (!target.closest(".mobile-menu")) {
        onClose();
      }
    };

    const timeout = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 100);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className={cn("fixed inset-0 z-40 backdrop-blur-sm", theme === "dark" ? "bg-black/60" : "bg-white/60")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed left-0 top-0 w-80 h-full bg-black/30 text-white z-50 flex flex-col mobile-menu"
          >
            <button
              className="self-end p-4 text-white hover:text-gray-300 transition-all duration-300"
              onClick={onClose}
            >
              ✕
            </button>

            <div className="flex-1 py-4">
              <NavLinks
                className="flex flex-col space-y-4 text-lg font-medium px-6 "
                onClick={onClose}
              />
            </div>

            <div className="p-4 border-t text-black border-gray-700 flex flex-col space-y-4">
              {isSignedIn ? (
                <>
                  <NavLink
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <FaUser className="w-5 h-5" />
                    Profile
                  </NavLink>
                  <button
                    onClick={() => {
                      signOut();
                      onClose();
                    }}
                    className="flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <FaSignOutAlt className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/sign-in"
                    onClick={onClose}
                    className="flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <FaUser className="w-5 h-5" />
                    Login
                  </NavLink>
                  <NavLink
                    to="/sign-up"
                    onClick={onClose}
                    className="flex items-center gap-3 text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  >
                    <FaUser className="w-5 h-5" />
                    Register
                  </NavLink>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
