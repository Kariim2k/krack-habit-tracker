"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getStoredSession } from "@/lib/storage";

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [allowed, setAllowed] =
    useState(false);

  useEffect(() => {
    const session =
      getStoredSession();

    if (!session) {
      router.replace("/login");
      return;
    }

    setAllowed(true);
  }, [router]);

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}