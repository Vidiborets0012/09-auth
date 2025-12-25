"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { checkSession, logout } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";

const privateRoutes = ["/profile"];

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  // const { setUser, clearIsAuthenticated } = useAuthStore();
  const setUser = useAuthStore((s) => s.setUser);
  const clearIsAuthenticated = useAuthStore((s) => s.clearIsAuthenticated);

  useEffect(() => {
    const verifyAuth = async () => {
      const isPrivateRoute = privateRoutes.some((route) =>
        pathname.startsWith(route)
      );

      try {
        const user = await checkSession();

        if (user) {
          setUser(user);
        } else {
          throw new Error("No session");
        }
        // setUser(user);
      } catch {
        clearIsAuthenticated();

        if (isPrivateRoute) {
          await logout();
          router.replace("/sign-in");
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    verifyAuth();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
