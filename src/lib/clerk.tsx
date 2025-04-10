import { ClerkProvider as BaseClerkProvider } from "@clerk/clerk-react";
import React from "react";

interface ClerkProviderProps {
  children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!clerkPubKey) {
    throw new Error("Missing Clerk publishable key");
  }

  return (
    <BaseClerkProvider
      publishableKey={clerkPubKey}
      appearance={{
        variables: {
          colorPrimary: "#2563eb",
        },
      }}
    >
      {children}
    </BaseClerkProvider>
  );
}
