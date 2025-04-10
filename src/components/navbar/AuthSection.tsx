import { useAuth, useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { User, UserPlus } from "lucide-react";

export function AuthSection() {
  const { isSignedIn } = useAuth();
  const { signOut } = useAuth();
  const { user } = useUser();

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-5">
        <Button variant="secondary">
          <Link to="/sign-in">Login</Link>
        </Button>

        <Link to="/register" className="sm:hidden md:flex lg:hidden">
          <UserPlus className="h-6 w-6 text-blue-500" />
        </Link>

        <Button variant="outline" className="hidden md:hidden sm:flex lg:flex">
          <Link to="/register">Register</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 sm:gap-5 lg:gap-8 md:gap-2">
      <div className="flex items-center gap-2">
        <User className="h-5 w-5 text-blue-500" />
        <span className="hidden sm:hidden md:hidden lg:block text-sm text-blue-500">
          Welcome, {user?.firstName}
        </span>
      </div>

      <Button variant="secondary" onClick={() => signOut()}>
        Logout
      </Button>
    </div>
  );
}
