import { Link } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { cn } from "@/utils/utils";
import { useTheme } from "@/hooks/useTheme";
import { UserCircle } from "lucide-react";

export function UserIcon() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { theme } = useTheme();

  const getInitials = (
    firstName: string | undefined,
    lastName: string | undefined
  ): string => {
    const firstInitial = firstName?.[0] || "";
    const lastInitial = lastName?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <div className="hidden sm:flex items-center gap-5">
      {isSignedIn ? (
        <>
          <Link
            to="/profile"
            className={cn(
              "p-2 rounded-md transition-colors duration-200 flex items-center justify-center",
              theme === "dark" ? "text-black" : "text-black"
            )}
            aria-label="User profile"
          >
            {/* exibindo as iniciais do nome e sobrenome */}
            <div className="h-9 w-9 flex items-center justify-center bg-gray-200 rounded-full text-sm font-semibold">
              {getInitials(user?.firstName ?? undefined, user?.lastName ?? undefined)}
            </div>
          </Link>
        </>
      ) : (
        <button
          onClick={() => (window.location.href = "/sign-in")}
          className="p-2 rounded-md transition-colors duration-200 cursor-pointer"
          aria-label="Login"
        >
          <UserCircle
            className={cn(
              "h-7 w-7",
              theme === "dark" ? "text-gray-200" : "text-gray-700"
            )}
          />
        </button>
      )}
    </div>
  );
}
