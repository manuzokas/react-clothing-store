import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

export default function OAuthCallback() {
  return (
    <div className="flex items-center justify-center h-screen">
      <AuthenticateWithRedirectCallback />
    </div>
  );
}
