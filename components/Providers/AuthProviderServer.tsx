import { cookies } from "next/headers";
import { AuthProvider } from "./AuthProvider";
import { Suspense } from "react";

export async function AuthProviderServer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback="">
      <AuthProviderContent>{children}</AuthProviderContent>
    </Suspense>
  );
}

async function AuthProviderContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  return (
    <AuthProvider isAuthenticated={cookieStore.has("Authentication")}>
      {children}
    </AuthProvider>
  );
}
